class Card {
  constructor(label, suit) {
    this.label = label;
    this.suit = suit;
  }
}


class Hand {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  addCard() {
    var newCard = gameDeck.dealtCards[gameDeck.dealtCards.length - 1];
    this.cards.push(newCard);
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

class Deck {
  constructor(name){
    this.name = name;
    this.deckArray = [];
    this.dealtCards = [];
  }
  numCardsLeft() {
    return this.deckArray.length;
  }
  addDeck() {
    var label = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
    var suit = ['clubs','spades','diamonds','hearts'];
    var self = this;
    label.forEach(function(label) {
      suit.forEach(function(suit) {
        self.deckArray.push({'label': label, 'suit': suit, 'img':label + '_of_' + suit + '.png'})
      });
    });
  }
  shuffle()  {
    var j, x, i;
    var self = this
    for (i = self.deckArray.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = self.deckArray[i - 1];
        self.deckArray[i - 1] = self.deckArray[j];
        self.deckArray[j] = x;
      }
    }

    draw() {
      var drawnCard = this.deckArray.pop();
      this.dealtCards.push(drawnCard);
    }
  }

  var gameDeck = new Deck();
  gameDeck.addDeck();
  gameDeck.shuffle();
  var playerHand = new Hand();
  var dealerHand = new Hand();

  gameDeck.draw();
  playerHand.addCard();
  console.log(playerHand.cards);
  gameDeck.draw();
  playerHand.addCard();
  console.log(playerHand.cards);



  $('#deal-button').click(function() {
    dealACard('dealer');
    dealACard('player');
    dealACard('dealer');
    dealACard('player');
    $(this).hide();
    $('#player-points').text(playerCardsValue);
    $('#dealer-points').text(dealerCardsValue);
    bust();
  });



//testing
// var myDeck = new Deck();
// myDeck.makeDeck();
// console.log(myDeck);
// myDeck.shuffle();
//
// var myHand = new Hand();
// myHand.addCard(new Card(5, 'diamonds'));
// myHand.addCard(new Card(10, 'hearts'));
//
// myHand.getPoints();
