var DEBUG = true;

var Shoe = require('./shoe.js');
var shoe = new Shoe(6);

// set this number to 313 or higher to test that the shoe is automatically refilled with new decks
for (i = 0; i < 10; i++) {
  console.log(shoe.dealOneCard());
}

var Hand = require('./hand.js');
var player1Hand = new Hand();

for (i = 0; i < 10; i++) {
  player1Hand.addCard(shoe.dealOneCard());
  player1Hand.print();
  console.log(player1Hand.getTotal());
}

