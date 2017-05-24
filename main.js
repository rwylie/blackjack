var deck;
var shuffled_deck;
var playerCardsValue;
var dealerCardsValue;

// deck building function
var deckArray = []
function buildDeck() {
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

// new game
$('#newgame-button').click(function() {
    shuffle();
    $('#deal-button').show();
    $('#hit-button').show();
});

function calculatePoints(cardHand) {
    var total = 0;
    for (i = 0; i < cardHand.length; i++) {

    var value = parseInt(cardHand[i].label);
    if (isNaN(value)) {
      if (cardHand[i].label == 'ace') {
        value = 11;
        $('#' + player + '-hand').attr('val', function(n,v) {
          return v += 'a';
      });
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

// check for busts

function bust() {
  if (playerCardsValue > 21) {
    $('#messages').text("Bust! Dealer wins!");
  }
  else if (dealerCardsValue > 21) {
    $('#messages').text("Dealer busted! You win!");
  }
  
}

//player stands

$('#stand-button').click(function() {
$('#hit-button').hide();
while (dealerCardsValue <= 17)
{
  dealACard('dealer');
  dealerCardsValue;
}
if (dealerCardsValue > 21) {
  $('#messages').text("Dealer busted! You win!")
}
else if (dealerCardsValue > playerCardsValue) {
  $('#messages').text("Dealer wins!")
}
else {
  $('#messages').text("You win!")
}
});

//determine winner
