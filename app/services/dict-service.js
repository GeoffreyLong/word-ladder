angular.module('dictService', []).service('dictService', function($http) {
  // Checks words against those in the dictionary
  //
  // For the word list I am currently using
  //    https://github.com/shimaore/password/blob/master/lib/wordlist.json
  //    The EOWL is preferred, but for early stage I didn't want to create a json
  // I could also use 
  //    EOWL
  //        This has no proper nouns, no words longer than 10 characters,
  //        no hyphenated or diacritic symbols
  //        TODO this is preferred
  //    The ENABLE list
  //    Or https://github.com/sindresorhus/word-list
  //        In this case I would have to run Express I think
  //
  // Currently I am doing a very simple "check if in array" solution
  //    I will see if this is fast enough for my purposes
  // TODO read this for a faster implementation
  //      http://stevehanov.ca/blog/index.php?id=120


  // Load the dictionary into memory
  // Try localStorage first, if that doesn't work then move 
  var dict = [];
  if (localStorage && localStorage.dictionary) {
    dict = JSON.parse(localStorage.dictionary);
  }
  else {
    // Fetch from the server
    $http.get("/static/wordlist.json").then(function(res) {
      dict = res.data.wordlist;
      localStorage.dictionary = JSON.stringify(dict);
    }, function(err) {

    });
  }

  this.checkWord = function(word) {
    console.log(dict.indexOf(word));
  }

});
