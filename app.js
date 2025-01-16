// Global variables
let playerHand = [];
let dealerHand = [];
let playerMoney = 1000;  // Starting money
let gameOver = false;
let playerName = "Player";  // You can update this to your actual player's name

// Deal a card (just a simple function)
function dealCard() {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomValue = values[Math.floor(Math.random() * values.length)];

  return { value: randomValue, suit: randomSuit };
}

// Calculate hand value
function calculateHandValue(hand) {
  let value = 0;
  let aceCount = 0;
  
  hand.forEach(card => {
    if (card.value === "A") {
      aceCount++;
      value += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  });

  // Adjust for aces (they can be 1 or 11)
  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount--;
  }
  
  return value;
}

// Update the user interface (UI) based on game state
function updateUI() {
  document.getElementById("user-name").innerText = playerName;
  document.getElementById("money").innerText = playerMoney;

  // Dealer's cards display: Only show the first card initially
  let dealerCardDisplay = dealerHand.map(card => card.value).join(", ");
  if (gameOver || playerHand.length > 2) {
    // Show both dealer cards when the game is over or player has hit
    dealerCardDisplay = dealerHand.map(card => card.value).join(", ");
  } else {
    // Show only the first card initially (second card is hidden)
    dealerCardDisplay = dealerHand[0].value + ", [Hidden]";
  }

  document.getElementById("dealer-cards").innerText = `Dealer's Hand: ${dealerCardDisplay}`;
  document.getElementById("player-cards").innerText = `Player's Hand: ${playerHand.map(card => card.value).join(", ")}`;
}

// Start the game: Deal initial cards to player and dealer
function startGame() {
  gameOver = false;
  playerHand = [dealCard(), dealCard()];
  dealerHand = [dealCard(), dealCard()];
  
  updateUI();
}

// Player hits: Deal one more card to the player
function hit() {
  if (gameOver) return;

  playerHand.push(dealCard());
  if (calculateHandValue(playerHand) > 21) {
    endGame("Player Busts! Dealer Wins");
  }

  updateUI();
}

// Player stands: Dealer plays and the game ends
function stand() {
  if (gameOver) return;

  // Reveal the dealer's second card
  document.getElementById("dealer-cards").innerText = `Dealer's Hand: ${dealerHand.map(card => card.value).join(", ")}`;

  // Dealer's turn: Deal cards until dealer has 17 or more
  while (calculateHandValue(dealerHand) < 17) {
    dealerHand.push(dealCard());
  }

  const playerTotal = calculateHandValue(playerHand);
  const dealerTotal = calculateHandValue(dealerHand);

  // Determine the winner
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

// End the game: Display result and update player money
function endGame(message) {
  gameOver = true;
  document.getElementById("game-result").innerText = message;
  
  // Example of handling money change based on win/lose (modify this as needed)
  const playerTotal = calculateHandValue(playerHand);
  const dealerTotal = calculateHandValue(dealerHand);
  
  if (message.includes("Player Wins")) {
    playerMoney += 100;  // Add money to player's balance (modify based on bet amount)
  } else if (message.includes("Dealer Wins")) {
    playerMoney -= 100;  // Subtract money from player's balance
  }
  
  updateUI();
}

// Initialize the game when the page loads
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("hit-btn").addEventListener("click", hit);
document.getElementById("stand-btn").addEventListener("click", stand);
