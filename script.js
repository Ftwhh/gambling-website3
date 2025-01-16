// Simulated Blackjack Game
function playBlackjack() {
    const playerScore = Math.floor(Math.random() * 21) + 1;
    const dealerScore = Math.floor(Math.random() * 21) + 1;

    let result = `You: ${playerScore} | Dealer: ${dealerScore} <br>`;
    if (playerScore > 21) {
        result += "You bust! Dealer wins!";
    } else if (dealerScore > 21 || playerScore > dealerScore) {
        result += "You win!";
    } else if (dealerScore > playerScore) {
        result += "Dealer wins!";
    } else {
        result += "It's a tie!";
    }
    document.getElementById("output").innerHTML = result;
}

// Simulated Plinko Game
function playPlinko() {
    const prizes = ["$0", "$5", "$10", "$20", "Jackpot!"];
    const result = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById("output").innerHTML = `You won: ${result}`;
}

// Event Listeners
document.getElementById("play-blackjack").addEventListener("click", playBlackjack);
document.getElementById("play-plinko").addEventListener("click", playPlinko);
