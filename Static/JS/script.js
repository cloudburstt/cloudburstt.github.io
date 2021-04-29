


// blackjack!

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', botLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

const hitSound = new Audio('Static/sounds/swish.m4a');
const winSound = new Audio(`Static/sounds/cash.mp3`);
const lossSound = new Audio('Static/sounds/aww.mp3');

let blackjackGame = {
    'you': {'scoreSpan':'#your-bj-result', 'div':'#your-box','score':0},
    'bot': {'scoreSpan':'#bot-bj-result', 'div':'#bot-box','score':0},
    'cards': ['2','3','4','5','6','7','8','8','9','10','K','J','Q','A'],
    'cardsMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9,
                '10':10, 'K':10, 'Q':10, 'J':10, 'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'ties': 0,
    'isStand': false,
    'turnOver': false,
}

const YOU = blackjackGame['you'];
const BOT = blackjackGame['bot'];




function blackjackHit() {
    console.log("hellooo");
        if(blackjackGame['isStand'] === false){
        let card = randomCard();
     
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if(activePlayer[`score`] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `Static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage); 
        hitSound.play();
    }
}

function blackjackDeal() {
    if(blackjackGame[`turnOver`] === true){

        blackjackGame[`isStand`] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let botImages = document.querySelector('#bot-box').querySelectorAll('img');
        console.log(yourImages);
        
        for(let i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        }
        for(let i = 0; i < botImages.length; i++){
            botImages[i].remove();
        }
        YOU[`score`] = 0;
        BOT[`score`] = 0;

        document.querySelector(`#your-bj-result`).textContent = 0;
        document.querySelector(`#your-bj-result`).style.color = 'white';
        document.querySelector(`#bot-bj-result`).textContent = 0;
        document.querySelector(`#bot-bj-result`).style.color = 'white';

        document.querySelector(`#black-jack-result`).textContent = `Let's play!`;
        document.querySelector(`#black-jack-result`).style.color = 'white';

        blackjackGame[`turnOver`] = true;
    }
}

function updateScore(card, activePlayer) {
    if(card === 'A'){
        if(activePlayer[`score`] + blackjackGame[`cardsMap`][card][1] <= 21){
            activePlayer[`score`] += blackjackGame[`cardsMap`][card][1];
        }
        else{
            activePlayer[`score`] += blackjackGame[`cardsMap`][card][0];
        }
    }

    activePlayer[`score`] += blackjackGame[`cardsMap`][card];
}

function showScore(activePlayer) {
    if(activePlayer[`score`] > 21){
        document.querySelector(activePlayer[`scoreSpan`]).textContent = `BUSTED!`;
        document.querySelector(activePlayer[`scoreSpan`]).style.color = `red`;
    }
    else{
    document.querySelector(activePlayer[`scoreSpan`]).textContent = activePlayer[`score`];
    }
}

function botLogic() {
    blackjackGame[`isStand`] = true;

    while(BOT[`score`] < 16 && blackjackGame[`isStand`] === true){
        let card = randomCard();
        showCard(card, BOT);
        updateScore(card, BOT);
        showScore(BOT);
        // showResult();
    }

    // if(BOT[`score`] > 15){
    blackjackGame[`turnOver`] = true;
    showResult(computeWinner());
    
}

function computeWinner() {
    let winner;

    if(YOU[`score`] <= 21){
        if(YOU[`score`] > BOT[`score`] || BOT[`score`] > 21){
            blackjackGame[`wins`]++;

            console.log(`YOU WON! <3`);
            winner = YOU;
        }
        else if(YOU[`score`] < BOT[`score`]){
            blackjackGame[`losses`]++;
            console.log(`BOT WON! :(`);
            winner = BOT;
        }
        else if(YOU[`score`] === BOT[`score`]){
            blackjackGame[`ties`]++;
            console.log(`TIED :/`);
        }
    }
    else if(YOU[`score`] > 21 && BOT[`score`] <= 21){
        blackjackGame[`losses`]++;
        console.log(`YOU LOST! :(`);
        winner = BOT;
    }
    else if(YOU[`score`] > 21 && BOT[`score`] > 21){
        blackjackGame[`ties`]++;
        console.log("TIED :/");
    }

    console.log(`Winner is: ` + winner);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if(blackjackGame[`turnOver`] === true){

        if(winner === YOU){
            document.querySelector(`#wins`).textContent = blackjackGame[`wins`];

            message = `YOU WON!`;
            messageColor = `green`;
            winSound.play();
        }
        else if(winner === BOT){
            document.querySelector(`#losses`).textContent = blackjackGame[`losses`];

            message = `YOU LOST!`;
            messageColor = `red`;
            lossSound.play();
        }
        else{
            document.querySelector(`#ties`).textContent = blackjackGame[`ties`];

            message = `YOU TIED`;
            messageColor = `black`;
        }

        document.querySelector(`#black-jack-result`).textContent = message;
        document.querySelector(`#black-jack-result`).style.color = messageColor;
    }
}