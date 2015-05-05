var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

/*
-c path to config file
-b path to blast path (/usr/bin/)
-t number of threads to use per job (1)
-j number of concurrent jobs (1)
-v turn on job status in stdout
*/

var params = {
    "configPath":"",
    "blastPath":"/usr/bin/",
    "threadsPerJob":1,
    "concurrentJobs":1,
    "status":false
}

var server = function(req, res) {
    //handle post
    /*
    fs.readFile(__dirname + '/static/index.html',
    function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
    */
}

var io = function(socket) {
    socket.emit('db', dbs_emit);
    socket.on('job', function (data) {
        data['socket'] = socket;
        q.push(data);
        processQ();
    });
}

function init(args) {
    params['configPath'] = args['-c'] || params['configPath'];
    params['blastPath'] = args['-b'] || params['blastPath'];
    params['threadsPerJob'] = args['-t'] || params['threadsPerJob'];
    params['concurrentJobs'] = args['-j'] || params['concurrentJobs'];
    params['status'] = args['-v'] ? true : false;

    params['configPath'] = path.resolve(path.normalize(params['configPath']));
    params['blastPath'] = path.resolve(path.normalize(params['blastPath']));

    var raw = fs.readFileSync(params['configPath'], "utf8").trim().split('\n');
    var start = false;
    for (var i = 0 ; i < raw.length ; i ++ ) {
        if (raw[i] == '>blast_config') {
            start = true;
        } else {
            if (start) {
                if (raw[i][0] == '>') {
                    break;
                }

                var cols = raw[i].split('\t');
                dbs[cols[0]] = {'path':cols[1],
                                'description':cols[2],
                                'type':cols[3]};
                dbs_emit.push({
                    "name":cols[0],
                    "descr":cols[2],
                    "type":cols[3],
                    "programs":[]
                    }); 
            }
        }
    }
}

var dbs = {};
var dbs_emit = [];

var q = [];
var processing = false;
var concurrentCount = 0;
var doneCount = 0;

function processQ() {
    if (q.length > 0) {
        if (concurrentCount < params['concurrentJobs']) {
            concurrentCount += 1;
            var job = q.shift();
            processQ();

            var dbPath = dbs[job['target']]['path'];
            var skt = job['socket'];

            //dirty hack to directly call bash. Try to find a way to use process substituion with spawn.
            var cmd = params['blastPath'] + '/' + job['prog'] + ' -db ' + dbPath + ' -evalue 1 -outfmt ' + "'6 qseqid sseqid qlen slen pident length qstart qend sstart send evalue'" + " -num_threads " + params['threadsPerJob'] + " -query " + '<(echo ' + '"' + job['seq'] + '")'
            
            var child = spawn('/bin/bash', ['-c',cmd]);
            
            var stdout = '';
            var stderr = '';
            child.stdout.on('data', 
                function (data) {
                    stdout += data;
                }
            );

            child.stderr.on('data', 
                function(data) {
                    stderr += data;
                }
            );

            child.stdout.on('end', function() {
                concurrentCount -= 1;
                doneCount += 1;
                skt.emit('result',{'cmd':cmd,'db':job['target'],'jobIndex':job['jobIndex'],'result':stdout,'err':stderr});
                processQ();
            });
        }
    }
}

function status() {
    process.stdout.write("Number of jobs left: " + q.length + ", Number of concurrent jobs (max "  + params['concurrentJobs'] + "): " + concurrentCount + ", Number of jobs done total: " + doneCount + "\r");
}

module.exports = {
    "server":server,
    "io":io,
    "init":init,
}
