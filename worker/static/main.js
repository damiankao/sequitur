var static = require( 'node-static' );
var http = require( 'http' );
var path = require('path');

var file;

var params = {
    "static":''
}

var server = function(request, response) {
    request.addListener( 'end', function () {
        file.serve( request, response );
    }).resume();
} 

function init(args) {
    params['static'] = args['-d'];
    params['static'] = path.resolve(path.normalize(params['static']));
    console.log(params['static'])
    file = new static.Server(params['static'],{
	    //cache: 3600,
	    gzip: true
	});
}

module.exports = {
    "server":server,
    "init":init,
}
