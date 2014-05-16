//---------
// This file contains the Class definition for a Card

// create a card by passing it a value and suit.
// value must be in the set ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
// suit must be one of ['S','H','D','C'] which represents Spades, Hearts, Diamonds and Clubs
var DEBUG = false;
module.exports = Card;

function Card(value, suit) {

  if (!(['A','2','3','4','5','6','7','8','9','10','J','Q','K'].indexOf(value)+1)) {
    if (DEBUG) console.log('invalid value:' + value);
    return false;
  };
  if (!(['S','H','D','C'].indexOf(suit)+1)) {
    if (DEBUG) console.log('invalid suit:' + suit);
    return false;
  }
  this.value = value;
  this.suit = suit;
  if (DEBUG) console.log('Card instantiated as ' + value + ' of ' + suit);
  return true;
}

Card.prototype.value = '';
Card.prototype.suit = '';

