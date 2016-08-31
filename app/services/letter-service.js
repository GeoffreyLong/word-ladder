angular.module('letterService', []).service('letterService', function() {
  // TODO should be switch case statements based on the seed type
  //      http://stackoverflow.com/questions/12783610/javascript-switch-case-using-enum
  //      A cool way to do it would be to set the params at the start of the game
  //      Possible Params
  //          letterDist: The distribution of the letters
  //              Random: Get a random array of letters
  //              Freq: The probability of a letter is based on its 
  //                    frequency of use in the English Language
  //              vowelWeighted: Random, but vowels are more likely
  //          numLetters: The number of letters for each side
  //          requireVowel: Boolean for whether or not a vowel is required


  // NOTE for the v1 of the game, where letters go sequentially
  //      and you cannot decide where to place the letter,
  //      I need to ensure that there is at least one vowel

  possibleLetters = "abcdefghijklmnopqrstuvwxyz";
  vowels = "aeiou";

  this.initialSeed = function(numLetters) {
    var letters = [];
    for (var i = 0; i < numLetters; i ++) {
      letters[i] = possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
    }

    return letters;
  }

  this.nextLetter = function() {
    return possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
  }

});
