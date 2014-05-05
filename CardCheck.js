var CardCheck = require('./CardCheck.js');

var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var suit = ['S', 'H', 'D', 'C'];
var fullDeck = [];
var shoeDeck = [];
var i, j, k, l, m;

var player1Hand = [];
var dealerHand = [];

var dealPlayer = true;

var newDeckLength;

//do not change
var decksInShoeCheck = 1;

//used to change the amount of total decks in the shoe
var decksInShoe = 6;

//players/dealer card numerical value
var playerCardTotal = 0;
var dealerCardTotal = 0;

//var aceAmount = 1;

var playerBust = false;
var dealerBust = false;
var firstDeal = true;


Deck();

//creates a deck of cards
function Deck()
{

	for(var i = 0; i < suit.length; i++)
	{		
		for(var j = 0; j < cards.length; j++)
		{
			fullDeck.push(cards[j] + suit[i]);
		}	
	}

	Shoe();

	newDeckLength = shoeDeck.length;
	//console.log(newDeckLength);
}

//adds multiple decks to the shoe
function Shoe()
{
	while(decksInShoeCheck <= decksInShoe)
	{
		for(var k = 0; k < fullDeck.length; k++)
		{
			shoeDeck.push(fullDeck[k]);
		}

		decksInShoeCheck++;

	}
	//outputs for cards in entire shoe
	//console.log(shoeDeck);
}

console.log(newDeckLength);
console.log(shoeDeck.length);

InitialDeal();

//deals the first hand for player and dealer from the shoe
function InitialDeal()
{

	while(shoeDeck.length > (newDeckLength - 4))
	{
		//picks a card at random from the deck
		randCard = shoeDeck[Math.floor(Math.random() * fullDeck.length)];
		//removes the card from the deck
		shoeDeck.splice(shoeDeck.indexOf(randCard),1);

		if(dealPlayer == true)
		{
			//adds the random card to the players hand
			player1Hand.push(randCard);
			//else it is the dealers turn
			dealPlayer = false;
		}

		else if (dealPlayer == false)
		{
			//adds the random card to the dealers hand
			dealerHand.push(randCard);
			//else it is the players turn
			dealPlayer = true
		}
	}
	//prints card that was
	//console.log(randCard);

	PrintInitialDeal();
}

function PrintInitialDeal()
{
	console.log("Player's Hand: ")
	console.log(player1Hand);
	console.log("Dealer's Hand: ")
	console.log(dealerHand);

	PlayerCardCheck(player1Hand);
}

//turns cards into a numerical value and adds them together
function PlayerCardCheck(currentCards)
{
	playerCardTotal = 0;

	for(var l = 0; l < currentCards.length; l++)
	{
		if(currentCards[l].charAt(0) == 'A')
		{
			//console.log("PLAYER HAS AN ACE");

			//if(currentCards.length >= 3)
			//{
				playerCardTotal = playerCardTotal + 11;
			//}

			//else if(currentCards.length == 2)
			//{
			//	playerCardTotal = playerCardTotal + 1;
			//}
		}

		if(currentCards[l].charAt(0) == '2')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 2;
		}

		if(currentCards[l].charAt(0) == '3')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 3;
		}

		if(currentCards[l].charAt(0) == '4')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 4;
		}

		if(currentCards[l].charAt(0) == '5')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 5;
		}

		if(currentCards[l].charAt(0) == '6')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 6;
		}

		if(currentCards[l].charAt(0) == '7')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 7;
		}

		if(currentCards[l].charAt(0) == '8')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 8;
		}

		if(currentCards[l].charAt(0) == '9')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 9;
		}

		if(currentCards[l].charAt(0) == '1')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'J')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'Q')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 10;
		}

		if(currentCards[l].charAt(0) == 'K')
		{
			//console.log("PLAYER HAS AN ACE");
			playerCardTotal = playerCardTotal + 10;
		}
	}

	console.log(playerCardTotal);
	NumberCheck();
}

function NumberCheck()
{
	if(playerCardTotal >= 17 && playerCardTotal < 21)
	{
		console.log("PLAYER STAY");
		DealerCardCheck(dealerHand);
	}

	else if(playerCardTotal == 21)
	{
		WinOrLose();
	}

	else if (playerCardTotal <= 16)
	{
		console.log("PLAYER HIT");
		HitAgain();
	}

	else if(playerCardTotal >= 22)
	{
		console.log("PLAYER BUST");
		playerBust = true;
		WinOrLose();
	}
}

function HitAgain()
{
	randCard = shoeDeck[Math.floor(Math.random() * fullDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	player1Hand.push(randCard);

	console.log("Player's Hand: ")
	console.log(player1Hand);

	PlayerCardCheck(player1Hand);
}

function DealerCardCheck(dealerCards)
{
	dealerCardTotal = 0;

	for(var m = 0; m < dealerCards.length; m++)
	{
		if(dealerCards[m].charAt(0) == 'A')
		{
			//console.log("PLAYER HAS AN ACE");

			//if(currentCards.length >= 3)
			//{
				dealerCardTotal = dealerCardTotal + 11;
			//}

			//else if(currentCards.length == 2)
			//{
			//	playerCardTotal = playerCardTotal + 1;
			//}
		}

		if(dealerCards[m].charAt(0) == '2')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 2;
		}

		if(dealerCards[m].charAt(0) == '3')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 3;
		}

		if(dealerCards[m].charAt(0) == '4')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 4;
		}

		if(dealerCards[m].charAt(0) == '5')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 5;
		}

		if(dealerCards[m].charAt(0) == '6')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 6;
		}

		if(dealerCards[m].charAt(0) == '7')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 7;
		}

		if(dealerCards[m].charAt(0) == '8')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 8;
		}

		if(dealerCards[m].charAt(0) == '9')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 9;
		}

		if(dealerCards[m].charAt(0) == '1')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 10;
		}

		if(dealerCards[m].charAt(0) == 'J')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 10;
		}

		if(dealerCards[m].charAt(0) == 'Q')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 10;
		}

		if(dealerCards[m].charAt(0) == 'K')
		{
			//console.log("PLAYER HAS AN ACE");
			dealerCardTotal = dealerCardTotal + 10;
		}
	}

	console.log("DealerCardTotal:")
	console.log(dealerCardTotal);
	DealerNumberCheck();
}

function DealerNumberCheck()
{
	if(dealerCardTotal >= 17 && dealerCardTotal < 21)
	{
		//console.log("DEALER STAY");
		WinOrLose();
	}

	else if(dealerCardTotal == 21)
	{
		//console.log("DEALER BLACKJACK");
		WinOrLose();
	}

	else if (dealerCardTotal <= 16)
	{
		//console.log("DEALER HIT");
		DealerHitAgain();
	}

	else if(dealerCardTotal >= 22)
	{
		//console.log("DEALER BUST");
		dealerBust = true;
		WinOrLose();
	}
}

function DealerHitAgain()
{
	randCard = shoeDeck[Math.floor(Math.random() * fullDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	dealerHand.push(randCard);

	console.log("Dealers's Hand: ")
	console.log(dealerHand);

	DealerCardCheck(dealerHand);
}

function WinOrLose()
{
	newDeckLength = shoeDeck.length;

	if(playerBust == true)
	{
		console.log("YOU LOSE");
	}

	else if(playerBust == false)
	{
		if(dealerBust == true)
		{
			console.log("YOU WIN");
		}

		else if (dealerCardTotal > playerCardTotal)
		{
			console.log("YOU LOSE");
		}

		else if (dealerCardTotal < playerCardTotal)
		{
			console.log("YOU WIN");
		}

		else if (dealerCardTotal == playerCardTotal)
		{
			console.log("PUSH");
		}

		else if(playerCardTotal == 21)
		{
			console.log("YOU WIN");
		}
	}

	console.log(newDeckLength);
	console.log(shoeDeck.length);
	console.log("");
	player1Hand = [];
	dealerHand = [];
	playerCardTotal = 0;
	dealerCardTotal = 0;	

	console.log(shoeDeck);

	InitialDeal();
}

