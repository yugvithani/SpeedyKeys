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

    let word = document.querySelector('.current')
    let expected = word.querySelector('.current')
    let key = e.key
    // if(expected)
    //     console.log(`key : ${key},  expected:${expected.innerHTML}`)
    
    // key is space
    if(key == ' '){

        // .current is not occupied by any letter, it shows space is expected
        if(expected == null){
            // console.log(`1. Key :${key}, Expected :${expected}`);
            removeClass(word, 'current')
            addClass(word.nextElementSibling, 'current')
            addClass(word.nextElementSibling.querySelector('.letter'), 'current')
            console.log(word);
            console.log(word.nextElementSibling);
            console.log(word.nextElementSibling.querySelector('.letter'));
        }
        // enter space but require any other
        else{
            // console.log(`2. Key :${key}, Expected :${expected.innerHTML}`);
            removeClass(expected, 'current')
            addClass(expected, 'incorrect')
            let word = expected.parentElement
            removeClass(word, 'current')
            addClass(word.nextElementSibling, 'current')
            addClass(word.nextElementSibling.querySelector('.letter'), 'current')
        }
    }
    // key is not space
    else{
        // expecting space
        if(expected == null){
            // console.log(`3. Key :${key}, Expected :${expected}`);
            let extraletter = document.createElement('span')
            extraletter.innerHTML = key
            extraletter.classList = 'letter incorrect extra'
            word.appendChild(extraletter)
        }
        //key == expected
        else if(key == expected.textContent){
            // console.log(`4. Key :${key}, Expected :${expected.innerHTML}`);
            addClass(expected, 'correct')
            removeClass(expected, 'current')
            let expectedNext = expected.nextElementSibling
            if(expectedNext){
                addClass(expectedNext, 'current')
                console.log(expectedNext);
            }
        }
        // key != expected
        else{
            // console.log(`5. Key :${key}, Expected :${expected.innerHTML}`);
            addClass(expected, 'incorrect')
            removeClass(expected, 'current')
            let expectedNext = expected.nextElementSibling
            if(expectedNext){
                addClass(expectedNext, 'current')
            }
        }
    }
})
