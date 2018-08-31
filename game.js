var inquirer = require("inquirer")

var wordBank = ["chicken", "farley", "bacon", "ostrich", "lemur", "emu", "oysters", "tuna", "crabs"]

var guessLimit = 10;

var currentWord = pickWord()

function Word(word) {
    this.word = word
    var wordArr = []
    for (var i = 0; i < word.length; i++) {
        wordArr.push(new Letter(word[i]))
    }
    return wordArr
}

function Letter(letter) {
    this.letter = letter
    this.display = "_ "
    this.updateDisplay = function(arg){
        this.display = arg
    }
}

function pickWord(){
    var rand = Math.floor(Math.random() * wordBank.length)
    var myWord = new Word(wordBank[rand])
    return myWord
}

function checkGameStatus() {

    var playerWins = true

    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i].display == "_ ") {
            playerWins = false
        }
    }  

    return playerWins

}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

function compareToTarget(letterGuess){

    var letterGuess = letterGuess
    var wordContained = false

    for (var i = 0; i < currentWord.length; i++) {

        if (currentWord[i].letter == letterGuess) {
            currentWord[i].updateDisplay(letterGuess + " ")
            wordContained = true
        }

    }
    if (wordContained == false ) {
        guessLimit--
    }
    console.log("Guesses remaining: " + guessLimit)
    if (checkGameStatus() == true) {
        console.log("You win!")
        startGame()
    }
    newRound()
}

function guessLetter() {

    var display = []

    for (var i = 0; i < currentWord.length; i++) {
        display.push(currentWord[i].display)
    }
    console.log(display.join(""))
    inquirer.prompt([
        {
            message: "Pick a letter!",
            name: "letterGuess"
        }
    ]).then(function(response){
        if (alphabet.indexOf(response.letterGuess) > -1 && response.letterGuess.length < 2){
            compareToTarget(response.letterGuess)

        } else {
            console.log("Enter a valid letter")
            guessLetter()
        }
    })
}

function newRound (){
    if (guessLimit > -1) {
        guessLetter()
    } else {
        console.log("You lose")
    }
}

function startGame() {
    inquirer.prompt([
        {
            type: "list",
            message: "Let's play WordGuess. Ready to start?",
            choices: ["Yes", "No"],
            name: "start"
        }
    ]).then(function(response){
        var action = response.start
        switch(action){
            case "Yes":
                newRound();
                break;
            case "No":
                connection.end();
                break;
        }
    }
    )
}

startGame()

// Hi. I understand constructors. I understand recursion. I understand how to make this work. It's glitchy.