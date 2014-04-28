//console.log("Card Test");

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

var decksInShoeCheck = 1;

//used to change the amount of total decks in the shoe
var decksInShoe = 2;


Deck();

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

//to be used to add additional shoes
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
	console.log(randCard);
	return;
}

//console.log(fullDeck);
//console.log(fullDeck.length);
console.log("Player's Hand: ")
console.log(player1Hand);
console.log("Dealer's Hand: ")
console.log(dealerHand);

cardCheck = new CardCheck(player1Hand);
