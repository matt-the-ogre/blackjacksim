//---------
// This file contains the Class definition for a Deck, which is an array of cards


// IMPORTANT: I don't think we need the concept of a deck because the Shoe supercedes it

var DEBUG = false;
module.exports = Deck;

var Card = require('./card.js');

function Deck() {
  var cardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  var cardSuits = ['S','H','D','C'];
  this.cards = [];

  for (suitIndex = 0; suitIndex < cardSuits.length; suitIndex++) {
    for (valueIndex = 0; valueIndex < cardValues.length; valueIndex++){
      card = new Card(cardValues[valueIndex],cardSuits[suitIndex]);
      this.cards.push(card);
    }
  }

  if (DEBUG) console.log('Deck instantiated as' + this.cards);
}

