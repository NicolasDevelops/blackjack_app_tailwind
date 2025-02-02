let coins = 100;
let cards = [];
let total = 0;
let isAlive = false;
let hasBlackjack = false;
let canRestartGame = true;


let coinsEl = document.getElementById('coins-el');
let coinsContainer = document.getElementById('coins-container');
let header = document.getElementById('heading');
let cardsEl = document.getElementById('cards-el');
let totalEl = document.getElementById('total-el');
let startEl = document.getElementById('start-el');
let startButton = document.getElementById('start-button');
let hitEl = document.getElementById('hit-el');


const cardNames = [
    { name: 'Ace', value: 1 },
    { name: 'Two', value: 2 },
    { name: 'Three', value: 3 },
    { name: 'Four', value: 4 },
    { name: 'Five', value: 5 },
    { name: 'Six', value: 6 },
    { name: 'Seven', value: 7 },
    { name: 'Eight', value: 8 },
    { name: 'Nine', value: 9 },
    { name: 'Ten', value: 10 },
    { name: 'eleven', value: 11 },
    { name: 'twelve', value: 12 },
    { name: 'thirteen', value: 13 },
];

// Get Random Card Function
function getRandomCard() {
    const randomCard = cardNames[Math.floor(Math.random() * cardNames.length)];
    return { name: randomCard.name, value: randomCard.value };
}

// Display Cards Function
function displayCards(card1, card2) {
	cardsEl.classList.remove('hidden');
	cardsEl.innerHTML = '';

	const cardElement1 = document.createElement('img');
	cardElement1.src = `./cards/${card1.name.toLowerCase()}.svg?sanitize=true`;
	cardElement1.classList.add('card', 'w-36', 'md:w-52', 'lg:w-64', 'h-full', 'motion-preset-slide-left', 'motion-duration-1000', 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]');
	cardElement1.title = `${card1.name} - ${card1.value}`;
	
	const cardElement2 = document.createElement('img');
	cardElement2.src = `./cards/${card2.name.toLowerCase()}.svg?sanitize=true`;
	cardElement2.classList.add('card', 'w-36', 'md:w-52', 'lg:w-64', 'h-full', '-ml-24', 'motion-preset-slide-left', 'motion-delay-200', 'motion-duration-1000', 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]');
	cardElement2.title = `${card2.name} - ${card2.value}`;

	cards.push(card1.value);
	cards.push(card2.value);
	cardsEl.appendChild(cardElement1);
	cardsEl.appendChild(cardElement2);
}

// Display New Card Function

function displayNewCard(newCard) {
	const newCardElement = document.createElement('img');
	newCardElement.src = `./cards/${newCard.name.toLowerCase()}.svg?sanitize=true`;
	newCardElement.classList.add('card', 'w-36', 'md:w-52', 'md:w-42', 'lg:w-64', 'h-full', '-ml-24', 'motion-preset-slide-left', 'motion-duration-1000', 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]');
	newCardElement.title = `${newCard.name} - ${newCard.value}`;
	cards.push(newCard.value);
	cardsEl.appendChild(newCardElement);

}


// Start Game Function
function startGame() {
	if (coins >= 10 && !isAlive) {
		canRestartGame = true;
		// Charges player 10 coins and sets isAlive to true
		isAlive = true;
		coins -= 10;
		coinsEl.textContent = coins;
		coinsContainer.classList.add('motion-preset-shake');
		setTimeout(() => {
			coinsContainer.classList.remove('motion-preset-shake');
		}, 300);
		// Displays cards
		const card1 = getRandomCard();
		const card2 = getRandomCard();
		displayCards(card1, card2);
		// Adds cards numeric value to cards array
		cards = [card1.value, card2.value];
    // Calculates and displays total
		total = card1.value + card2.value;
		totalEl.textContent = total;
		// Replaces 'Start' with 'Restart'
		startEl.textContent = 'Restart';
		renderGame();

	} else if (coins >= 10 && isAlive) {
		// Restarts game
		isAlive = false;
		startGame();
	} else if (canRestartGame){
		// Insufficient funds
		canRestartGame = false;
		header.textContent = 'Game over! restarting the game...';
		setTimeout(() => {
			isALive=false;
			coins = 100;
			coinsEl.textContent = coins;
			startGame();
		}, 2000)
	}
}

// Heading Animation Function

function headingAnimation() {
	header.classList.add('motion-preset-rebound-up', '-motion-translate-y-in-120');
	setTimeout(() => {
		header.classList.remove('motion-preset-rebound-up', '-motion-translate-y-in-120');
	}, 300)
}

// Render Game Function
function renderGame() {
	if (total < 21) {
		message = 'Do you want to draw a new card?';
		headingAnimation();
	} else if (total === 21) {
		message = "You've got Blackjack! +20 coins";
		coins += 20;
		coinsEl.textContent = coins;
		hasBlackjack = true;
		coinsContainer.classList.add('motion-preset-confetti');
		setTimeout(() => {
			coinsContainer.classList.remove('motion-preset-confetti');
		}, 300);
		headingAnimation();
	} else {
		message = "You're out of the game!"
		isAlive = false
		headingAnimation();
	}
	header.textContent = message;
}

// New Card Function

function newCard() {
	if (isAlive && total < 21) {
		// Button animation
		const newCard = getRandomCard();
		displayNewCard(newCard);
		total += newCard.value;
		totalEl.textContent = total;
		renderGame();
	}
	if (!isAlive || hasBlackjack) {
		hitEl.classList.add('motion-preset-shake');
		setTimeout(() => {
		hitEl.classList.remove('motion-preset-shake');
		}, 300);
	}
}

// Button Mouse Over Functionality

startButton.addEventListener('mouseover', () => {
	startButton.classList.add('hover:drop-shadow-xl');
});
hitEl.addEventListener('mouseover', () => {
	hitEl.classList.add('hover:drop-shadow-xl');
});