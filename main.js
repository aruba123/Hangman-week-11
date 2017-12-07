// main.js will contain the logic of your app. Running it in the node and will start the game

// The game should end when a player guesses the correct word or runs out of guesses

// Required Modules ========================
//   This file creates the random word
var Game= require ( './game.js');
//This file stores the word 
var Word = require ('./word.js')

var Letter =require ( './letter.js');

var wordBank =  ["jaundice","jaw","bandage","benign","biopsy","pressure","clot","concussion","procedure","coma","contagious","contusion"]





// ==========node Modules=============
var inquirer = require ('inquirer');
var Color= require ('color')
var chalk= require ('chalk')

// ==== GAME VARIABLES=========
var border= ""
var blanks = "";
var userGuesses;
var guessesLeft = 10;
var LetterGuessed =[]
var  wins = 0 ;
var losses = 0;

//setting variable game to a new instance of Game and passing the entire array as a parameter

var Game  = new Game (wordBank);

//setting variable generatedWord to function that calls the random word 

var generatedWord = Game.pickRandomWord();

console.log(generatedWord)

// setting variable word to a new instance of Word and passing the generated word into it

var word = new Word (generatedWord);

console.log(word)

//setting the variable index to the index of the generated word 

var index = wordBank.indexOf(generatedWord);


// // ====== GAME FUNCTIONS ======
// function printInfo() {
//     console.log('\033c');
//     console.log("\nWelcome to terminal hangman!\n".bold.red + "\nToday's catagory is " + "medical words".rainbow + "\n");
//     console.log("\n***********************************************".green);
//     console.log("|                                             |".green);
//     console.log("|".green + "  You current word: ".red + word.displayWord().magenta);
//     console.log("|                                             |".green);
//     console.log("***********************************************".green + "\n");
//     console.log("Guesses remaining: ".blue + guessesLeft + " | " + "Letters Guessed: ".blue + lettersGuessed.join(" ").rainbow + "\n");
//     console.log("Wins: ".green + wins + " | " + "Losses: ".yellow + losses + "\n");
// }

// function that re-intializes the word after a word is guessed or guesses run out
function gameReset() {

    index = "";
    game = new Game(wordBank);
    generatedWord = game.pickRandomWord();
    word = new Word(generatedWord);
    index = wordBank.indexOf(generatedWord);
    lettersGuessed = [];
    guessesLeft = 10; // re-initialize the guesses left 
    printInfo();
    guess();

}

// function that handles the logic when the user guesses the correct word
function correctWord() {
    // Calls the roundFinished function if the entire word is guessed
    if (word.roundFinished()) {
        // If the index is not out of bounds (-1) then take the word out of the word bank
        if (index != -1) {
            wordBank.splice(index, 1);
        }
        // if the word bank is = 0 then the game is over and message is displayed
        if (wordBank.length === 0) {
            console.log("\nCongrats you guessed all of the words, GAME OVER!\n".rainbow);
            return;
        }
        wins += 1;
        // inquirer to ask user if they want to play again after guessing the right word
        inquirer.prompt([{
            name: "replay",
            message: "Great Job! You guessed the word, play again (Y/N)",
            type: "input",
            validate: function(input) {
                if (input === 'Y' || input === 'y' || input === 'n' || input === 'N') {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function(answers) {
            if (answers.replay === 'Y' || answers.replay === 'y') {
                // NEED TO recall  the new word generator and their functions
                gameReset();

            } else {
            	// If the user selects no then the game and and the message below is displayed
                console.log("Thank you for playing. Good Bye!".magenta);
            }
        });
        return;

    }
    guess();
}


// The function that handles all of the logic when the guesses run out
function incorrectWord() {
    losses += 1;
    inquirer.prompt([{
        name: "playagain",
        message: "You have no more guesses, play again (Y/N)",
        type: "input",
        validate: function(input) {
            if (input === 'Y' || input === 'y' || input === 'n' || input === 'N') {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answers) {
        if (answers.playagain === 'Y' || answers.playagain === 'y') {
            // NEED TO recall  the new word generator and their functions
            gameReset();

        } else {

            console.log("Thank you for playing. Good Bye!".magenta);
        }
    });

}


// ============== PLAY GAME ============
//printInfo();

// Start the game using inquirer
function guess() {

    // Prompt the user to enter a letter
    inquirer.prompt([{
        name: "guess",
        message: "Guess a letter",
        type: "input",
        validate: function(input) {
            if (input.match(/[A-Za-z]+/)) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answers) {
        userGuess = answers.guess;
        if (guessesLeft > 1) {
            // calls the playerGuess function and shows the letter if correctly guessed
            word.playerGuess(userGuess);
            console.log(playerGuess)

            // checks to see if the letter guess is already in the lettersGuessed array if not push it to the array
            if (lettersGuessed.indexOf(userGuess) === -1) {
                lettersGuessed.push(userGuess);
                guessesLeft -= 1;
            }

            // Re-prints the word in the new state
            printInfo();

            // calls the function the handles the logic when a correct word is guessed
            correctWord();

            // If guesses left equals to zero it goes to this else statement to ask if user wants to play again
        } else {
            // console.log("else statment");
            incorrectWord();

        }

    });

}
guess();
