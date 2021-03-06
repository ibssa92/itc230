let books = [
 { title:'Moby Dick', price:20, author:'John Wayne' },
 { title:'Tom Sawyer', price:12, author:'Jeff Wall' },
 { title:'The Storm', price:25, author:'Bob James' },
 { title:'Holes', price:17, author:'Chris Walker' },
 { title:'So Far Gone', price:30, author:'John Steele' }
];

//get all items in array
exports.getAll = () => {
    return books;
};

//get by book title
exports.get = (title) => {
    return books.find((item) => {
        return item.title === title;
    });
};

//delete by book title
exports.delete = (title) => {
  
    const oldLength = books.length;
    books = books.filter((item) => {
        return item.title !== title;
    });

    return {
        deleted: oldLength !== books.length, total: books.length 
    };
};

//add book
exports.add = (newBook) => {
    const oldLength = books.length;
    // check if the book already exists
    let found = this.get(newBook.title);
    if (!found) {
        books.push(newBook);
    }
    // if old array length and new array length differ, book was added
    return {
        added: oldLength !== books.length, total: books.length 
    };
};
