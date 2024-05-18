const words = ('us deport inappropriate ticket quiet self here prince voter chauvinist staff toast quest freshman stable pick quit north nap develop speed').split(' ')
// console.log(words)

const wordsLen = words.length

document.addEventListener('DOMContentLoaded', newGame)


function randomWord(){
    return words[Math.ceil(Math.random() * (wordsLen - 1))]
}

function formatHtml(word){
    return `<div class="word">
        <span class="letter">${word.split('').join('</span><span class="letter">')}</span>
    </div>`
}

function newGame(e){
    let parag = document.getElementById('parag')
    for(let i=0; i<100; i++){
        parag.innerHTML += formatHtml(randomWord())
    }
}

