// Comment needed here on the purpose of this file

// isn't this redundant? you're requiring the same file that you're editing?
var CardCheck = require('./CardCheck.js');

var DEBUG = false; // should be a const but that's not supported in all browsers

var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var suit = ['S', 'H', 'D', 'C'];
var fullDeck = [];
var shoeDeck = [];
// in general I don't recommend single character variables
var i, j, k, l, m, n;

var player1Hand = [];
var dealerHand = [];

var dealPlayer = true;

var newDeckLength;

//do not change
var decksInShoeCheck = 1;

//used to change the amount of total decks in the shoe
var decksInShoe = 6;

//players/dealer card numerical value
// how are you dealing with Aces being either 1 or 11?
// could xCardTotal be an array or one or two Integers?
var playerCardTotal = 0;
var dealerCardTotal = 0;

//var aceAmount = 1;

var playerBust = false;
var dealerBust = false;
var firstDeal = true;
var playerAce = false;

var dealCounter = 0;

//used to change the amount of deals before the program stops
var amountOfDeals = 2000;

var numberOfAces = 0;

var totalWins = 0;
var totalLosses = 0;
var totalPushes = 0;


Deck();

//creates a deck of cards
function Deck()
{
  if (DEBUG) {console.log('deck()');};

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
  suit.forEach(function(suitLetter) {
    cards.forEach(function(cardLetter) {
      fullDeck.push(cardLetter + suitLetter);
    })
  });

  // I don't think you should call this from within Deck.
  // consider calling it right after 'Deck();' above
	Shoe();

	newDeckLength = shoeDeck.length;
	//console.log(newDeckLength);
}

//adds multiple decks to the shoe
// consider renaming this to be more descriptive "addDeckToShoe"
// also function names should be camelCase (not required, but by convention)
function Shoe()
{
  if (DEBUG) {console.log('shoe()');};
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
// Deck();
// Shoe();
// InitialDeal();

InitialDeal();

//deals the first hand for player and dealer from the shoe
function InitialDeal()
{
  if (DEBUG) {console.log('InitialDeal()');};
	ShoeCheck();

	while(shoeDeck.length > (newDeckLength - 4)) // '4' is a magic number. where did it come from? What does it represent? change to a variable or CONSTANT
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
      if(dealPlayer)
		{
			//adds the random card to the players hand
			player1Hand.push(randCard);
			//else it is the dealers turn
			dealPlayer = false;
		}

		//else if (dealPlayer == false)
      // stylistically re-written as:
      else if (!dealPlayer)
		{
			//adds the random card to the dealers hand
			dealerHand.push(randCard);
			//else it is the players turn
			dealPlayer = true;
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
	console.log("Player's Hand: ")
	console.log(player1Hand);
	console.log("Dealer's Hand: ")
	console.log(dealerHand);

	PlayerCardCheck(player1Hand);
}

//turns cards into a numerical value and adds them together
function PlayerCardCheck(currentCards)
{
  if (DEBUG) {console.log('PlayerCardCheck()');};
	playerCardTotal = 0;

	for(var l = 0; l < currentCards.length; l++)
	{
		if(currentCards[l].charAt(0) == 'A')
		{
			if(playerCardTotal < 11)
			{
				playerCardTotal += 11;
			}

			else
			{
				playerCardTotal += 1;
			}
		}

		if(currentCards[l].charAt(0) == '2')
		{
			playerCardTotal = playerCardTotal + 2;
		}

		if(currentCards[l].charAt(0) == '3')
		{
			playerCardTotal = playerCardTotal + 3;
		}

		if(currentCards[l].charAt(0) == '4')
		{
			playerCardTotal = playerCardTotal + 4;
		}

		if(currentCards[l].charAt(0) == '5')
		{
			playerCardTotal = playerCardTotal + 5;
		}

		if(currentCards[l].charAt(0) == '6')
		{
			playerCardTotal = playerCardTotal + 6;
		}

		if(currentCards[l].charAt(0) == '7')
		{
			playerCardTotal = playerCardTotal + 7;
		}

		if(currentCards[l].charAt(0) == '8')
		{
			playerCardTotal = playerCardTotal + 8;
		}

		if(currentCards[l].charAt(0) == '9')
		{
			playerCardTotal = playerCardTotal + 9;
		}

		if(currentCards[l].charAt(0) == '1')
		{
			playerCardTotal = playerCardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'J')
		{
			playerCardTotal = playerCardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'Q')
		{
			playerCardTotal = playerCardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'K')
		{
			playerCardTotal = playerCardTotal + 10;
		}
	}

	console.log("Player Card Total:")
	console.log(playerCardTotal);
	console.log("");
	NumberCheck();
}

function NumberCheck()
{
  if (DEBUG) {console.log('NumberCheck()');};
	//STAY
	if(playerCardTotal >= 17 && playerCardTotal < 21)
	{
		//LogicCheck();
		DealerCardCheck(dealerHand);
	}

	//BLACKJACK
	else if(playerCardTotal == 21)
	{
		DealerCardCheck(dealerHand);
	}

	//HIT
	else if (playerCardTotal <= 16)
	{
		HitAgain();
	}

	//BUST
	else if(playerCardTotal >= 22)
	{
		playerBust = true;
		WinOrLose();
	}
}

function HitAgain()
{
  if (DEBUG) {console.log('HitAgain()');};
	ShoeCheck();

	randCard = shoeDeck[Math.floor(Math.random() * shoeDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	player1Hand.push(randCard);

	console.log("Player's Hand: ")
	console.log(player1Hand);

	PlayerCardCheck(player1Hand);
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

	if(playerBust == true)
	{
		console.log("PLAYER BUST");
		totalLosses ++;
		playerBust = false;
	}

	else if(playerBust == false)
	{
		if(dealerBust == true)
		{
			console.log("YOU WIN");
			totalWins ++;
		}

		else if (dealerCardTotal > playerCardTotal)
		{
			console.log("YOU LOSE");
			totalLosses ++;
		}

		else if (dealerCardTotal < playerCardTotal)
		{
			console.log("YOU WIN");
			totalWins ++;
		}

		else if (dealerCardTotal == playerCardTotal)
		{
			console.log("PUSH");
			totalPushes ++;
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
	dealerHand = [];
	playerCardTotal = 0;
	dealerCardTotal = 0;
	decksInShoeCheck = 1;
	playerBust = false;

	if(dealCounter < amountOfDeals)
	{
		InitialDeal();
	}

	else
	{
		console.log("Wins: " + totalWins + "  Losses: " + totalLosses + "  Pushes: " + totalPushes);
		return;
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
		Deck();
	}

	else
		return;
}

// this stops the node process and returns to the Terminal
process.exit(code=0);
