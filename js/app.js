/*
 * Create a list that holds all of your cards
 */

 let card = document.getElementsByClassName("card");
 let cards = [...card]
 console.log(cards);

 const deck = document.getElementById("card-deck");

 /*
 Variables for the game
 */

const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
let matchedCard = document.getElementsByClassName("match");
let moves = 0;
let counter = document.querySelector(".moves");
let closeicon = document.querySelector(".close");
let modal = document.getElementById("popupfirst");

// Flipped cards

var openedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

document.body.onload = startGame();

/*
Function to start a new game
*/

function startGame() {
	cards = shuffle(cards);
	for (var i = 0; i < cards.length; i++){
		deck.innerHTML = "";
		[].forEach.call(cards, function(item){
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled");
	}
	// If moves has to be reset
	moves = 0;
	counter.innerHTML = moves;
	for (var i = 0; i < stars.length; i++){
		stars[i].style.color = "#02ccba";
		stars[i].style.visibility = "visible";
	}
	second = 0;
	minute = 0;
	hour = 0;
	var timer = document.querySelector(".timer");
	timer.innerHTML = "0 mins 0 secs";
	clearInterval(interval);
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // Toggles open and show

 var displayCard = function() {
 	this.classList.toggle("open");
 	this.classList.toggle("show");
 	this.classList.toggle("disabled");
 };

// Add flipped cards to list and check if cards are a match

function cardOpen() {
	openedCards.push(this);
	var len = openedCards.length;
	if (len === 2){
		moveCounter();
		if(openedCards[0].type === openedCards[1].type) {
			matched();
		} else {
			unmatched();
		}
	}
};

// When card match

function matched() {
	openedCards[0].classList.add("match","disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show", "open", "no-event");
	openedCards[1].classList.remove("show", "open", "no-event");
	openedCards = [];
}

// When card don't match

function unmatched() {
	openedCards[0].classList.add("unmatched");
	openedCards[1].classList.add("unmatched");
	disable();
	setTimeout(function() {
		openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
		openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
		enable();
		openedCards = [];
	},1100);
}

// Temporarily disable cards

function disable() {
	Array.prototype.filter.call(cards, function(card){
		card.classList.add('disabled');
	});
}

// Enable and disable matched cards

function enable() {
	Array.prototype.filter.call(cards, function(card){
		card.classList.remove('disabled');
		for (var i = 0; i < matchedCard.length; i++) {
			matchedCard[i].classList.add("disabled");
		}
	});
}

function moveCounter() {
	moves++;
	counter.innerHTML = moves;
	// Timer starts on first click
	if (moves === 1){
		second = 0;
		minute = 0;
		hour = 0;
		startTimer();
	}
	// setting rates 
	if (moves > 8 && moves < 12) {
		for (var i = 0; i < 3; i++){
			if (i > 1){
				stars[i].style.visibility = "collapse";
			}
		}
	}
	else if (moves > 13) {
		for (i = 0; i < 3; i++){
			if (i > 0){
			stars[i].style.visibility = "collapse";
		}
	  }
	}
}

/*
Game timer
*/

var second = 0; minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
	interval = setInterval(function() {
		timer.innerHTML = minute+"mins "+second+"secs";
		second++;
		if (second == 60){
			minute++;
			second = 0;
		}
		if (minute == 60) {
			hour++;
			minute = 0;
		}
	},1000);
}

/* 
Showing winning modal with statistics and congratulations
*/

function congratulations() {
	if (matchedCard.length == 16) {
		clearInterval(interval);
		finalTime = timer.innerHTML;
		modal.classList.add("show");
		var starRating = document.querySelector(".stars").innerHTML;
		document.getElementById("finalMove").innerHTML = moves;
		document.getElementById("starRating").innerHTML = starRating;
		document.getElementById("totalTime").innerHTML = finalTime;
		closeModal();
	};
}

// 228 Closing icon
function closeModal() {
	closeicon.addEventListener("click", function(e) {
		modal.classList.remove("show");
		startGame();
	});
}

/*
Play again function
*/

function playAgain() {
	modal.classList.remove("show");
	startGame();
}

for (var i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", cardOpen);
	card.addEventListener("click", congratulations);
};