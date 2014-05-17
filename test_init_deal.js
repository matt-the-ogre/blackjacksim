var DEBUG = true;

var Shoe = require('./shoe.js');
var shoe = new Shoe(6);

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// set this number to 313 or higher to test that the shoe is automatically refilled with new decks
// for (i = 0; i < 10; i++) {
//   console.log(shoe.dealOneCard());
// }

var Player = require('./player.js');

// initialize a blank player array
var players = [];
// set the starting number of players
var numPlayers = 3;

// initialize the 'players' array
for (player = 0; player <= numPlayers; player++) {
  // make a new player
  if (player != numPlayers) players.push(new Player('player'));
  // the last player created is a dealer
  else players.push(new Player('dealer'));
}

if (DEBUG) console.log(players);

// deal two cards to each player
for (i = 0; i < 2; i++) {
  for (player = 0; player < players.length; player++) {
    players[player].addCard(shoe.dealOneCard());
//     players[player].print();
//     console.log(players[player].getTotal());
  }
  // TODO check if they have 21 here!
}

var gameOver = false; // start with the game not over
var activePlayerNum = 0; // start with player 0

if (DEBUG) console.log('\ninitial deal is done, start playing the game');

while(!gameOver) {
//   if (players[activePlayerNum].getNextMove() != 'busted' || players[activePlayerNum].getNextMove() != 'won') {
//     console.log('skipping player because busted or won');
//   } else {

    if (DEBUG) console.log('Player ' + activePlayerNum + ' turn.');
    if (DEBUG) players[activePlayerNum].print();
    if (DEBUG) console.log(players[activePlayerNum].getTotal());

    // check the player's next move here
    if (players[activePlayerNum].getNextMove() == 'hit') {
      // deal a new card to the player
      players[activePlayerNum].addCard(shoe.dealOneCard());
    }

    if (DEBUG) players[activePlayerNum].print();
    if (DEBUG) console.log(players[activePlayerNum].getTotal());

    // check if they bust
    if (players[activePlayerNum].getTotal()[0] > 21 && players[activePlayerNum].getTotal()[1] > 21 ) {
      // this player bust, check if it's the dealer
      if (players[activePlayerNum].playerType == 'dealer') {
        // dealer busts, game over
        if (DEBUG) console.log('Dealer bust!');
        gameOver = true;
      } else {
        // player busts, take them out of the game
        if (DEBUG) console.log('Player ' + activePlayerNum + ' busts.');
        players[activePlayerNum].nextMove = 'busted';
//         if (DEBUG) console.log(players.length + ' ' + activePlayerNum);
        players.splice(activePlayerNum,1);
//         if (DEBUG) console.log(players.length + ' ' + activePlayerNum);
        numPlayers--;
        activePlayerNum--;
      }
    }

    // check if they have 21; automatic win
    else if (players[activePlayerNum].getTotal()[0] == 21 || players[activePlayerNum].getTotal()[1] == 21 ) {
      // this player won!
      // check if it's the dealer
      if (players[activePlayerNum].playerType == 'dealer') {
        // dealer won, game over
        if (DEBUG) console.log('Dealer won!');
        gameOver = true;
      } else {
        // player wins, take them out of the game
        if (DEBUG) console.log('Player ' + activePlayerNum + ' won!');
        players[activePlayerNum].nextMove = 'won';
//         if (DEBUG) console.log(players.length);
        players.splice(activePlayerNum,1);
//         if (DEBUG) console.log(players.length);
        numPlayers--;
        activePlayerNum--;
      }
    }
//   }
  // check for everyone staying
  var stayCount = 0;
  players.forEach(function(player) {
    if (player.getNextMove() == 'stay') {
      stayCount++;
    }
  });

  // if stayCount is the same as the number of active players (everyone is staying!) and the dealer (+1) then game is over
  if (stayCount == numPlayers + 1) {
    gameOver = true;
    if (DEBUG) console.log('everyone is staying! game over');
    // TODO determine a winner
  }

//   if (DEBUG) console.log('numPlayers = ' + numPlayers + ' activePlayerNum = ' + activePlayerNum);

  if (numPlayers == 1) gameOver = true;

  activePlayerNum++;

  if (activePlayerNum > numPlayers) activePlayerNum = 0; // restart at player 0

//   if (DEBUG) console.log('numPlayers = ' + numPlayers + ' activePlayerNum = ' + activePlayerNum);

//   if (DEBUG) console.log(players);

}

if (DEBUG) console.log('Game Over.');
