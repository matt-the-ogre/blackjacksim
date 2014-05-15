// Simulates games of blackjack. 

var DEBUG = false; // should be a const but that's not supported in all browsers

var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var suit = ['S', 'H', 'D', 'C'];
var fullDeck = [];
var shoeDeck = [];
// in general I don't recommend single character variables
var i, j, k, l, m, n;

var player1Hand = [];
var dealerHand = [];
var player2Hand = [];
var player3Hand = [];

var dealPlayer1 = true;
var dealDealer = false;
var dealPlayer2 = false;
//var dealPlayer3 = false;

var newDeckLength;

//do not change
var decksInShoeCheck = 1;

//used to change the amount of total decks in the shoe
var decksInShoe = 6;

//players/dealer card numerical value
// how are you dealing with Aces being either 1 or 11?
// could xCardTotal be an array or one or two Integers?
var player1CardTotal = 0;
var player2CardTotal = 0;
var dealerCardTotal = 0;

var player1Bust = false;
var player2Bust = false;
var dealerBust = false;
var firstDeal = true;
var playerAce = false;

var dealCounter = 0;

//used to change the amount of deals before the program stops
var amountOfDeals = 1;

var numberOfAces = 0;

var player1TotalWins = 0;
var player1TotalLosses = 0;
var player1TotalPushes = 0;
var player2TotalWins = 0;
var player2TotalLosses = 0;
var player2TotalPushes = 0;

//used to change amount of players to be dealt
var amountOfPlayers = 2;




createDeck();

//creates a deck of cards
function createDeck()
{
  if (DEBUG) {console.log('createDeck()');};

  // you're relying on globals instead of parameters, why?
  // e.g. you have suit and cards defined globally. do you need them outside this function?

// 	for(var i = 0; i < suit.length; i++)
// 	{
// 		for(var j = 0; j < cards.length; j++)
// 		{
// 			fullDeck.push(cards[j] + suit[i]);
// 		}
// 	}

  // why is this code block better than the one I commented out above?
  suit.forEach(function(suitLetter) 
  {
    cards.forEach(function(cardLetter) 
    {
      fullDeck.push(cardLetter + suitLetter);
    })
  });

  // I don't think you should call this from within Deck.
  // consider calling it right after 'createDeck();' above
	addDecksToShoe();

	newDeckLength = shoeDeck.length;
	//console.log(newDeckLength);
}

//adds multiple decks to the shoe
// consider renaming this to be more descriptive "addDeckToShoe"
// also function names should be camelCase (not required, but by convention)
function addDecksToShoe()
{
  if (DEBUG) {console.log('addDecksToShoe()');};
  // it wasn't immediately clear to me that you were just iterating through the loop
  // six times here. Perhaps these should be local variables instead of global?
// 	while(decksInShoeCheck <= decksInShoe)
// 	{
// 		for(var k = 0; k < fullDeck.length; k++)
// 		{
// 			shoeDeck.push(fullDeck[k]);
// 		}

// 		decksInShoeCheck++;

// 	}

  // try this instead
  // note: concat method of an array is easier to read and likely faster than your own for loop
  // copies the elements of the 'fullDeck' array into the shoeDeck array six times (to fill the shoe)
  for (deck = 0; deck < decksInShoe; deck++) {
    shoeDeck = shoeDeck.concat(fullDeck);
  }

	decksInShoeCheck = 0;

	//outputs for cards in entire shoe
	//console.log(shoeDeck);
}

//console.log(newDeckLength);
//console.log(shoeDeck.length);

// you're mixing runtime code with function and variable definitions here
// I recommend pulling all the runtime code down below the function definitions to make
// flow control easier to understand and debug.
// createDeck();
// addDecksToShoe();
// InitialDeal();

InitialDeal();

//deals the first hand for player(s) and dealer from the shoe
function InitialDeal()
{
  if (DEBUG) {console.log('InitialDeal()');};
	ShoeCheck();


	while(shoeDeck.length > (newDeckLength - ((amountOfPlayers + 1) * 2)))
	{
		ShoeCheck();
		//picks a card at random from the deck
    // I recommend generating the random number first, then using it as the index into shoeDeck twice instead of using 'shoeDeck.indexOf(randCard)' which is an expensive operation. (Why?)
		//randCard = shoeDeck[Math.floor(Math.random() * shoeDeck.length)];
		//removes the card from the deck
		//shoeDeck.splice(shoeDeck.indexOf(randCard),1);
    // here's the above re-written:

    // pick a random index into the deck
    	randCardNumber = Math.floor(Math.random() * shoeDeck.length);
    // store the value of that card
   		var randCard = shoeDeck[randCardNumber];
    // remove the one random card from the shoe
   		shoeDeck.splice(randCardNumber,1);

		//if(dealPlayer == true)
      // stylistically re-written as:
		if(dealPlayer1)
		{
			//adds the random card to the players hand
			player1Hand.push(randCard);
			//else it is the dealers turn
			dealPlayer1 = false;

			if(amountOfPlayers == 1)
			{
				dealDealer = true;
			}

			else if(amountOfPlayers == 2)
			{
				dealPlayer2 = true;
			}
		}

		else if(dealPlayer2)
		{
			player2Hand.push(randCard);
			dealDealer = true;
			dealPlayer2 = false;
		}


		else if (dealDealer)
		{
			//adds the random card to the dealers hand
			dealerHand.push(randCard);
			//else it is the players turn
			dealPlayer = true;
			dealPlayer1 = true
			dealDealer = false;
		}
    // actually since there is no 'else' clause, you don't even need to use 'else if' above
	}


	newDeckLength = shoeDeck.length;
	//prints card that was
	//console.log(randCard);

	PrintInitialDeal();
}

function PrintInitialDeal()
{
  if (DEBUG) {console.log('PrintInitialDeal()');};

	console.log("Player 1 Hand: ")
	console.log(player1Hand);

	if(amountOfPlayers == 2)
	{
		console.log("Player 2 Hand: ");
		console.log(player2Hand);
	}	

	console.log("Dealer's Hand: ")
	console.log(dealerHand);
	console.log("");

	Player1CardCheck(player1Hand);
}

//turns cards into a numerical value and adds them together
function Player1CardCheck(currentCards)
{
  if (DEBUG) {console.log('PlayerCardCheck()');};

	player1CardTotal = 0;

	for(var l = 0; l < currentCards.length; l++)
	{
		if(currentCards[l].charAt(0) == 'A')
		{
			if(player1CardTotal < 11)
				player1CardTotal += 11;

			else
				player1CardTotal += 1;
		}

		if(currentCards[l].charAt(0) == '2')
		{
			player1CardTotal = player1CardTotal + 2;
		}

		if(currentCards[l].charAt(0) == '3')
		{
			player1CardTotal = player1CardTotal + 3;
		}

		if(currentCards[l].charAt(0) == '4')
		{
			player1CardTotal = player1CardTotal + 4;
		}

		if(currentCards[l].charAt(0) == '5')
		{
			player1CardTotal = player1CardTotal + 5;
		}

		if(currentCards[l].charAt(0) == '6')
		{
			player1CardTotal = player1CardTotal + 6;
		}

		if(currentCards[l].charAt(0) == '7')
		{
			player1CardTotal = player1CardTotal + 7;
		}

		if(currentCards[l].charAt(0) == '8')
		{
			player1CardTotal = player1CardTotal + 8;
		}

		if(currentCards[l].charAt(0) == '9')
		{
			player1CardTotal = player1CardTotal + 9;
		}

		if(currentCards[l].charAt(0) == '1')
		{
			player1CardTotal = player1CardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'J')
		{
			player1CardTotal = player1CardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'Q')
		{
			player1CardTotal = player1CardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'K')
		{
			player1CardTotal = player1CardTotal + 10;
		}
	}

	console.log("Player 1 Card Total:")
	console.log(player1CardTotal);
	console.log("");
	NumberCheck();
}

function Player2CardCheck(currentCards)
{
	player2CardTotal = 0;

	for(var l = 0; l < currentCards.length; l++)
	{
		if(currentCards[l].charAt(0) == 'A')
		{
			if(player2CardTotal < 11)
			{
				player2CardTotal += 11;
			}

			else
			{
				player2CardTotal += 1;
			}
		}

		if(currentCards[l].charAt(0) == '2')
		{
			player2CardTotal = player2CardTotal + 2;
		}

		if(currentCards[l].charAt(0) == '3')
		{
			player2CardTotal = player2CardTotal + 3;
		}

		if(currentCards[l].charAt(0) == '4')
		{
			player2CardTotal = player2CardTotal + 4;
		}

		if(currentCards[l].charAt(0) == '5')
		{
			player2CardTotal = player2CardTotal + 5;
		}

		if(currentCards[l].charAt(0) == '6')
		{
			player2CardTotal = player2CardTotal + 6;
		}

		if(currentCards[l].charAt(0) == '7')
		{
			player2CardTotal = player2CardTotal + 7;
		}

		if(currentCards[l].charAt(0) == '8')
		{
			player2CardTotal = player2CardTotal + 8;
		}

		if(currentCards[l].charAt(0) == '9')
		{
			player2CardTotal = player2CardTotal + 9;
		}

		if(currentCards[l].charAt(0) == '1')
		{
			player2CardTotal = player2CardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'J')
		{
			player2CardTotal = player2CardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'Q')
		{
			player2CardTotal = player2CardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'K')
		{
			player2CardTotal = player2CardTotal + 10;
		}
	}

	console.log("Player 2 Card Total:")
	console.log(player2CardTotal);
	console.log("");
	Player2NumberCheck();
}

function NumberCheck()
{
  if (DEBUG) {console.log('NumberCheck()');};

	//PLAYER 1 STAY
	if(player1CardTotal >= 17 && player1CardTotal < 21)
	{
		if(amountOfPlayers == 2)
			Player2CardCheck(player2Hand);

		else if(amountOfPlayers == 1)
			DealerCardCheck(dealerHand);
	}

	//PLAYER 1 BLACKJACK
	else if(player1CardTotal == 21)
	{
		if(amountOfPlayers == 2)
			Player2CardCheck(player2Hand);

		else if(amountOfPlayers == 1)
			DealerCardCheck(dealerHand);
	}

	//PLAYER 1 HIT
	else if (player1CardTotal <= 16)
	{
		HitPlayer1Again();
	}

	//PLAYER 1 BUST
	else if(player1CardTotal >= 22)
	{
		player1Bust = true;

		if(amountOfPlayers == 2)
			Player2CardCheck(player2Hand);

		else if(amountOfPlayers == 1)
			DealerCardCheck(dealerHand);
	}
}

function Player2NumberCheck()
{
	if(player2CardTotal >= 17 && player2CardTotal < 21)
		DealerCardCheck(dealerHand);

	else if(player2CardTotal == 21)
		DealerCardCheck(dealerHand);

	else if(player2CardTotal <= 16)
		HitPlayer2Again();

	else if(player2CardTotal >= 22)
	{
		player2Bust = true;
		DealerCardCheck(dealerHand);
	}
		
}

function HitPlayer1Again()
{
  if (DEBUG) {console.log('HitAgain()');};
	ShoeCheck();

	randCard = shoeDeck[Math.floor(Math.random() * shoeDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	player1Hand.push(randCard);

	console.log("Player 1 Hand: ")
	console.log(player1Hand);

	Player1CardCheck(player1Hand);
}

function HitPlayer2Again()
{
	ShoeCheck();

	randCard = shoeDeck[Math.floor(Math.random() * shoeDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	player2Hand.push(randCard);

	console.log("Player 2 Hand: ")
	console.log(player2Hand);

	Player1CardCheck(player1Hand);
}

function LogicCheck()
{

}

function DealerCardCheck(dealerCards)
{
  if (DEBUG) {console.log('DealerCardCheck()');};
	dealerCardTotal = 0;

	for(var m = 0; m < dealerCards.length; m++)
	{
		if(dealerCards[m].charAt(0) == 'A')
		{
			if(dealerCardTotal < 11)
			{
				dealerCardTotal += 11;
			}

			else
			{
				dealerCardTotal += 1;
			}
		}

		if(dealerCards[m].charAt(0) == '2')
		{
			dealerCardTotal = dealerCardTotal + 2;
		}

		if(dealerCards[m].charAt(0) == '3')
		{
			dealerCardTotal = dealerCardTotal + 3;
		}

		if(dealerCards[m].charAt(0) == '4')
		{
			dealerCardTotal = dealerCardTotal + 4;
		}

		if(dealerCards[m].charAt(0) == '5')
		{
			dealerCardTotal = dealerCardTotal + 5;
		}

		if(dealerCards[m].charAt(0) == '6')
		{
			dealerCardTotal = dealerCardTotal + 6;
		}

		if(dealerCards[m].charAt(0) == '7')
		{
			dealerCardTotal = dealerCardTotal + 7;
		}

		if(dealerCards[m].charAt(0) == '8')
		{
			dealerCardTotal = dealerCardTotal + 8;
		}

		if(dealerCards[m].charAt(0) == '9')
		{
			dealerCardTotal = dealerCardTotal + 9;
		}

		if(dealerCards[m].charAt(0) == '1')
		{
			dealerCardTotal = dealerCardTotal + 10;
		}

		if(dealerCards[m].charAt(0) == 'J')
		{
			dealerCardTotal = dealerCardTotal + 10;
		}

		if(dealerCards[m].charAt(0) == 'Q')
		{
			dealerCardTotal = dealerCardTotal + 10;
		}

		if(dealerCards[m].charAt(0) == 'K')
		{
			dealerCardTotal = dealerCardTotal + 10;
		}
	}

	console.log("DealerCardTotal:")
	console.log(dealerCardTotal);
	DealerNumberCheck();
}

function DealerNumberCheck()
{
  if (DEBUG) {console.log('DealerNumberCheck()');};
	//STAY
	if(dealerCardTotal >= 17 && dealerCardTotal < 21)
	{
		WinOrLose();
	}

	//BLACKJACK
	else if(dealerCardTotal == 21)
	{
		WinOrLose();
	}

	//HIT
	else if (dealerCardTotal <= 16)
	{
		DealerHitAgain();
	}

	//BUST
	else if(dealerCardTotal >= 22)
	{
		dealerBust = true;
		WinOrLose();
	}
}

function DealerHitAgain()
{
  if (DEBUG) {console.log('DealerHitAgain()');};
	ShoeCheck();

	randCard = shoeDeck[Math.floor(Math.random() * shoeDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	dealerHand.push(randCard);

	console.log("Dealers's Hand: ")
	console.log(dealerHand);

	DealerCardCheck(dealerHand);
}

function WinOrLose()
{
  if (DEBUG) {console.log('WinOrLose()');};
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
	console.log("Cards in shoe: ");
	console.log(shoeDeck.length);
	console.log("");
	console.log("Hands Dealt:");
	console.log(dealCounter);
	console.log("");

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
		InitialDeal();
	}

	else if(dealCounter == amountOfDeals)
	{
		FinalOutput();
	}
}

// comments needed
function ShoeCheck()
{
  if (DEBUG) {console.log('ShoeCheck()');};
	if(shoeDeck.length == 0)
	{
		fullDeck = [];
		shoeDeck = [];
		createDeck();
	}

	else
		return;
}

function FinalOutput()
{
	console.log("Player 1 - Wins: " + player1TotalWins + "  Losses: " + player1TotalLosses + "  Pushes: " + player1TotalPushes);

	if(amountOfPlayers == 2)
	{
		console.log("Player 2 - Wins: " + player2TotalWins + "  Losses: " + player2TotalLosses + "  Pushes: " + player2TotalPushes);
	}

	// this stops the node process and returns to the Terminal
	process.exit(code=0);
}
