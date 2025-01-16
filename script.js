let playerHand = [];
let dealerHand = [];

// Function to deal a card
function drawCard() {
    return Math.floor(Math.random() * 11) + 1; // Card values from 1 to 11
}

// Function to calculate hand total
function calculateHand(hand) {
    return hand.reduce((total, card) => total + card, 0);
}

// Start a new Blackjack game
function startBlackjack() {
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];
    document.getElementById("output").innerHTML = `Your cards: ${playerHand.join(", ")} (Total: ${calculateHand(playerHand)})<br>Dealer shows: ${dealerHand[0]}`;
}

// Player draws a card
function hit() {
    playerHand.push(drawCard());
    const playerTotal = calculateHand(playerHand);

    if (playerTotal > 21) {
        document.getElementById("output").innerHTML = `Your cards: ${playerHand.join(", ")} (Total: ${playerTotal})<br>You busted! Dealer wins!`;
    } else {
        document.getElementById("output").innerHTML = `Your cards: ${playerHand.join(", ")} (Total: ${playerTotal})<br>Dealer shows: ${dealerHand[0]}`;
    }
}

// Player stands, dealer plays
function stand() {
    let playerTotal = calculateHand(playerHand);
    let dealerTotal = calculateHand(dealerHand);

    while (dealerTotal < 17) {
        dealerHand.push(drawCard());
        dealerTotal = calculateHand(dealerHand);
    }

    let result = `Your cards: ${playerHand.join(", ")} (Total: ${playerTotal})<br>Dealer's cards: ${dealerHand.join(", ")} (Total: ${dealerTotal})<br>`;

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
        result += "You win!";
    } else if (dealerTotal > playerTotal) {
        result += "Dealer wins!";
    } else {
        result += "It's a tie!";
    }

    document.getElementById("output").innerHTML = result;
}

// Event Listeners for Buttons
document.getElementById("play-blackjack").addEventListener("click", startBlackjack);
document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stand").addEventListener("click", stand);
