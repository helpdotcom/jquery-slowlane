var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(request, response) {
    var file = __dirname + request.url;
    switch (request.url) {
        case '/':
            file = __dirname + '/example.html';
        break;
        case '/jquery-slowlane.min.js':
            file = path.dirname(__dirname) + '/jquery-slowlane.min.js';
        break;
        case '/jquery-slowlane.min.css':
            file = path.dirname(__dirname) + '/jquery-slowlane.min.css';
        break;
    }

    fs.readFile(file, 'binary', function(error, example) {
        if (error) {
            response.writeHead(404);
            response.write('', 'binary');
            response.end();
            return;
        }

        response.writeHead(200);
        response.write(example, 'binary');
        response.end();
    });

}).listen(8080);
