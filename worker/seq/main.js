var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

/*
-d path to data file
-i path to index file
*/
var params = {
    "dataPath":"",
    "indexPath":""
}

var server = function(req, res) {
    var seqName = req.url.substring(1);
    
    if (index[seqName]) {
        var offset = index[seqName];

        var buffer = new Buffer(offset[1]);
        fs.readSync(fd, buffer, 0, offset[1],offset[0])

        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.write(buffer.toString('utf-8'));
        res.end();
    }
}

var io = function(socket) {
    socket.on('seq', function (data) {
        var offset = index[data.seqName];

        var buffer = new Buffer(offset[1]);
        fs.readSync(fd, buffer, 0, offset[1],offset[0])

        socket.emit('result',{'data':buffer.toString('utf-8'),'log':'success'})
    });
}

var index = {}
var fd;
function init(args) {
    params['dataPath'] = args['-d'] || params['dataPath'];
    params['indexPath'] = args['-i'] || params['indexPath'];

    var rawIndex = fs.readFileSync(params['indexPath'], "utf8").split('\n');
    for (var i = 0 ; i < rawIndex.length ; i ++ ) {
        var cols = rawIndex[i].split('\t');
        index[cols[0]] = [parseInt(cols[1]),parseInt(cols[2])];
    }
    
    fd = fs.openSync(params['dataPath'],'r');
}

module.exports = {
    "server":server,
    "io":io,
    "init":init,
}
