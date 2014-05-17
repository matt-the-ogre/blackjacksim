var DEBUG = false;
var Hand = require('./hand.js');

module.exports = Player;

function Player(playerType) {
  this.hand = new Hand();
  this.playerType = playerType;
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
  console.log('playerType = ' + this.playerType + ' nextMove = ' + this.nextMove);
  this.hand.print();
}

Player.prototype.getNextMove = function ()
{
	cardTotal = this.hand.getTotal()[0]; // TODO need to handle both values here
  var nextMove = undefined;

//   for (total in cardTotal) {
    if (this.playerType == 'player') {

      //PLAYER STAY
      if(cardTotal >= 17 && cardTotal <= 21)
      {
        if (DEBUG) console.log('stay');
        nextMove = 'stay';
      }

      //PLAYER 1 HIT
      else
      {
        console.assert(cardTotal <= 21, 'should never have a cardTotal > 21 in a players hand');
        if (DEBUG) console.log('hit');
        nextMove = 'hit';
      }
    } else {
      // dealer!
      //STAY
      if(cardTotal >= 17 && cardTotal <= 21)
      {
        if (DEBUG) console.log('stay');
        nextMove = 'stay';
      }

      //HIT
      else
      {
        console.assert(cardTotal <= 21, 'should never have a cardTotal > 21 in a dealers hand');
        if (DEBUG) console.log('hit');
        nextMove = 'hit';
      }

    }
//   }

  this.nextMove = nextMove;

  return nextMove;
}
