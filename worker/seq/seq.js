var http = require('http'),
    fs = require("fs");

var port = process.argv[3] || 8889
var faPath = process.argv[2]

var rawIndex = fs.readFileSync(process.argv[2] + '.fai', "utf8").split('\n');
var index = {};

for (var i = 0 ; i < rawIndex.length ; i ++ ) {
    var cols = rawIndex[i].split('\t');
    index[cols[0]] = [parseInt(cols[2]),parseInt(cols[3])];
}

var fd = fs.openSync(faPath,'r');

http.createServer(function (req, res) {
    var seqName = req.url.substring(1);

    if (index[seqName]) {
        var offset = index[seqName];

        var buffer = new Buffer(offset[1]);
        fs.readSync(fd, buffer, 0, offset[1],offset[0])

        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.write(buffer.toString('utf-8'));
        res.end();
    }
}).listen(port);
