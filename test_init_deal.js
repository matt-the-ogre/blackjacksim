var DEBUG = true;

var Shoe = require('./shoe.js');
var shoe = new Shoe(6);

// set this number to 313 or higher to test that the shoe is automatically refilled with new decks
// for (i = 0; i < 10; i++) {
//   console.log(shoe.dealOneCard());
// }

var Hand = require('./hand.js');

var hands = [];
var numPlayers = 3;

// initialize the 'hands' array
for (hand = 0; hand <= numPlayers; hand++) {
  hands.push(new Hand());
}

if (DEBUG) console.log(hands);

// deal two cards to each player
for (i = 0; i < 2; i++) {
  for (hand = 0; hand < hands.length; hand++) {
    hands[hand].addCard(shoe.dealOneCard());
    hands[hand].print();
    console.log(hands[hand].getTotal());
  }
  // TODO check if they have 21 here!
}

var gameOver = false; // start with the game not over
var activePlayerNum = 0; // start with player 0

if (DEBUG) console.log('initial deal is done, start playing the game');

while(!gameOver) {
  // deal a new card to the next player
  if (DEBUG) console.log('Player ' + activePlayerNum + ' turn.');

  hands[activePlayerNum].addCard(shoe.dealOneCard());
  if (DEBUG) hands[activePlayerNum].print();
  if (DEBUG) console.log(hands[activePlayerNum].getTotal());
  // check if they bust
  if (hands[activePlayerNum].getTotal()[0] > 21 && hands[activePlayerNum].getTotal()[1] > 21 ) {
    // this player bust, check if it's the dealer
    if (activePlayerNum == hands.length) {
      // dealer busts, game over
      if (DEBUG) console.log('Dealer bust!');
      gameOver = true;
    } else {
      // player busts, take them out of the game
      if (DEBUG) console.log('Player ' + activePlayerNum + ' busts.');
      hands = hands.splice[activePlayerNum,1];
      numPlayers--;
      activePlayerNum--;
    }
  }
  // check if they have 21; automatic win
  else if (hands[activePlayerNum].getTotal()[0] == 21 || hands[activePlayerNum].getTotal()[1] == 21 ) {
    // this player won!
    // check if it's the dealer
    if (activePlayerNum == hands.length) {
      // dealer won, game over
      if (DEBUG) console.log('Dealer won!');
      gameOver = true;
    } else {
      // player wins, take them out of the game
      if (DEBUG) console.log('Player ' + activePlayerNum + ' won!');
      hands = hands.splice[activePlayerNum,1];
      numPlayers--;
      activePlayerNum--;
    }
  }
  if (numPlayers == 1) gameOver = true;
  activePlayerNum++;
  if (activePlayerNum > numPlayers) activePlayerNum = 0; // restart at player 0
}

