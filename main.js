function newGame() {
  dealerCards = [];
  playerCards = [];
  dealtCards = [];
  // deckArray = [];
  // shuffle();
  deck = buildDeck();
  shuffle();
  $('#messages').text("")
  $('#deal-button').show();
  $('#hit-button').show();
  $('#stand-button').show();
  $('#dealer-hand').empty();
  $('#player-hand').empty();
  $('#player-points').empty();
  $("#dealer-points").empty();
  console.log('count', shuffled_deck.length);
}


var deck;
var shuffled_deck;
var playerCardsValue;
var dealerCardsValue;

// deck building function
var deckArray = [];

function buildDeck() {
  deckArray = [];
  shuffled_deck = [];
  var label = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
  var suit = ['clubs','spades','diamonds','hearts'];
  label.forEach(function(label) {
    suit.forEach(function(suit) {
      deckArray.push({'label': label, 'suit':suit, 'img':label + '_of_' + suit + '.png'})
    });
  });
  return deckArray;

}
// shuffle the deck

var deck = buildDeck();

var shuffled_deck = [];

function shuffle() {
  var index = Math.floor(Math.random() * deck.length)
  var card = deck[index];

  deck.splice(index, 1);
  shuffled_deck.push(card);
  if (deck.length > 0) {
    shuffle();
    // console.log(card);
    // console.log("shuffled_deck", shuffled_deck);
  }
}

// new game
shuffle();

// the array of cards dealt
var dealtCards = []

// Hand arrays for calculating points
var dealerCards = []
var playerCards = []

// deals random card
function dealACard(player) {
      var nextCard = shuffled_deck.pop();
      $('#' + player + '-hand').append('<img src="images/'+ nextCard.img + '">');
      $(player + 'Cards').append('<img src="images/'+ nextCard.img + '">');

      if (player === 'dealer') {
        dealerCards.push(nextCard);
      }
      else if (player === 'player') {
        playerCards.push(nextCard);
      }
      playerCardsValue = calculatePoints(playerCards);
      dealerCardsValue = calculatePoints(dealerCards);
      // console.log("nezt card??", nextCard);
}

// deal function

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

// hit function
$('#hit-button').click(function() {
  dealACard('player');
$('#player-points').text(playerCardsValue);
bust();
});


function calculatePoints(cardHand) {
    var total = 0;
    for (i = 0; i < cardHand.length; i++) {

    var value = parseInt(cardHand[i].label);
    if (isNaN(value)) {
      if (cardHand[i].label == 'ace') {
        value = 11;
      //   $('#' + player + '-hand').attr('value', function(n, v) {
      //     return v += 'ace';
      // });
    }
    else {
      value = 10;
    }
  }
  total += value;
}
  console.log(total);
  return total;
}

//ace
// check for busts

function bust() {
  if (playerCardsValue > 21) {
    $('#messages').text("Bust! Dealer wins!");
    $("#hit-button, #stand-button").hide();
  }
  else if (dealerCardsValue > 21) {
    $('#messages').text("Dealer busted! You win!");
    $("#hit-button, #stand-button").hide();
  }

}

//stand

$('#stand-button').click(function() {
$('#hit-button').hide();
while (dealerCardsValue <= 17)
{
  dealACard('dealer');
  dealerCardsValue;
}
//determine winner
if (dealerCardsValue > 21) {
  $('#messages').text("Dealer busted! You win!")
  $('#dealer-points').text(dealerCardsValue);
}
else if (dealerCardsValue > playerCardsValue) {
  $('#messages').text("Dealer wins!")
  $('#dealer-points').text(dealerCardsValue);
}
else {
  $('#messages').text("You win!")
}
});

//
// new game
$('#newgame-button').click(function () {
    newGame()
  });

// $('document').ready(function() {
//   $('#deal-button').click(function() {
//     dealACard('dealer');
//     dealACard('player');
//     dealACard('dealer');
//     dealACard('player');
//     $(this).hide();
//     $('#player-points').text(playerCardsValue);
//     $('#dealer-points').text(dealerCardsValue);
//     bust();
//   });
//   $('#newgame-button').click(function () {
//     newGame()
//   });
// });
