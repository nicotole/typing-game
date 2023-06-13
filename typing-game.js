const d = document;
//const words = await getWords();
//console.log(words.jsonWords);
const WordContainerDOM = d.querySelector('.word');


d.addEventListener("DOMContentLoaded", function(){
    console.log("hola");
    startGame();
})

function getWords(){
    return new Promise( (resolve, reject) => (
        fetch("./words.json")
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    ))
}

async function getData(){
    let data = await getWords()
    console.log(data);
}


function showWord(word){
    /* This function puts a word in the WordContainerDOM */
    for(let i = 0; i < word.length; i++){
        // console.log(word[i])
        let letter = document.createElement('p');
        letter.innerHTML = word[i];
        letter.classList.add('wletter');
        WordContainerDOM.appendChild(letter);
    }
}

async function startGame(){
    const words = await getWords();
    let word = getRandomWord(words.jsonWords);
    console.log("random word: " + word)
    showWord(word);
}

d.addEventListener("keydown", (event) =>{
  console.log("word")
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


// function startGame(words){
//     let randomWord = randomElement(words);
// }