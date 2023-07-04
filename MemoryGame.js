const buttons = document.querySelectorAll('button');

var flippedCards = [];
var isFlipped = false;
var revealColors = ['red', 'yellow', 'orange', 'purple', 'green', 'skyblue', 'brown', 'white', 'indigo', 'darkblue'];
revealColors = revealColors.concat(revealColors);

// randomize function to get random colors every time
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

shuffle(revealColors);

// setting all buttons colors and initializing click
buttons.forEach((button, index) => {
    let counter = index + 1;
    button.setAttribute('saved-color', revealColors[index]);
    button.addEventListener('click', handleButtonClick);
});
// check if clicking same card, already flipped card, if you get to two cards check for match
function handleButtonClick() {
    let value = this.getAttribute('saved-color');
    if (isFlipped || this === flippedCards[0]) {
        return;
    }
    this.style.backgroundColor = value;
    ;
    if (flippedCards.length == 0) {
        flippedCards.push(this);
        return;
    }
    flippedCards.push(this);
    isFlipped = true;
    checkForMatch();

}
// check for match, leave open if so, turn back after timeout if not
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.style.backgroundColor == card2.style.backgroundColor) {
        card1.removeEventListener('click', handleButtonClick);
        card2.removeEventListener('click', handleButtonClick);
        flippedCards = [];
        isFlipped = false;
    }
    else {
        setTimeout(() => {
            card1.style.backgroundColor = 'blue';
            card2.style.backgroundColor = 'blue';
            flippedCards.forEach(card => {
                card.style.backgroundColor = 'blue';
            });
            flippedCards = [];
            isFlipped = false;
        }, 1000)
    }
}







