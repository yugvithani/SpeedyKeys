const words = ('us deport inappropriate ticket quiet self here prince voter chauvinist staff toast quest freshman stable pick quit north nap develop speed').split(' ')

const wordsLen = words.length

document.addEventListener('DOMContentLoaded', newGame)
document.getElementById('newGame').addEventListener('click', newGame)

//giving random word from words array
function randomWord(){
    return words[Math.ceil(Math.random() * (wordsLen - 1))]
}

//entering word in parag with tags
function formatParag(word){
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`
}

// for new Game
function newGame(e){
    let parag = document.getElementById('parag')
    parag.innerHTML = ''
    for(let i=0; i<100; i++){
        parag.innerHTML += formatParag(randomWord())
    }

    document.querySelector('.word').classList += ' current'
    document.querySelector('.letter').classList += ' current'
}

function addClass(tag, className){
    tag.className += ` ${className}`
}

function removeClass(tag, className){
    tag.classList.remove(className)
}

// keyboard Events
document.getElementById('game').addEventListener('keyup', function(e){

    let currWord = document.querySelector('.current')
    let currLetter = currWord.querySelector('.current')
    let key = e.key
    // if(currLetter)
    //     console.log(`key : ${key},  currLetter:${currLetter.innerHTML}`)
    
    // key is space
    if(key == ' '){

        // .current is not occupied by any letter, it shows space is currLetter
        if(currLetter == null){
            // console.log(`1. Key :${key}, currLetter :${currLetter}`);
            removeClass(currWord, 'current')
            addClass(currWord.nextElementSibling, 'current')
            addClass(currWord.nextElementSibling.querySelector('.letter'), 'current')
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
            removeClass(currWord, 'current')
            addClass(currWord.nextElementSibling, 'current')
            addClass(currWord.nextElementSibling.querySelector('.letter'), 'current')
        }
    }
    // key is not space
    else{
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
    
    // move blinking cursor...
    // currWord or ,nextWord(if currLetter is space)
    currWord = document.querySelector('.current')
    let nextLetter = currWord.querySelector('.current')
    let cursor = document.getElementById('cursor')

    // for next line // getBoundingClientRect() show actual param of div
    cursor.style.top = nextLetter.getBoundingClientRect().top + 'px'

    // if nextLetter is not space then nextLetter's left is assign
    if(nextLetter){
        cursor.style.left = nextLetter.getBoundingClientRect().left + 'px'
    }
    // if nextLetter is space then nextWord's right is assign
    else{
        cursor.style.left = currWord.getBoundingClientRect().right + 'px'
    }
})
