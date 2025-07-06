const emojis = ['🐶','🐱','🐭','🐹','🦊','🐻','🐼','🐨'];
let cards = [...emojis, ...emojis];
cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
const movesText = document.getElementById('moves');
const restartButton = document.getElementById('restartButton');
let flippedCards = [];
let moves = 0;
let matchedPairs = 0;

function createBoard() {
    gameBoard.innerHTML = '';
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.textContent = '';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length >= 2) return;

    const index = this.dataset.index;
    if (flippedCards.includes(index) || this.classList.contains('matched')) return;

    this.textContent = this.dataset.emoji;
    this.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
        moves++;
        movesText.textContent = `Züge: ${moves}`;
        checkMatch();
    }
}

function checkMatch() {
    const [firstIdx, secondIdx] = flippedCards;
    const firstCard = gameBoard.querySelector(`[data-index='${firstIdx}']`);
    const secondCard = gameBoard.querySelector(`[data-index='${secondIdx}']`);

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === emojis.length) {
            setTimeout(() => {
                const name = prompt("Spiel beendet! Gib deinen Namen für den Highscore ein:", "Anonym");
                saveScore(name, moves);
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 800);
    }
    flippedCards = [];
}

restartButton.addEventListener('click', () => {
    cards.sort(() => 0.5 - Math.random());
    flippedCards = [];
    moves = 0;
    matchedPairs = 0;
    movesText.textContent = `Züge: ${moves}`;
    createBoard();
});

function saveScore(name, score) {
    fetch('api/save_score.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score })
    })
    .then(() => loadHighscores());
}

function loadHighscores() {
    fetch('api/get_scores.php')
        .then(res => res.json())
        .then(data => {
            const highscoreDiv = document.getElementById('highscores');
            highscoreDiv.innerHTML = "<h4>🏆 Highscores</h4>";
            const list = document.createElement('ol');
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name}: ${item.score} Züge (${item.timestamp})`;
                list.appendChild(li);
            });
            highscoreDiv.appendChild(list);
        });
}

createBoard();
loadHighscores();
