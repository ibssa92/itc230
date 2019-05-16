'use strict'

let book = require('./models/book-model.js');

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 

app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', (req, res, next) => {

myBook.find({}, function (err, items) {
  if (err) return next(err);
  //console.log("All --> "+items);
  // other code here
  var allBooks  = items;
 res.render('home', {books:allBooks});
});
});

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html'); 
});

app.get('/delete', (req, res, next) => {
  var qty=0;
  var myTitle = req.query.title;
myBook.deleteOne({title:myTitle}, function (err, items) {
 if (err) return next(err);
});

 myBook.find({}, function (err, items) {
  if (err) return next(err);
  qty = items.length;
   var deletedBook = {quantity:qty, title:myTitle};
 
 res.render('delete', deletedBook);
});
});

app.post('/detail', (req, res, next) => {  //detail path - Form Post Method
  var myTitle = req.body.title.trim();
  var my_pattern = new RegExp(myTitle, "i"); 
   myBook.findOne({title:{$regex: my_pattern}}, function (err, item) {
  if (err) return next(err);
   var myBookInfo = item;
  let result = req.body.title;
  myBookInfo.result = result;
  res.render('detail', myBookInfo); //detail.html file
});       
});

app.get('/detail', (req, res, next) => { //detail path - Link Get Method
  var myTitle = req.query.title;
 myBook.findOne({title:myTitle}, function (err, item) {
  if (err) return next(err);
   var myBookInfo = item;
  let result = req.query.title;
  myBookInfo.result = result;
  res.render('detail', myBookInfo); //detail.html file
}); 
});



// send plain text response
app.get('/about', (req, res) => {
 res.type('text/html');
 res.sendFile(__dirname + '/package.json');
});

// send plain text response
app.get('/getall', (req, res) => {
  var allBooks  = myBook.getAll();
  var output = JSON.stringify(allBooks);
  res.type('text/plain');
  res.send(output);
});



app.listen(app.get('port'), () => {
 console.log('Express started'); 
});

// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

