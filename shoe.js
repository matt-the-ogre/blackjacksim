//---------
// This file contains the Class definition for a Shoe, which is an collection of Decks all in one array
var DEBUG = false;

//var Deck = require('./deck.js');
var Card = require('./card.js');

module.exports = Shoe;

function Shoe(numDecks) {
  this.cards = [];
  this.numDecks = numDecks;

  this.buildShoe(numDecks);

  //if (DEBUG) console.log('Shoe instantiated as' + this.cards);
}

// private, TODO make it a private method (is that possible in javascript?)
Shoe.prototype.buildShoe = function(numDecks) {
  var cardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  var cardSuits = ['S','H','D','C'];
  this.cards = [];
  if (DEBUG) console.log('building shoe');

  // fill the empty shoe array with numDecks number of card decks
  for (deck = 0; deck < numDecks; deck++) {
    for (suitIndex = 0; suitIndex < cardSuits.length; suitIndex++) {
      for (valueIndex = 0; valueIndex < cardValues.length; valueIndex++){
        card = new Card(cardValues[valueIndex],cardSuits[suitIndex]);
        this.cards.push(card);
      }
    }
  }
}

Shoe.prototype.dealOneCard = function(){
	//picks a card at random from the deck
  randomCardIndex = Math.floor(Math.random() * this.cards.length);
  //if (DEBUG) console.log('randomCardIndex = ' + randomCardIndex);
  randCard = this.cards[randomCardIndex];
  //if (DEBUG) console.log('randCard = ' + randCard);
	//removes the card from the deck
	this.cards.splice(randomCardIndex,1);

  // if the shoe array is zero length, rebuild it.
  if (!this.cards.length) {
    this.buildShoe(this.numDecks);
  }
  if (DEBUG) console.log(randCard);
  return randCard;
}

