//console.log("Hello World");
var http = require("http") ;

/*http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("hello world");
	 response.end();
}

).listen(8888);*/

/*function ww(req,res){
	console.log("request server");
	res.writeHead(200, {"Content-Type":"text/plain"});
	res.write("hello world");
	res.end();
}
http.createServer(ww).listen(8888);
console.log("wangxiangjian write");*/
var url = require("url");
function start(){
	function ww(req,res){
		try{
			var name1 = url.parse(req.url).pathname;
			console.log("request for" + name1+ "received.");
			res.writeHead(200, {"Content-Type":"text/plain"});
			res.write("hello world1");
			res.end();
		}catch(e){console.log(e)};
	}

	http.createServer(ww).listen(8888);
	//console.log("wangxiangjian1");
}

start();

//exports.start=start;