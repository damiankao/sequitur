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
    var refName = req.url.substring(1);
    
    if (index[refName]) {
        var offset = index[refName];

        var buffer = new Buffer(offset[1]);
        fs.readSync(fd, buffer, 0, offset[1],offset[0])

        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.write(buffer.toString('utf-8'));
        res.end();
    }
}

var io = function(socket) {
    socket.on('feat', function (data) {
	if (index[data.featName] != undefined) {
        	var offset = index[data.featName];

        	var buffer = new Buffer(offset[1]);
        	fs.readSync(fd, buffer, 0, offset[1],offset[0])

        	socket.emit('feat',{'data':buffer.toString('utf-8'),'status':'success'});
        } else {
		    socket.emit('feat',{'status':'failed','error':data.featName + ' not found'});
	    }
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
