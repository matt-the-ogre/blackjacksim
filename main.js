var DEBUG = true;

var Shoe = require('./shoe.js');
var shoe = new Shoe(6, true);

var Player = require('./player.js');
var numHands = 2;
var Color = require('./color.js');

var color = new Color();


var date = new Date();
console.log(date);
console.log('\nStarting a run of ' + numHands + ' hands.\n');

// this object tracks wins and losses (need to add pushes?)
// the elements of the array correspond to the player number
// TODO: make the arrays size correctly for different numbers of players
var statistics = {wins:[0,0,0,0], losses:[0,0,0,0], pushes:[0,0,0,0]};

var players = [];
// set the starting number of players
var numPlayers; // including the dealer; TODO: not tested with different number of players yet

function initPlayers() {
  // initialize a blank player array
  // the players array has a Player object as each element;
  // the player number corresponds with the position in the array
  // initialize the 'players' array
  players = [];
  numPlayers = 4;

  for (var player = 0; player < numPlayers; player++) {

    // make a new player
    if (player < numPlayers - 1) players.push(new Player('player', player));

    // the last player created is a dealer
    else players.push(new Player('dealer', player));
  }
}

function firstDeal() {
  // deal two cards to each player
  for (i = 0; i < 2; i++) {
    for (player = 0; player < players.length; player++) {
      players[player].addCard(shoe.dealOneCard());
//      players[player].getNextMove();
    }
    // TODO check if they have 21 here!
  }
}

// central place to update the statistics object
function updateStats(playerIdentity, result) {
  // valid values for result are: 'win' 'loss' 'push'
  switch (result) {
    case 'win':
      statistics.wins[playerIdentity]++;
      //if (playerIdentity == 3) console.log('updateStats: dealer won');
      break;
    case 'loss':
      statistics.losses[playerIdentity]++;
      break;
    case 'push':
      statistics.pushes[playerIdentity]++;
      break;
    default:
      console.assert("default switch reached in updateStats; this should never happen");
  }

}

// see numGames above; this is the loop that plays a certain number of games
for (var handNum = 0; handNum < numHands; handNum++) {
//if (DEBUG)     	console.log(date);
	if (DEBUG)    console.log('Hand: ' + handNum);

  initPlayers();
  firstDeal();

  //if (DEBUG) console.log(players);

  // initialize variables for this hand
  var gameOver = false; // start with the hand not over
  var dealerBust = false; // so we can check at the end who won (of the remaining players)
  var dealerWon = false;
  var activePlayerNum = 0; // start with player 1

  if (DEBUG) console.log('\ninitial deal is done, start playing the hand');

  // this is the main game loop
  while(!gameOver) {
    // check the player's next move here
    if (players[activePlayerNum].nextMove == 'hit') {
      // deal a new card to the player
      var newCard = shoe.dealOneCard();
      if (DEBUG) console.log('\ndealing ');
      if (DEBUG) players[activePlayerNum].print();
      if (DEBUG) newCard.print();
      players[activePlayerNum].addCard(newCard);
    }

    if (DEBUG) players[activePlayerNum].print();

    // store cardTotal locally
    var cardTotal = players[activePlayerNum].getTotal();

    // check if they bust
    if (cardTotal[0] > 21 && cardTotal[1] > 21 ) {

      // this player bust, check if it's the dealer
      if (players[activePlayerNum].playerType == 'dealer') {
        // dealer busts, game over
        if (DEBUG) console.log(color.red + 'Dealer bust!' + color.off);
        // update the statistics object
        updateStats(players[activePlayerNum].identity, 'loss');
        players.splice(activePlayerNum,1);
        numPlayers--;
        activePlayerNum--;
        dealerBust = true;
        gameOver = true;
      } else {
        // player busts, take them out of the game
        if (DEBUG) console.log(color.red + 'Player ' + players[activePlayerNum].identity + ' busts.' + color.off);
        //players[activePlayerNum].nextMove = 'busted';
        updateStats(players[activePlayerNum].identity, 'loss');
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
        if (DEBUG) console.log(color.blue + 'Dealer won!' + color.off);
        dealerWon = true;
        updateStats(players[activePlayerNum].identity, 'win');
        gameOver = true;
      } else {
        // player wins, take them out of the game
        if (DEBUG) console.log(color.blue + 'Player ' + players[activePlayerNum].identity + ' won!' + color.off);
        //players[activePlayerNum].nextMove = 'won';
        updateStats(players[activePlayerNum].identity, 'win');
        players.splice(activePlayerNum,1);
        numPlayers--;
        activePlayerNum--;
      }
    }

    // check for everyone staying
    if (!gameOver) {
      var stayCount = 0;
      players.forEach(function(player) {
        if (player.nextMove == 'stay') stayCount++;
      });

      // if stayCount is the same as the number of active players (everyone is staying!) and the dealer (+1) then game is over
      if (stayCount == numPlayers) {
        gameOver = true;
        if (DEBUG) console.log('everyone is staying! game over');

        // need to compare each player against the dealer, not against each other
        var dealer = players[players.length-1]
        var dealerTotal = dealer.getTotal();

        //var winner = [undefined, undefined];
        var winner = dealer;
        var winningTotal = [0,0];

        // check pair-wise every player against the dealer
        players.forEach(function(player) {
          // skip the dealer; don't need to compare against itself
          if (player.identity != dealer.identity) {
            var playerTotal = player.getTotal();
            for (total in playerTotal) {
              // if the current total is not 'bust' and larger than the dealer, this player wins
              if ((total < 22 && total > dealerTotal[0]) || (total < 22 && total > dealerTotal[1])) {
                updateStats(player.identity, 'win');
                updateStats(dealer.identity, 'loss');
              }
              // if they are equal, dealer wins
              else if ((total << 22 && total == dealerTotal[0]) || (total << 22 && total == dealerTotal[1])) {
                updateStats(player.identity, 'loss');
                updateStats(dealer.identity, 'win');
              }
            }
          }
        });


//         var finalWinner = undefined;
//         if (winner[0].identity == winner[1].identity) finalWinner = 0;
//         else if (winningTotal[0] > winningTotal[1]) finalWinner = 0;
//         else if (winningTotal[0] < winningTotal[1]) finalWinner = 1;
//         else if (winner[0].playerType == 'dealer') finalWinner = 0; // dealer wins in the case of a tie
//         else if (winner[1].playerType == 'dealer') finalWinner = 1; // dealer wins in case of a tie
//         else finalWinner = 0;

//         // TODO: pretty sure there's a case here where two non-dealers win with tied totals, and both need to win

//         if (DEBUG) console.log('Winner is player ' + winner[finalWinner].identity + ' with ' + winningTotal[finalWinner]);
//         updateStats(winner[finalWinner].identity, 'win');
//         // TODO: log the losses here
    	}
    }

    // only one player left
    // TODO need better logic here
    if (numPlayers == 1) {
//       if (DEBUG) console.log('Winner is...');
//       for (player = 0; player < players.length; player++) {
//         updateStats(players[player].identity, 'win');
//         if (DEBUG) players[player].print();
//       }
//       gameOver = true;
    }

    // advance the player num for the next run through the while loop
    activePlayerNum++;

    // check if we need to wrap around and restart at player 0
    if (activePlayerNum >= numPlayers) activePlayerNum = 0;

  }

  if (DEBUG) console.log('\nHand Over.');
  if (dealerWon) if (DEBUG) console.log('\ndealer won');
  if (dealerBust) {
    if (DEBUG) console.log('\ndealer bust, these players won...');
    for (player = 0; player < players.length; player++) {
      updateStats(players[player].identity, 'win');
      if (DEBUG) players[player].print();
    }
  }
  if (DEBUG) {
    console.log(color.cyan);
    console.log(statistics);
    console.log(color.off);
  }
}

console.log(color.cyan);
console.log(statistics);
console.log(color.off);
// check if the statistics make sense
for (playerIndex = 0; playerIndex < statistics.wins.length; playerIndex++)  {
  if (statistics.wins[playerIndex] + statistics.losses[playerIndex] + statistics.pushes[playerIndex] > numHands) {
    console.log('ERROR: Player ' + playerIndex + ' stats do not add up (wins + losses + pushes > number of hands)');
  }
}
var date = new Date();
console.log(date);
