// Global variables
let playerMoney = 1000;  // Starting money
let gameOver = false;
let playerName = "Player";  // You can update this to your actual player's name

// Function to update the user interface (UI)
function updateUI() {
  document.getElementById("user-name").innerText = playerName;
  document.getElementById("money").innerText = playerMoney;
}

// Function to generate a random multiplier between 1 and 10
function generateRandomMultiplier() {
  return Math.floor(Math.random() * 10) + 1;  // Generates a random number between 1 and 10
}

// Function to handle the player's play (random multiplier game)
function playGame() {
  if (gameOver) return;

  // Ask the player to place a bet (for simplicity, assume they bet 100)
  let betAmount = 100;  // You can modify this to get dynamic input from the user

  if (betAmount > playerMoney) {
    alert("You don't have enough money to place that bet!");
    return;
  }

  // Generate a random multiplier
  const multiplier = generateRandomMultiplier();
  const winnings = betAmount * multiplier;

  // Update player's money based on the result
  playerMoney += winnings - betAmount;  // Player loses the bet amount, but wins multiplied value

  // Show results
  alert(`You bet ${betAmount}. The multiplier was ${multiplier}. You win ${winnings}!`);

  updateUI();  // Update the UI with the new money balance
}

// Start a new game
function startGame() {
  gameOver = false;
  playerMoney = 1000;  // Reset player's money to the starting amount
  updateUI();  // Update the UI to reflect the initial state
}

// End the game
function endGame() {
  gameOver = true;
  alert("Game over!");
  updateUI();  // Update the UI with the game over state
}

// Event listeners for buttons
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("play-btn").addEventListener("click", playGame);
