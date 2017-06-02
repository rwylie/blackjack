function newGame() {
  dealerHand.cards = [];
  playerHand.cards = [];
  gameDeck.deckArray = [];
  gameDeck.dealtCards = [];

  gameDeck.addDeck();
  gameDeck.shuffle();
  $('#messages').text("")
  $('#deal-button').show();
  $('#hit-button').show();
  $('#stand-button').show();
  $('#dealer-hand').empty();
  $('#player-hand').empty();
  $('#player-points').empty();
  $("#dealer-points").empty();
  console.log('count', gameDeck.deckArray.length);
}

class Hand {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  addCard() {
    gameDeck.draw();
    var newCard = gameDeck.dealtCards[gameDeck.dealtCards.length - 1];
    this.cards.push(newCard);
  }

  getPoints() {
    var cardArray = this.cards;
    var pointsTotal = 0;
    for (var i = 0; i < cardArray.length; i++) {

      var value = parseInt(cardArray[i].label);
      if (isNaN(value)) {
        if (cardArray[i].label == 'ace') {
          var acePresent = true;
          if (acePresent == true && pointsTotal < 11) {
              var value = 11;
          } else if (acePresent == true) {
              var value = 1;
              pointsTotal += value;
          };
        }
        else {
          value = 10;
        }
      }
      pointsTotal += value;
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

//Set up for game
  var gameDeck = new Deck();
  gameDeck.addDeck();
  gameDeck.shuffle();
  var playerHand = new Hand();
  var dealerHand = new Hand();

  // deal function
  var playerValue = 0
  var dealerValue = 0

  $('#deal-button').click(function() {
    playerHand.addCard();
    $('#player-hand').append('<img src="images/' + playerHand.cards[playerHand.cards.length - 1].img + '">');
    playerHand.addCard();
    $('#player-hand').append('<img src="images/' + playerHand.cards[playerHand.cards.length - 1].img + '">');
    $('#dealer-hand').append('<img src="images/pics/card.png">');
    dealerHand.addCard();
    $('#dealer-hand').append('<img src="images/' + dealerHand.cards[dealerHand.cards.length - 1].img + '">');
    // var holeCardPoints = dealerHand.cards[dealerHand.cards.length - 1].label;
    $('#dealer-hand :nth-child(2)').hide();
    dealerHand.addCard();
    $('#dealer-hand').append('<img src="images/' + dealerHand.cards[dealerHand.cards.length - 1].img + '">');
    $(this).hide();
    playerValue = playerHand.getPoints();
    dealerValue = dealerHand.getPoints();
    // dealerValue = dealerHand.getPoints() - holeCardPoints;
    $('#player-points').text(playerValue);
    $('#dealer-points').text(dealerValue);
    $('#dealer-points').hide();
    // bust();
  });

  // hit function
  $('#hit-button').click(function() {
    playerHand.addCard();
    $('#player-hand').append('<img src="images/' + playerHand.cards[playerHand.cards.length - 1].img + '">');
    playerValue = playerHand.getPoints();
  $('#player-points').text(playerValue);
  bust();
  });

  // check for busts

  function bust() {
    if (playerValue > 21) {
      $('#messages').text("Bust! Dealer wins!");
      $("#hit-button, #stand-button").hide();
      $('#dealer-hand :nth-child(1)').hide();
      //show hole cards
      $('#dealer-hand :nth-child(2)').show();
      $('#dealer-points').show();
    }
    else if (dealerValue > 21) {
      $('#messages').text("Dealer busted! You win!");
      $("#hit-button, #stand-button").hide();
      $('#dealer-hand :nth-child(1)').hide();
      //show hole cards
      $('#dealer-hand :nth-child(2)').show();
      $('#dealer-points').show();
    }

  }

  //stand

  $('#stand-button').click(function() {
  $('#hit-button').hide();
  $(this).hide();
  //hide card.png
  $('#dealer-hand :nth-child(1)').hide();
  //show hole cards
  $('#dealer-hand :nth-child(2)').show();
  dealerValue = dealerHand.getPoints();
  playerValue = dealerHand.getPoints();
  $('#dealer-points').show();
  while (dealerValue <= 17 || dealerValue <= playerValue) {
    dealerHand.addCard();
    $('#dealer-hand').append('<img src="images/' + dealerHand.cards[dealerHand.cards.length - 1].img + '">')
    $('#dealer-points').text(dealerValue);
    dealerValue = dealerHand.getPoints();
    playerValue = playerHand.getPoints();
  }
  winner();
});

  //determine winner

  function winner() {
  if (dealerValue > 21) {
    $('#messages').text("Dealer busted! You win!")
    $('#dealer-points').text(dealerValue);
  }
  else if (dealerValue > playerValue) {
    $('#messages').text("Dealer wins!")
    $('#dealer-points').text(dealerValue);
  }
  else {
    $('#messages').text("You win!")
  }
}
// div for place bets
//buttons needed: place a bet, amount buttons,
//player starts with $500
//before playing, player places a bet and chooses between 5, 10, and 20
//
  // new game
  $('#newgame-button').click(function () {
      newGame()
    });
