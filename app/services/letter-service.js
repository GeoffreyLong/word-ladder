angular.module('letterService', []).service('letterService', function() {
  // NOTE should be switch case statements based on the seed type
  //      http://stackoverflow.com/questions/12783610/javascript-switch-case-using-enum
  //      A cool way to do it would be to set the params at the start of the game
  //      Possible Params
  //          letterDist: The distribution of the letters
  //              Random: Get a random array of letters
  //              Freq: The probability of a letter is based on its 
  //                    frequency of use in the English Language
  //              vowelWeighted: Random, but vowels are more likely
  //          numLetters: The number of letters for each side
  //          minVowels: Boolean for whether or not a vowel is required
  //          letterRegen: Need a better name, but this is the behaviour for the nextLetter
  //              continuous: Each time nextLetter is called a letter is served
  //              end: The letters are only renewed when on a new word

  // TODO add some sort of logic to the undo that tracks the letters
  //      When someone clicks "undo" the letter needs to be saved
  //      so when they "redo" the get the same letters back right?
  //      In what case would I not want this to happen?

  // NOTE I need to ensure there is at least one vowel
  //      especially for the v1 of the game, where letters go sequentially
  //      and you cannot decide where to place the letter,

  possibleLetters = "abcdefghijklmnopqrstuvwxyz";
  vowels = "aeiou";

  // numLetters: the number of letters for each letter bar
  // minVowels: the minimum number of vowels
  this.initialSeed = function(numLetters, minVowels) {
    var letters = [];
    var numVowels = 0;
    for (var i = 0; i < numLetters; i ++) {
      letters[i] = possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
      if (['a', 'e', 'i', 'o', 'u'].indexOf(letters[i]) > 0) numVowels ++; 
    }

    // While there aren't enough vowels, switch a random index to be a vowel
    while (numVowels < minVowels) {
      var idx = Math.floor(Math.random() * numLetters);
      if (['a', 'e', 'i', 'o', 'u'].indexOf(letters[idx]) > 0) continue; 
      letters[idx] = vowels.charAt(Math.floor(Math.random() * vowels.length));
      numVowels ++;
    }

    console.log(numVowels);
    return letters;
  }

  // TODO need to include minVowels in here
  this.nextLetter = function() {
    return possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
  }

});
