var DEBUG = true;

var Shoe = require('./shoe.js');
var shoe = new Shoe(6);

// set this number to 313 or higher to test that the shoe is automatically refilled with new decks
for (i = 0; i < 10; i++) {
  console.log(shoe.dealOneCard());
}

