//very simple utility function to parse function
function arg(args, flag) {
	return args[args.indexOf(flag) + 1];
}

//hash to hold parameters
var params = {};

//server handler
var server = function(req, res) {
	//do stuff
}


//socket io handler
var io = function(socket) {
	socket.emit('out', data);
	socket.on('input', function (data) {
		//do stuff
	});
}

//argument initiation
function init(args) {
	//params['name'] = arg('-flag')
}

//private module variables/functions


//module exports
module.exports = {
	"server":server,
	"io":io,
	"init":init,
}
