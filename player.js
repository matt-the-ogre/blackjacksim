var DEBUG = false;
var Hand = require('./hand.js');

module.exports = Player;

function Player(playerType, identity) {
  this.hand = new Hand();
  this.playerType = playerType;
  this.identity = identity;
  this.nextMove = undefined;

  //if (DEBUG) console.log('player instantiated as ' + this.playerType);
}

Player.prototype.addCard = function(card) {
  this.hand.addCard(card);
}

Player.prototype.getTotal = function() {
  return this.hand.getTotal();
}

Player.prototype.print = function() {
  console.log('['+ this.identity + ']: Total = ' + this.getTotal() + ' ' + this.playerType + ' => ' + this.nextMove);
  this.hand.print();
}

Player.prototype.getNextMove = function ()
{
	var cardTotal = this.hand.getTotal(); // TODO need to handle both values here
  var nextMove = [undefined,undefined];

//  for (total in cardTotal) {
  for (index = 0; index < cardTotal.length; index++) {
    if (this.playerType == 'player') {
      // check if they won
      if (cardTotal[index] == 21) {
        if (DEBUG) console.log('won');
        nextMove[index] = 'won';
      }
      // check if they should stay
      else if(cardTotal[index] >= 17 && cardTotal[index] < 21)
      {
        if (DEBUG) console.log('stay');
        nextMove[index] = 'stay';
      }
      else
      // otherwise hit
      {
        //console.assert(cardTotal[index] <= 21, 'should never have a cardTotal > 21 in a players hand');
        if (DEBUG) console.log('hit');
        nextMove[index] = 'hit';
      }
    } else {
      // dealer!
      // check if they won
      if (cardTotal[index] == 21) {
        if (DEBUG) console.log('won');
        nextMove[index] = 'won';
      }
      // check if they should stay
      else if(cardTotal[index] >= 17 && cardTotal[index] < 21)
      {
        if (DEBUG) console.log('stay');
        nextMove[index] = 'stay';
      }
      // otherwise hit
      else
      {
        //console.assert(cardTotal[index] <= 21, 'should never have a cardTotal > 21 in a dealers hand');
        if (DEBUG) console.log('hit');
        nextMove[index] = 'hit';
      }

    }
  }

  // we now have an array of two possible moves
  if (nextMove[0] == 'won' || nextMove[1] == 'won') this.nextMove = 'won';
  else if (nextMove[0] == 'stay' && nextMove[1] == 'stay') this.nextMove = 'stay';
  else if (nextMove[0] == 'hit' || nextMove[1] == 'hit') this.nextMove = 'hit';

  return this.nextMove;
}
