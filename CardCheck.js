var CardCheck = require('./CardCheck.js');

var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var suit = ['S', 'H', 'D', 'C'];
var fullDeck = [];
var shoeDeck = [];
var i, j, k;

var player1Hand = [];
var dealerHand = [];

var dealPlayer = true;

var newDeckLength;

//do not change
var decksInShoeCheck = 1;

//used to change the amount of total decks in the shoe
var decksInShoe = 2;

//players card numerical value
playerCardTotal = 0;


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
	//console.log(shoeDeck)

	return;
}

while(shoeDeck.length >= (newDeckLength - 3))
{
	InitialDeal();
}


//deals the first hand for player and dealer from the shoe
function InitialDeal()
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

	//prints card that was
	//console.log(randCard);
	return;
}

//console.log(fullDeck);
//console.log(fullDeck.length);
console.log("Player's Hand: ")
console.log(player1Hand);
console.log("Dealer's Hand: ")
console.log(dealerHand);

//cardCheck = new CardCheck(player1Hand);
//cardCheck = new CardCheck(dealerHand);

//console.log(cardCheck = new CardCheck(player1Hand));

PlayerCardCheck(player1Hand);

//turns cards into a numerical value and adds them together
function PlayerCardCheck(currentCards)
{
	if(currentCards[0].charAt(0) == 'A' || currentCards[1].charAt(0) == 'A')
	{
		//console.log("PLAYER HAS AN ACE");
		playerCardTotal = playerCardTotal + 1;

	}

	if(currentCards[0].charAt(0) == '2' || currentCards[1].charAt(0) == '2')
	{
		//console.log("PLAYER HAS A 2");
		playerCardTotal = playerCardTotal + 2;

	}

	if(currentCards[0].charAt(0) == '3' || currentCards[1].charAt(0) == '3')
	{
		//console.log("PLAYER HAS A 3");
		playerCardTotal = playerCardTotal + 3;

	}

	if(currentCards[0].charAt(0) == '4' || currentCards[1].charAt(0) == '4')
	{
		//console.log("PLAYER HAS A 4");
		playerCardTotal = playerCardTotal + 4;

	}

	if(currentCards[0].charAt(0) == '5' || currentCards[1].charAt(0) == '5')
	{
		//console.log("PLAYER HAS A 5");
		playerCardTotal = playerCardTotal + 5;

	}

	if(currentCards[0].charAt(0) == '6' || currentCards[1].charAt(0) == '6')
	{
		//console.log("PLAYER HAS A 6");
		playerCardTotal = playerCardTotal + 6;

	}

	if(currentCards[0].charAt(0) == '7' || currentCards[1].charAt(0) == '7')
	{
		//console.log("PLAYER HAS A 7");
		playerCardTotal = playerCardTotal + 7;

	}

	if(currentCards[0].charAt(0) == '8' || currentCards[1].charAt(0) == '8')
	{
		//console.log("PLAYER HAS A 8");
		playerCardTotal = playerCardTotal + 8;

	}

	if(currentCards[0].charAt(0) == '9' || currentCards[1].charAt(0) == '9')
	{
		//console.log("PLAYER HAS A 9");
		playerCardTotal = playerCardTotal + 9;

	}

	if(currentCards[0].charAt(0) == '1'  || currentCards[1].charAt(0) == '1')
	{
		//console.log("PLAYER HAS A 10");
		playerCardTotal = playerCardTotal + 10;

	}

	if(currentCards[0].charAt(0) == 'J' || currentCards[1].charAt(0) == 'J')
	{
		//console.log("PLAYER HAS A JACK");
		playerCardTotal = playerCardTotal + 10;

	}

	if(currentCards[0].charAt(0) == 'Q' || currentCards[1].charAt(0) == 'Q')
	{
		//console.log("PLAYER HAS A QUEEN");
		playerCardTotal = playerCardTotal + 10;

	}

	if(currentCards[0].charAt(0) == 'K' || currentCards[1].charAt(0) == 'K')
	{
		//console.log("PLAYER HAS A KING");
		playerCardTotal = playerCardTotal + 10;

	}

	console.log(playerCardTotal);
	NumberCheck();
}

function NumberCheck()
{
	if(playerCardTotal >= 17)
	{
		console.log("stay");
	}
	else if (playerCardTotal <= 16)
	{
		console.log("hit");
		HitAgain();
	}
}

function HitAgain()
{
	randCard = shoeDeck[Math.floor(Math.random() * fullDeck.length)];
	shoeDeck.splice(shoeDeck.indexOf(randCard),1);
	player1Hand.push(randCard);

	console.log("Player's Hand: ")
	console.log(player1Hand);

}