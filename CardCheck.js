// Simulates games of blackjack. 

var DEBUG = true; // should be a const but that's not supported in all browsers

var fullDeck = [];
var shoeDeck = [];

var player1Hand = [];
var dealerHand = [];
var player2Hand = [];
var player3Hand = [];

var newDeckLength;

//players/dealer card numerical value
// how are you dealing with Aces being either 1 or 11?
// could xCardTotal be an array or one or two Integers?
var player1CardTotal = 0;
var player2CardTotal = 0;
var dealerCardTotal = 0;

var player1Bust = false;
var player2Bust = false;
var dealerBust = false;

var dealCounter = 0;

//used to change the amount of deals before the program stops
var amountOfDeals = 500;

var player1TotalWins = 0;
var player1TotalLosses = 0;
var player1TotalPushes = 0;
var player2TotalWins = 0;
var player2TotalLosses = 0;
var player2TotalPushes = 0;

//used to change amount of players to be dealt
var amountOfPlayers = 2;


createDeck();
initialDeal();

//creates a deck of cards
function createDeck()
{
  if (DEBUG) {console.log('createDeck()');};

	var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	var suit = ['S', 'H', 'D', 'C'];

	suit.forEach(function(suitLetter) 
				{
		cards.forEach(function(cardNumber) 
					{
    	fullDeck.push(cardNumber + suitLetter);
					})

				});

	addDecksToShoe();


}

//adds multiple decks to the shoe
function addDecksToShoe()
{
	//used to change the amount of total decks in the shoe
	var decksInShoe = 6;

	if (DEBUG) {console.log('addDecksToShoe()');};

	for (deck = 0; deck < decksInShoe; deck++) 
	{
		shoeDeck = shoeDeck.concat(fullDeck);
 	}

 	newDeckLength = shoeDeck.length;
}

// you're mixing runtime code with function and variable definitions here
// I recommend pulling all the runtime code down below the function definitions to make
// flow control easier to understand and debug.
// createDeck();
// addDecksToShoe();
// initialDeal();

//initialDeal();


//deals the first hand for player(s) and dealer from the shoe
function initialDeal()
{
  if (DEBUG) {console.log('initialDeal()');};
	shoeCheck();

	//deals cards until each player (+ the dealer) has two cards each
	while(shoeDeck.length > (newDeckLength - ((amountOfPlayers + 1) * 2)))
	{
		//checks to make sure there are cards in the shoe
		shoeCheck();
	    // pick a random index into the deck
    	randCardNumber = Math.floor(Math.random() * shoeDeck.length);
    	// store the value of that card
   		var randCard = shoeDeck[randCardNumber];
    	// remove the one random card from the shoe
   		shoeDeck.splice(randCardNumber,1);

   		//variables for who's turn it is to get a card
   		var dealPlayer1;
   		var dealPlayer2;
   		var dealDealer;
   		//player 1's turn for a card
		if(dealPlayer1)
		{
			//adds the random card to the players hand
			player1Hand.push(randCard);
			dealPlayer1 = false;

			//if there is only one player the next card goes to the dealer
			if(amountOfPlayers == 1)
			{
				dealDealer = true;
			}

			//if there is 2 players then player 2 gets a card next
			else if(amountOfPlayers == 2)
			{
				dealPlayer2 = true;
			}
		}

		//player 2's turn for a card
		else if(dealPlayer2)
		{
			player2Hand.push(randCard);
			dealDealer = true;
			dealPlayer2 = false;
		}

		//player 3's turn for a card
		else if (dealDealer)
		{
			//adds the random card to the dealers hand
			dealerHand.push(randCard);
			//else it is the players turn
			dealPlayer1 = true
			dealDealer = false;
		}
    // actually since there is no 'else' clause, you don't even need to use 'else if' above
	}

	newDeckLength = shoeDeck.length;

	//PrintinitialDeal();
	numberCheck();
}

//turns cards into a numerical value and adds them together based on the first character in the string within each array position
function cardAmountCheck(currentCards)
{
  if (DEBUG) {console.log('PlayerCardCheck()');};

  var cardAmount = 0;

	for(var l = 0; l < currentCards.length; l++)
	{
		if(currentCards[l].charAt(0) == 'A')
		{
			//if the player has a hand that equals less than 11 the ACE is used as an 11
			//if the player has over 11 they would bust with an 11 so it turns the ACE into a 1 value
			if(cardAmount < 11)
				cardAmount += 11;

			else
				cardAmount += 1;
		}

		if(currentCards[l].charAt(0) == '2')
		{
			cardAmount = cardAmount + 2;
		}

		if(currentCards[l].charAt(0) == '3')
		{
			cardAmount = cardAmount + 3;
		}

		if(currentCards[l].charAt(0) == '4')
		{
			cardAmount = cardAmount + 4;
		}

		if(currentCards[l].charAt(0) == '5')
		{
			cardAmount = cardAmount + 5;
		}

		if(currentCards[l].charAt(0) == '6')
		{
			cardAmount = cardAmount + 6;
		}

		if(currentCards[l].charAt(0) == '7')
		{
			cardAmount = cardAmount + 7;
		}

		if(currentCards[l].charAt(0) == '8')
		{
			cardAmount = cardAmount + 8;
		}

		if(currentCards[l].charAt(0) == '9')
		{
			cardAmount = cardAmount + 9;
		}

		if(currentCards[l].charAt(0) == '1')
		{
			cardAmount = cardAmount + 10;
		}

		if(currentCards[l].charAt(0) == 'J')
		{
			cardAmount = cardAmount + 10;
		}

		if(currentCards[l].charAt(0) == 'Q')
		{
			cardAmount = cardAmount + 10;
		}

		if(currentCards[l].charAt(0) == 'K')
		{
			cardAmount = cardAmount + 10;
		}
	}

	return(cardAmount);
}

function numberCheck()
{
  if (DEBUG) {console.log('numberCheck()');};

	//PLAYER 1 STAY
	if(player1CardTotal >= 17 && player1CardTotal < 21)
	{
		if(amountOfPlayers == 2)
		{
			player2CardTotal = cardAmountCheck(player2Hand);
			player2NumberCheck();
		}

		else if(amountOfPlayers == 1)
		{
			dealerCardTotal = cardAmountCheck(dealerHand);
			dealerNumberCheck();
		}
	}

	//PLAYER 1 BLACKJACK
	else if(player1CardTotal == 21)
	{
		if(amountOfPlayers == 2)
		{
			player2CardTotal = cardAmountCheck(player2Hand);
			player2NumberCheck();
		}

		else if(amountOfPlayers == 1)
		{
			dealerCardTotal = cardAmountCheck(dealerHand);
			Dealer();
		}
	}

	//PLAYER 1 HIT
	else if (player1CardTotal <= 16)
	{
		hitPlayer1Again();
	}

	//PLAYER 1 BUST
	else if(player1CardTotal >= 22)
	{
		player1Bust = true;

		if(amountOfPlayers == 2)
		{
			player2CardTotal = cardAmountCheck(player2Hand);
			player2NumberCheck();
		}

		else if(amountOfPlayers == 1)
		{
			dealerCardTotal = cardAmountCheck(dealerHand);
			dealerNumberCheck();
		}
	}
}

function player2NumberCheck()
{
	if(player2CardTotal >= 17 && player2CardTotal < 21)
	{
		dealerCardTotal = cardAmountCheck(dealerHand);
		dealerNumberCheck();
	}

	else if(player2CardTotal == 21)
	{
		dealerCardTotal = cardAmountCheck(dealerHand);
		dealerNumberCheck();
	}

	else if(player2CardTotal <= 16)
		hitPlayer2Again();

	else if(player2CardTotal >= 22)
	{
		player2Bust = true;
		dealerCardTotal = cardAmountCheck(dealerHand);
		dealerNumberCheck();
	}
		
}

function hitPlayer1Again()
{
  if (DEBUG) {console.log('HitAgain()');};
	shoeCheck();

	randCard = shoeDeck[Math.floor(Math.random() * shoeDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	player1Hand.push(randCard);

	console.log("Player 1 Hand: ")
	console.log(player1Hand);

	player1CardTotal = cardAmountCheck(player1Hand);
	numberCheck();
}

function hitPlayer2Again()
{
	shoeCheck();

	randCard = shoeDeck[Math.floor(Math.random() * shoeDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	player2Hand.push(randCard);

	console.log("Player 2 Hand: ")
	console.log(player2Hand);

	player2CardTotal = cardAmountCheck(player2Hand);
	player2NumberCheck();
}

function dealerNumberCheck()
{
  if (DEBUG) {console.log('dealerNumberCheck()');};
	//STAY
	if(dealerCardTotal >= 17 && dealerCardTotal < 21)
	{
		winOrLose();
	}

	//BLACKJACK
	else if(dealerCardTotal == 21)
	{
		winOrLose();
	}

	//HIT
	else if (dealerCardTotal <= 16)
	{
		dealerHitAgain();
	}

	//BUST
	else if(dealerCardTotal >= 22)
	{
		dealerBust = true;
		winOrLose();
	}
}

function dealerHitAgain()
{
  if (DEBUG) {console.log('dealerHitAgain()');};
	shoeCheck();

	randCard = shoeDeck[Math.floor(Math.random() * shoeDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	dealerHand.push(randCard);

	console.log("Dealers's Hand: ")
	console.log(dealerHand);

	dealerCardTotal = cardAmountCheck(dealerHand);
	dealerNumberCheck();
}

function winOrLose()
{
  if (DEBUG) {console.log('winOrLose()');};
	newDeckLength = shoeDeck.length;

	if(player1Bust == true)
	{
		//console.log("PLAYER 1 BUST");
		if(dealerBust == false)
			player1TotalLosses ++;
	}

	else if(player1Bust == false)
	{
		if(dealerBust == true)
		{
			//console.log("YOU WIN");
			player1TotalWins ++;
		}

		else if (dealerCardTotal > player1CardTotal)
		{
			//console.log("YOU LOSE");
			player1TotalLosses ++;
		}

		else if (dealerCardTotal < player1CardTotal)
		{
			//console.log("YOU WIN");
			player1TotalWins ++;
		}

		else if (dealerCardTotal == player1CardTotal)
		{
			//console.log("PUSH");
			player1TotalPushes ++;
		}
	}

	if(amountOfPlayers == 2)
	{
		if(player2Bust == true)
		{
			//console.log("PLAYER 2 BUST");
			if(dealerBust == false)
				player2TotalLosses ++;

		}

		else if(player2Bust == false)
		{
			if(dealerBust == true)
				player2TotalWins ++;

			else if (dealerCardTotal > player2CardTotal)
				player2TotalLosses ++;

			else if (dealerCardTotal < player2CardTotal)
				player2TotalWins ++;

			else if (dealerCardTotal == player2CardTotal)
				player2TotalPushes ++;
		}
	}

	dealCounter ++;

 	console.log("");
	console.log("Player 1 has: " + player1CardTotal)
	console.log("Player 2 has: " + player2CardTotal)
	console.log("Dealer has: " + dealerCardTotal)


	console.log("");
	console.log("Cards in shoe: ");
	console.log(shoeDeck.length);
	console.log("");
	console.log("Hands Dealt:");
	console.log(dealCounter);
	console.log("");
	console.log("Deals left: ");
	console.log(amountOfDeals - dealCounter);


	player1Hand = [];
	player2Hand = [];
	dealerHand = [];
	player1CardTotal = 0;
	player2CardTotal = 0;
	dealerCardTotal = 0;
	decksInShoeCheck = 1;	
	player1Bust = false;
	player2Bust = false;
	dealerBust = false;

	if(dealCounter < amountOfDeals)
	{
		initialDeal();
	}


	else if(dealCounter == amountOfDeals)
	{
		finalOutput();
	}
}

// comments needed
function shoeCheck()
{
  if (DEBUG) {console.log('shoeCheck()');};
  		//console.log(shoeDeck.length);
  		//console.log(shoeDeck);

	if(shoeDeck.length == 0)
	{
		//shoeDeck = [];
		addDecksToShoe();
	}

	else
		return;
}

//output for total wins/losses/pushes for two players
function finalOutput()
{
	console.log("Player 1 - Wins: " + player1TotalWins + "  Losses: " + player1TotalLosses + "  Pushes: " + player1TotalPushes);

	if(amountOfPlayers == 2)
	{
		console.log("Player 2 - Wins: " + player2TotalWins + "  Losses: " + player2TotalLosses + "  Pushes: " + player2TotalPushes);
	}

	// this stops the node process and returns to the Terminal
	process.exit(code=0);
}

