'use strict'
const expect = require("chai").expect;
const book = require("./lib/books");

describe("Book", function() {
    
    it("returns book", function() {
        let result = book.get("Holes");
        expect(result).to.deep.equal({title: "Holes", author:"Chris Walker", price:17});
    });
    
    it("fails to return invalid book", function() {
        let result = book.get("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new book", function() {
        let result = book.add({title: "Holes 2", author:"Chris Walker", price:17});
        expect(result.added).to.be.true;
    });
    it("fails to add an existing book", function() {
        let result = book.add({title: "Holes", author:"Chris Walker", price:17});
        expect(result.added).to.be.false;
    });

    it("deletes an existing book", function() {
        let result = book.delete("Holes");
        expect(result.deleted).to.be.true;
    });
    it("fails to delete an invalid book", function() {
        let result = book.delete("travels with charlie");
        expect(result.deleted).to.be.false;
    });

});