var DEBUG = true;
var Hand = require('./hand.js');
var Color = require('./color.js');

var color = new Color();

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
  this.getNextMove();
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

  //for (total in cardTotal) {
  // loop through both card total elements
  for (index = 0; index < cardTotal.length; index++) {
    // check if this is a player vs. dealer
    if (this.playerType == 'player') {
      // check if they won
      if (cardTotal[index] == 21) {
        if (DEBUG) console.log('player won with ' + cardTotal[index]);
        nextMove[index] = 'won';
        break;
      }
      // check if they should stay
      else if(cardTotal[index] >= 17 )
      //else if(cardTotal[index] >= 17 && cardTotal[index] < 21)
      {
        if (DEBUG) console.log('player stay with ' + cardTotal[index]);
        nextMove[index] = 'stay';
      }
      else
      // otherwise hit
      {
        if (DEBUG) console.log('player hit with ' + cardTotal[index]);
        nextMove[index] = 'hit';
      }
    } else {
      // dealer!
      // check if they won
      if (cardTotal[index] == 21) {
        if (DEBUG) console.log('dealer won with ' + cardTotal[index]);
        nextMove[index] = 'won';
        break;
      }
      // check if they should stay
      else if(cardTotal[index] >= 17)
      {
        if (DEBUG) console.log('dealer stay with ' + cardTotal[index]);
        nextMove[index] = 'stay';
      }
      // otherwise hit
      else
      {
        if (DEBUG) console.log('dealer hit with ' + cardTotal[index]);
        nextMove[index] = 'hit';
      }

    }
  }

  // we now have an array of two possible moves
  if (nextMove[0] == 'won' || nextMove[1] == 'won') this.nextMove = 'won';
  else if (nextMove[0] == 'stay' && nextMove[1] == 'stay') this.nextMove = 'stay';
  else if (nextMove[0] == 'hit' || nextMove[1] == 'hit') this.nextMove = 'hit'; // this accounts for the 'soft 17'
  else {
    console.log('nextMove: ' + nextMove);
    console.assert('reached ending else in player.getNextMove; shouldnt happen');
                   }
  return this.nextMove;
}
