var DEBUG = false;

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
var numGames = 1000000;
var date = new Date();
console.log(date);
console.log('\nStarting a run of ' + numGames + ' games.\n');
var statistics = {wins:[0,0,0,0], losses:[0,0,0,0]}; // TODO populate this properly according to numPlayers

for (var gameNum = 0; gameNum < numGames; gameNum++) {
// 	console.log(date);
	if (DEBUG) console.log('Game: ' + gameNum);


  // initialize a blank player array
  var players = [];
  // set the starting number of players
  var numPlayers = 4; // including the dealer

  // initialize the 'players' array
  for (player = 0; player < numPlayers; player++) {

    // make a new player
    if (player != numPlayers-1) players.push(new Player('player', player));

    // the last player created is a dealer
    else players.push(new Player('dealer', player));
  }

  // deal two cards to each player
  for (i = 0; i < 2; i++) {
    for (player = 0; player < players.length; player++) {
      players[player].addCard(shoe.dealOneCard());
      players[player].getNextMove();
    }
    // TODO check if they have 21 here!
  }

  if (DEBUG) console.log(players);

  var gameOver = false; // start with the game not over
  var dealerBust = false; // so we can check at the end who won (of the remaining players)
  var dealerWon = false;
  var activePlayerNum = 0; // start with player 1


  if (DEBUG) console.log('\ninitial deal is done, start playing the game');

  // this is the main game loop
  while(!gameOver) {

    // check the player's next move here
    if (players[activePlayerNum].getNextMove() == 'hit') {
      // deal a new card to the player
      var newCard = shoe.dealOneCard();
      if (DEBUG) console.log('\ndealing ');
      if (DEBUG) players[activePlayerNum].print();
      if (DEBUG) newCard.print();
      players[activePlayerNum].addCard(newCard);
    }

    if (DEBUG) players[activePlayerNum].print();

    // store handtotal locally
    var cardTotal = players[activePlayerNum].getTotal();

    // check if they bust
    if (cardTotal[0] > 21 && cardTotal[1] > 21 ) {
      // this player bust, check if it's the dealer
      if (players[activePlayerNum].playerType == 'dealer') {
        // dealer busts, game over
        if (DEBUG) console.log('Dealer bust!');
        statistics.losses[statistics.losses.length - 1]++;
        players.splice(activePlayerNum,1);
        numPlayers--;
        activePlayerNum--;
        dealerBust = true;
        gameOver = true;
      } else {
        // player busts, take them out of the game
        if (DEBUG) console.log('Player ' + players[activePlayerNum].identity + ' busts.');
        //players[activePlayerNum].nextMove = 'busted';
        statistics.losses[players[activePlayerNum].identity]++;
        players.splice(activePlayerNum,1);
        numPlayers--;
        activePlayerNum--;
      }
    }

    // check if they have 21; automatic win
    else if (cardTotal[0] == 21 || cardTotal[1] == 21 ) {
      // this player won!
      // check if it's the dealer
      if (players[activePlayerNum].playerType == 'dealer') {
        // dealer won, game over
        if (DEBUG) console.log('Dealer won!');
        dealerWon = true;
        statistics.wins[statistics.wins.length - 1]++;
        gameOver = true;
      } else {
        // player wins, take them out of the game
        if (DEBUG) console.log('Player ' + players[activePlayerNum].identity + ' won!');
        //players[activePlayerNum].nextMove = 'won';
        statistics.wins[players[activePlayerNum].identity]++;
        players.splice(activePlayerNum,1);
        numPlayers--;
        activePlayerNum--;
      }
    }

    // check for everyone staying
    if (!gameOver) {
      var stayCount = 0;
      players.forEach(function(player) {
        if (player.getNextMove() == 'stay') stayCount++;
      });

      // if stayCount is the same as the number of active players (everyone is staying!) and the dealer (+1) then game is over
      if (stayCount == numPlayers) {
        gameOver = true;
        if (DEBUG) console.log('everyone is staying! game over');

        var winner = [undefined, undefined];
        var winningTotal = [0,0];

        players.forEach(function(player) {
          var playerTotal = player.getTotal();
          for (index = 0; index < playerTotal.length; index++) {
            if (playerTotal[index] < 22 && playerTotal[index] > winningTotal[index]) {
              winner[index] = player;
              winningTotal[index] = playerTotal[index];
            }
          }
        })

        var finalWinner = undefined;
        if (winner[0].identity == winner[1].identity) finalWinner = 0;
        else if (winningTotal[0] > winningTotal[1]) finalWinner = 0;
        else if (winningTotal[0] < winningTotal[1]) finalWinner = 1;
        else if (winner[0].playerType == 'dealer') finalWinner = 0; // dealer wins in the case of a tie
        else if (winner[1].playerType == 'dealer') finalWinner = 1; // dealer wins in case of a tie
        else finalWinner = 0;

        // pretty sure there's a case here where two non-dealers win with tied totals, and both need to win

        if (DEBUG) console.log('Winner is ' + winner[finalWinner].identity + ' with ' + winningTotal[finalWinner]);
        statistics.wins[winner[finalWinner].identity]++;

      }
    }

    // only one player left
    // TODO need better logic here
    if (numPlayers == 1) {
      if (DEBUG) console.log('Winner is...');
      for (player = 0; player < players.length; player++) {
            statistics.wins[players[player].identity]++;
            if (DEBUG) players[player].print();
      }
      gameOver = true;
    }

    activePlayerNum++;

    // restart at player 0
    if (activePlayerNum >= numPlayers) activePlayerNum = 0;

  }

  if (DEBUG) console.log('\nGame Over.');
  if (dealerWon) if (DEBUG) console.log('\ndealer won');
  else if (dealerBust) {
    if (DEBUG) console.log('\ndealer bust, these players won...');
    if (DEBUG) console.log(players, players.length)
    for (player = 0; player < players.length; player++) {
          statistics.wins[players[player].identity]++;
          if (DEBUG) players[player].print();
    }
  }

}

console.log(statistics);
console.log(date);
