$(document).ready(function() {
$('#deal-button').click (function() {
  dealACard(dealerHand, "#dealer-hand");
  dealACard(playerHand, '#player-hand');
  dealACard(dealerHand, "#dealer-hand");
  dealACard(playerHand, '#player-hand');
});

$('#hit-button').click (function() {
  dealACard(playerHand, '#player-hand');
});

var deckArray = []

function buildDeck() {
  var face = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
  var suit = ['clubs','spades','diamonds','hearts'];
  face.forEach(function(face) {
    suit.forEach(function(suit) {
      deckArray.push({
        'face': face,
        'suit': suit,
        'img': face + '_of_' + suit + '.png'})
    });
  });
  return deckArray;
}


});
