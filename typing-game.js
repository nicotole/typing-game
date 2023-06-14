const d = document;
const WordContainerDOM = d.querySelector('.word');
let word = null;//global scope
let wordIndex = 0;
let wordLettersDOM = null;
let poinstCounter = d.querySelector('p.counter');
let points = 0;
let words = null;
d.addEventListener("DOMContentLoaded", function(){
    setGame();
})

function getWords(){
    return new Promise( (resolve, reject) => (
        fetch("./words.json")
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    ))
}

function showWord(word){
    /* This function puts a word in the WordContainerDOM */
    for(let i = 0; i < word.length; i++){
        let letter = d.createElement('p');
        letter.innerHTML = word[i];
        letter.classList.add('wletter');
        WordContainerDOM.appendChild(letter);
    }
}

async function setGame(){
    poinstCounter.innerHTML = 0;
    words = await getWords();
    word = getRandomWord(words.jsonWords);
    showWord(word);
    wordLettersDOM = d.querySelectorAll('p.wletter')
}

function clearWord(){
    let letras = d.querySelectorAll('p.wletter');
        letras.forEach(element => {
        element.remove();
    });
}

function restartGame(){
    points = 0;
    poinstCounter.innerHTML = points;
    clearWord();
    wordIndex = 0;
    word = getRandomWord(words.jsonWords);
    showWord(word);
    wordLettersDOM = d.querySelectorAll('p.wletter')
}

d.addEventListener("keydown", (event) =>{
    if(wordIndex == word.length-1){//si se cumple es porque ya se completo la palabra
        points++;
        poinstCounter.innerHTML = points;
        wordLettersDOM[wordIndex].classList.add('wletter-typed');
        word = getRandomWord(words.jsonWords);
        clearWord();
        showWord(word);
        wordIndex = 0;
        wordLettersDOM = d.querySelectorAll('p.wletter')
    }else{
        if(event.key === word[wordIndex]){//if you tipe well
            wordLettersDOM[wordIndex].classList.add('wletter-typed');
            console.log(wordLettersDOM[wordIndex]);
            wordIndex++;
        }else{//if you fail typing
            restartGame();
        }
    }
});

function getRandomWord(words){
    /*this function receives an array of words and return one random word*/
    return randomElement(words);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomElement(array){
    /* This function return a random element from any array */
    return array[getRandomInt(array.length)];
}

