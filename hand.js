//---------
// This file contains the Class definition for a Hand, which is an array of Cards
var DEBUG = true;

//var Deck = require('./deck.js');
var Card = require('./card.js');

module.exports = Hand;

function Hand() {
  this.cards = [];
  this.valueLookup = {'A':[1,11], '2':[2,2],'3':[3,3],'4':[4,4],'5':[5,5],'6':[6,6],'7':[7,7],'8':[8,8],'9':[9,9],'10':[10,10],'J':[10,10],
                      'Q':[10,10],'K':[10,10]};

  if (DEBUG) console.log('Hand instantiated as' + this.cards);
}

Hand.prototype.addCard = function(card) {
  this.cards.push(card);
}

Hand.prototype.getTotal = function() {
  var cardTotal = [0,0];

  if (!this.cards.length) {
    // no cards, total is 0
    cardTotal = [0,0];
  }
  else {
    // one or more cards, let's total them up
    //this.cards.forEach( function(card) {
    //  //var parent = this;
    //  cardTotal[0] += valueLookup[card.value][0];
    //  console.log('cardTotal = ' + cardTotal);
    //});
    for (card = 0; card < this.cards.length; card++) {
      cardTotal[0] += this.valueLookup[this.cards[card].value][0];
      cardTotal[1] += this.valueLookup[this.cards[card].value][1];
      console.log('cardTotal = ' + cardTotal);
    }
  }
  return cardTotal;
}

Hand.prototype.print = function() {
  for (card = 0; card < this.cards.length; card++) {
  console.log('Hand = ' + this.cards[card].value + this.cards[card].suit);
  }
}
