
var Letter =require ( './letter.js');



function word (generatedWord) {

	this.letters = generatedWord.split("").map(function(char) {
    return new Letter(char);
  });
}

this.playerGuess = function(char){
    var foundLetter = false;
  this.letters.forEach(function(letter) {
    if (letter.guess(char)) {
      foundLetter = true;
    }
})

}
 


module.exports = word ; 



