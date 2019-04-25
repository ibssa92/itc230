var http = require("http"), fs = require('fs'), qs = require("querystring");
let book = require('./lib/books.js');


function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}

http.createServer((req,res) => {
  let url = req.url.split("?"); 
  let query = qs.parse(url[1]); 
  let path = url[0].toLowerCase();
    
    
    
  switch(path) {
  case '/': 
      serveStatic(res, '/public/home.html', 'text/html');
      break;
          
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page');
      break;
          
    case '/get':
      let found = book.get(query.title);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let results = (found) ? JSON.stringify(found) : "Not found";
      res.end('Your results for ' + query.title + "\n" + results);
      break;
          
    case '/delete':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('delete');
        break;
          
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);
























































/* ASSIGNMENT 3 INDEX.JS

    
"use strict"; 

let book = require("./public/book.js");

const express = require("express"); 
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true})); 

//handle bars 
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//send static file as a response 

//home page
app.get('/', function(req,res){
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html');
}); 

//about page 
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

//delete
app.get('/delete', function(req,res){
    let result = book.delete(req.query.title); // delete book object
    res.render('delete', {title: req.query.title, result: result});
});

//details
app.post('/get', function(req,res){
    console.log(req.body);
    var header = 'Searching for: ' + req.body.title + '<br>';
    var found = book.get(req.body.title);
    res.render("details", {title: req.body.title, result: found});
});

//404 handler
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function(){
    console.log('Express Started!'); 
}); 

*/

