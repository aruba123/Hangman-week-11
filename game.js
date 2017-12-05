
// Your game.js file will randomly select a word for the player.

// Using ES6 features
"use strict";

// Return a random word from the main answer choice game array
class Game {
	constructor(wordBank) {
		this.wordBank = wordBank;
		//console.log('this.wordBank: ' + this.wordBank);
	}

 	pickRandomWord() {
		return this.wordBank[Math.floor(Math.random() * this.wordBank.length + 1) - 1];
	}
}

module.exports = Game;



// var currentwordBank = [];

// This generates random word
// function randomWord(){
// 		return wordBank[Math.floor(Math.random() * wordBank.length+1)-1];
		

// 	}
// var value = randomWord();



//  // Setting the function randomWord to the initial pick and will call in main.js file 
// // currentWordBank = randomWord().split("");

// // var blanksArray =[];
// // // for each loop to create an array of "_"
// // currentWorBank.forEach(function(letter, index){
// // 	blanksArray.push("_");

// // });
// // var checker = new Word.CheckGuess(currentWordBank, blanksArray); 

// // This will remove the word after user either guesses it right or runs out of guesses
// function removeWord() {
// 	var removeIndex = wordBank.indexOf(initialPick)
// 	if(removeIndex!== 1){
// 		wordBank.splice(removeIndex, 1);
// 		return wordBank;

// 	}
// }

// module.exports = {
// 	wordBank: wordBank, randomWord: randomWord, value: value
// }
