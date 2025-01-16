let deck;
let playerHand = [];
let dealerHand = [];
let playerMoney = 1000;
let playerName = "Guest";
let gameOver = false;

function startNewGame() {
  deck = createDeck();
  shuffleDeck(deck);
  playerHand = [dealCard(), dealCard()];
  dealerHand = [dealCard(), dealCard()];
  gameOver = false;
  updateUI();
}

function createDeck() {
  let suits = ["hearts", "diamonds", "clubs", "spades"];
  let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealCard() {
  return deck.pop();
}

function cardValue(card) {
  if (["J", "Q", "K"].includes(card.value)) return 10;
  if (card.value === "A") return 11;
  return parseInt(card.value);
}

function calculateHandValue(hand) {
  let value = hand.reduce((sum, card) => sum + cardValue(card), 0);
  let aces = hand.filter(card => card.value === "A").length;
  
  while (value > 21 && aces) {
    value -= 10;
    aces--;
  }
  
  return value;
}

function hit() {
  if (gameOver) return;
  playerHand.push(dealCard());
  if (calculateHandValue(playerHand) > 21) {
    gameOver = true;
    endGame("Player Busts! Dealer Wins");
  }
  updateUI();
}

function stand() {
  if (gameOver) return;
  while (calculateHandValue(dealerHand) < 17) {
    dealerHand.push(dealCard());
  }
  const playerTotal = calculateHandValue(playerHand);
  const dealerTotal = calculateHandValue(dealerHand);
  
  if (dealerTotal > 21) {
    endGame("Dealer Busts! Player Wins");
  } else if (playerTotal > dealerTotal) {
    endGame("Player Wins");
  } else if (playerTotal < dealerTotal) {
    endGame("Dealer Wins");
  } else {
    endGame("It's a Draw");
  }
}

function endGame(result) {
  gameOver = true;
  document.getElementById("game-result").innerText = result;
  // Adjust player money (example: win 100 IQD)
  if (result === "Player Wins") {
    playerMoney += 100;
  } else if (result === "Dealer Wins") {
    playerMoney -= 100;
  }
  updateUI();
}

function updateUI() {
  document.getElementById("user-name").innerText = playerName;
  document.getElementById("money").innerText = playerMoney;
  document.getElementById("dealer-cards").innerText = `Dealer's Hand: ${dealerHand.map(card => card.value).join(", ")}`;
  document.getElementById("player-cards").innerText = `Player's Hand: ${playerHand.map(card => card.value).join(", ")}`;
}

function newGame() {
  startNewGame();
  document.getElementById("game-result").innerText = "";
  updateUI();
}

// Initializing the game
startNewGame();
