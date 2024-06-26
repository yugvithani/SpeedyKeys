const words = ('us deport inappropriate ticket quiet self here prince voter chauvinist staff toast quest freshman stable pick quit north nap develop speed').split(' ')

const wordsLen = words.length

document.addEventListener('DOMContentLoaded', newGame)
document.getElementById('newGame').addEventListener('click', function(){
    gameOver()
    newGame()
})

//giving random word from words array
function randomWord(){
    return words[Math.ceil(Math.random() * (wordsLen - 1))]
}

//entering word in parag with tags
function formatParag(word){
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`
}

function addClass(tag, className){
    tag.className += ` ${className}`
}

function removeClass(tag, className){
    tag.classList.remove(className)
}

window.timer = null         // for global var
let gameStartTime = null    // starting time of game
let timeStamp = 60          // time stamp for game, in second
let scrollCount = 0 

function getWPM(){
    let allWords = [...document.querySelectorAll('.word')]
    let lastTypedWord = document.querySelector('.word.current')
    let lastTypedWordIndex = allWords.indexOf(lastTypedWord)
    let typedWords = allWords.slice(0, lastTypedWordIndex)
    let correctWords = typedWords.filter((word) => {
        let allLetters = [...word.querySelectorAll('.letter')]
        let correctLetters = allLetters.filter((letter) => letter.classList.contains('correct'))
        let incorrectLetters = allLetters.filter((letter) => letter.classList.contains('incorrect'))
        return (correctLetters.length == allLetters.length) && (incorrectLetters == 0) 
    }) 
    return (correctWords.length) * (60 / timeStamp);
}

// for new Game
function newGame(){
    let parag = document.getElementById('parag')
    parag.innerHTML = ''
    for(let i=0; i<100; i++){
        parag.innerHTML += formatParag(randomWord())
    }

    document.querySelector('.word').classList += ' current'
    document.querySelector('.letter').classList += ' current'
    document.querySelector('#time').innerHTML = timeStamp
    // reset game tag 
    document.querySelector('#game').classList.remove('over')
    // reset variable
    window.timer = null         
    gameStartTime = null  
    // reset parag
    while(scrollCount > 0){
        parag.style.marginTop = (parseInt(parag.style.marginTop) + 33) + 'px'
        scrollCount--
    }
    // reset cursor
    cursor.style.left = document.querySelector('.letter.current').getBoundingClientRect().left + 'px'
    cursor.style.top = document.querySelector('.letter.current').getBoundingClientRect().top + 'px'
}

function gameOver(){
    clearInterval(window.timer)
    addClass(document.querySelector('#game'), 'over')
    document.getElementById('time').innerHTML = `WPM : ${getWPM()}`
}

// keyboard Events
document.getElementById('game').addEventListener('keyup', function(e){

    let currWord = document.querySelector('.current')
    let currLetter = currWord.querySelector('.current')
    const key = e.key
    const isSpace = (key == ' ')
    const isLetter = (key.length == 1) && (key != ' ')
    const isBackspace = (key == 'Backspace')
    const isFirstLetter = (currLetter == currWord.firstChild)
    const isExtraLetter = currWord.lastChild.classList.contains('extra')
    const isFirstWord = (currWord.previousElementSibling && currWord.previousElementSibling.getBoundingClientRect().top <250) && isFirstLetter
    
    // if timer is over
    if(document.querySelector('#game.over')){
        return;
    }

    // for timer & active when typing is start
    if(!window.timer && (isLetter || isSpace)){
        window.timer = setInterval(() => {
            if(!gameStartTime){
                gameStartTime = (new Date).getTime()    
            }
            let currTime = (new Date).getTime()
            let sTime = Math.round((currTime - gameStartTime) / 1000)
            let sLeft = timeStamp - sTime 
            if(sLeft <= 0){
                gameOver();
                return;
            }
            document.querySelector('#time').innerHTML = sLeft
        }, 1000);
    }    

    // key is space
    if(isSpace){

        // .current is not occupied by any letter, it shows space is currLetter
        if(currLetter == null){
            // console.log(`1. Key :${key}, currLetter :${currLetter}`);
            if(currWord.nextElementSibling){
                removeClass(currWord, 'current')
                addClass(currWord.nextElementSibling, 'current')
                addClass(currWord.nextElementSibling.querySelector('.letter'), 'current')
            }
            // console.log(currWord);
            // console.log(currWord.nextElementSibling);
            // console.log(currWord.nextElementSibling.querySelector('.letter'));
        }
        // enter space but require any other
        else{
            // console.log(`2. Key :${key}, currLetter :${currLetter.innerHTML}`);
            removeClass(currLetter, 'current')
            addClass(currLetter, 'incorrect')
            let currWord = currLetter.parentElement
            if(currWord.nextElementSibling){
                removeClass(currWord, 'current')
                addClass(currWord.nextElementSibling, 'current')
                addClass(currWord.nextElementSibling.querySelector('.letter'), 'current')
            }
        }
    }

    // key is Backspace
    else if(isBackspace){
        // not space and curr is first letter
        if(currLetter && isFirstLetter){
            // for the all word expecting first word
            if(currWord.previousElementSibling && !isFirstWord){
                removeClass(currWord, 'current')
                addClass(currWord.previousElementSibling, 'current')
                removeClass(currLetter, 'current')
            }
               // if not want to include space into backspace
            // addClass(currWord.previousElementSibling.lastChild, 'current')
            // removeClass(currWord.previousElementSibling.lastChild, 'incorrect')
            // removeClass(currWord.previousElementSibling.lastChild, 'correct')
        }
        // for the extra letter inplace of space
        else if(isExtraLetter){
            currWord.lastChild.remove()
        }
        // curr is not first letter
        else if(currLetter && !isFirstLetter){
            removeClass(currLetter.previousElementSibling, 'incorrect')
            removeClass(currLetter.previousElementSibling, 'correct')
            removeClass(currLetter, 'current')
            addClass(currLetter.previousElementSibling, 'current')
        }
        // curr is space
        else if(!currLetter){
            addClass(currWord.lastChild, 'current')
            removeClass(currWord.lastChild, 'correct')
            removeClass(currWord.lastChild, 'incorrect')
        }
    }

    // key is not space
    else if(isLetter){
        // expecting space
        if(currLetter == null){
            // console.log(`3. Key :${key}, currLetter :${currLetter}`);
            let extraLetter = document.createElement('span')
            extraLetter.innerHTML = key
            extraLetter.classList = 'letter incorrect extra'
            currWord.appendChild(extraLetter)
        }
        //key == currLetter
        else if(key == currLetter.textContent){
            // console.log(`4. Key :${key}, currLetter :${currLetter.innerHTML}`);
            addClass(currLetter, 'correct')
            removeClass(currLetter, 'current')
            let nextLetter = currLetter.nextElementSibling
            if(nextLetter){
                addClass(nextLetter, 'current')
                // console.log(nextLetter);
            }
        }
        // key != currLetter
        else{
            // console.log(`5. Key :${key}, currLetter :${currLetter.innerHTML}`);
            addClass(currLetter, 'incorrect')
            removeClass(currLetter, 'current')
            let nextLetter = currLetter.nextElementSibling
            if(nextLetter){
                addClass(nextLetter, 'current')
            }
        }
    }
    
    // scroll lines
    if(currWord.getBoundingClientRect().top > 285){
        let parag = document.querySelector('#parag')
        let margin = parseInt(parag.style.marginTop || '0px')
        parag.style.marginTop = (margin - 33) + 'px'
        scrollCount++
    }

    // move blinking cursor...
    // currWord or ,nextWord(if currLetter is space)
    currWord = document.querySelector('.current')
    let nextLetter = currWord.querySelector('.current')
    let cursor = document.getElementById('cursor')

    // if nextLetter is not space then nextLetter's left is assign
    if(nextLetter){
        cursor.style.left = nextLetter.getBoundingClientRect().left + 'px'
        // for next line // getBoundingClientRect() show actual param of div
        cursor.style.top = nextLetter.getBoundingClientRect().top + 'px'
    }
    // if nextLetter is space then nextWord's right is assign
    else{
        cursor.style.left = currWord.getBoundingClientRect().right + 'px'
        cursor.style.top = currWord.getBoundingClientRect().top + 4.5 + 'px'
    }
})
