const words = ('us deport inappropriate ticket quiet self here prince voter chauvinist staff toast quest freshman stable pick quit north nap develop speed').split(' ')

const wordsLen = words.length

document.addEventListener('DOMContentLoaded', newGame)
document.getElementById('newGame').addEventListener('click', newGame)

function randomWord(){
    return words[Math.ceil(Math.random() * (wordsLen - 1))]
}

function formatParag(word){
    return `<div class="word">
        <span class="letter">${word.split('').join('</span><span class="letter">')}</span>
    </div>`
}

function newGame(e){
    let parag = document.getElementById('parag')
    parag.innerHTML = ''
    for(let i=0; i<100; i++){
        parag.innerHTML += formatParag(randomWord())
    }

    document.querySelector('.word').classList += ' current'
    document.querySelector('.letter').classList += ' current'
}

