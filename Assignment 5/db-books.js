var Book = require("./models/book-model");

// return all records
Book.find({}, (err, items) => {
  if (err) return next(err);
  console.log(items.length);
  // other code here
});

// return all records that match a condition
Book.find({'author':'chris walker'}, (err, items) => {
 if (err) return next(err);
 console.log("chris walker: " +items.length);
 // other code here
});

// return all records that match a condition
Book.find({'author':'Chris Walker'}, (err, items) => {
 if (err) return next(err);
 console.log("Chris Walker: " +items.length);
 // other code here
});

// return a single record
Book.findOne({'title':'Moby Dick'}, (err, item) => {
  if (err) return next(err);
  console.log(item);
  // other code here
});

// insert or update a single record
var newBook = {'title':'moby dick', 'author':'john wayne', 'price': 20 }
Book.updateOne({'title':'moby dick'}, newBook, {upsert:true}, (err, result) => {
  if (err) return next(err);
  console.log(result);
  // other code here
});