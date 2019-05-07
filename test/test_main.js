//MOCHA TESTING

var expect = require("chai").expect;
//var book = require("../lib/book");

const validatePassword = (password) => {
    return (password.toLowerCase() != password);
}


describe("Password validation", () => {
 it("passes if mixed case", function() {
   var result = validatePassword("abcDef");
   expect(result).to.be.true;
 });

    
 it("fails if all lower case", () => {
   var result = validatePassword("abcdef");
   expect(result).to.be.false;
 });
});