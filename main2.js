class Hand {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  getPoints() {
    var cardArray = this.cards;
    var pointsTotal = 0;
    for(var i = 0; i < cardArray.length; i++) {
      pointsTotal += cardArray[i].points;
    }
    return pointsTotal;
  }
}

class Card {
  constructor (points, suit) {
  this.points = points;
  this.suit = suit;
  }
}

class Deck {
  constructor(){
    this.deckArray = [];
  }
  addDeck(newDeck) {
    this.deckArray.push(newDeck);
  }
  numCardsLeft() {
    return this.deckArray.length;
  }
  makeDeck() {
    var label = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
    var suit = ['clubs','spades','diamonds','hearts'];
    var self = this;
    label.forEach(function(label) {
      suit.forEach(function(suit) {
        self.deckArray.push({'label': label, 'suit': suit, 'img':label + '_of_' + suit + '.png'})
      });
    });
  }
}

var myDeck = new Deck();
myDeck.makeDeck();
console.log(myDeck);

var myHand = new Hand();
myHand.addCard(new Card(5, 'diamonds'));
myHand.addCard(new Card(10, 'hearts'));

myHand.getPoints();
