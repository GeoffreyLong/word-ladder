angular.module('game').component('game', {
  templateUrl: 'game/game.template.html',
  controller: function GameController($scope){
    $scope.leftLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    $scope.topLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    $scope.rightLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // Orientation should always alternate
    // Force the first word to be vertical by prepopulating it
    // Data structure
    //    TODO describe
    // TODO should reversed words count?
    //      perhaps this could be an "easy mode"
    // NOTE For this version I am doing non-overlapping letters for vertical
    //      When you start a new vertical word, it has it's last letter on old
    //      The current selected is always the last letter placed
    //      And once you have selected a direction (up, left, right)
    //        you can only add letters in that direction
    // ALTR I can do non-overlapping for vertical and overlapping for horiz
    //      This means that I have to add a cur selected
    $scope.game = {
      direction: 'up',
      gameLetters: [{
        letter: 'r',
        offsetX: 3,
        offsetY: 7
      }, {
        letter: 'e',
        offsetX: 3,
        offsetY: 6
      }, {
        letter: 'n',
        offsetX: 3,
        offsetY: 5
      }, {
        letter: 'd',
        offsetX: 3,
        offsetY: 4
      }, {
        letter: 'n',
        offsetX: 2,
        offsetY: 4
      }, {
        letter: 'e',
        offsetX: 1,
        offsetY: 4
      }, {
        letter: 's',
        offsetX: 0,
        offsetY: 4
      }, {
        letter: 't',
        offsetX: 0,
        offsetY: 3
      }, {
        letter: 'a',
        offsetX: 0,
        offsetY: 2
      }, {
        letter: 'r',
        offsetX: 0,
        offsetY: 1
      }, {
        letter: 't',
        offsetX: 0,
        offsetY: 0
      }]
    };

    // TODO position when the orientation changes
    $scope.positionBoard = function() {
      console.log("Board Repositioning");
      var curLetter = $scope.game.gameLetters[0];
      $('#gameBoard').css({
        'transform': 'translate(' + curLetter.offsetX * -50 + 'px, ' + (100 + curLetter.offsetY * 50) + 'px)'
      });
    }

    $scope.letterPressed = function(letter, dir) {
      var valid = true;
      var letters = $scope.game.gameLetters;
      var lastLetter = letters[0];
      var curLetter = {letter: letter};

      if (dir !== $scope.game.direction) {
        console.log("change");
        valid = false;

        if (isValid(letter, dir)) {
          valid = true;
          $scope.game.direction = dir;
          console.log($scope.game.direction);
        }
      }

      if (dir === 'up' && valid) {
        curLetter.offsetX = lastLetter.offsetX;
        curLetter.offsetY = lastLetter.offsetY + 1;
        letters.unshift(curLetter);
      }
      else if (dir === 'left' && valid) {
        curLetter.offsetX = lastLetter.offsetX - 1;
        curLetter.offsetY = lastLetter.offsetY;
        letters.unshift(curLetter);
      }
      else if (dir === 'right' && valid) {
        curLetter.offsetX = lastLetter.offsetX + 1;
        curLetter.offsetY = lastLetter.offsetY;
        letters.unshift(curLetter);
      }
      else {
        if (valid) {
          console.log("ERROR in direction");
        }
      }
    };

    var isValid = function(letter, dir) {
      var lastDir = $scope.game.direction;
      var letters = $scope.game.gameLetters;

      // Cannot double back
      if ((lastDir === "left" && dir === "right")
            || (lastDir === "right" && dir === "left")) {
        // TODO should probably just disable the buttons when going a direction
        alert("Cannot double back!");
        return false;
      }

      // Only need to check the most recent word
      var letterIdx = 0;
      var curLetter = letters[letterIdx];
      var curX = curLetter.offsetX;
      var curY = curLetter.offsetY;
      var curWord = "";
      while (curLetter.offsetX === curX || curLetter.offsetY === curY) {
        // Ensures that go left don't print backwards
        if (curLetter.offsetX < curX) {
          curWord = curLetter.letter + curWord;  
        }
        else {
          curWord += curLetter.letter;
        }
        letterIdx ++;
        curLetter = letters[letterIdx]
      }

      if (curWord.length < 3) {
        alert("Words have to be at least 3 letters");
        return false;
      }
      if (!isWord(curWord)) {
        alert('"' + curWord + '" is not a word!');
        return false;
      }

      return true;

      /* NOTE this has a bug if run for a bit (error when snaking letters)
       * Also, it is unnecessary since we only need to check the last word
      var curX = -1;
      var curY = -1;
      var curWord = "";
      var lastLetter = "";
      var valid = true;
      for (letterIdx in $scope.game.gameLetters) {
        var letter = $scope.game.gameLetters[letterIdx]
        if (curX === letter.offsetX || curY === letter.offsetY) {
          
          // Ensures that go left don't print backwards
          if (letter.offsetX < curX) {
            curWord = letter.letter + curWord;  
          }
          else {
            curWord += letter.letter;
          }
        }
        else {
          // NOTE temporary forced 3 letter words to avoid double back clusters
          if (curWord.length < 3 && curX != -1) {
            alert("Words have to be at least 3 letters");
            return false;
          }

          if (!isWord(curWord)) {
            alert('"' + curWord + '" is not a word!');
            return false;
          }

          // The first half of this statement is for words that go right
          // The second half checks ensures that ups don't get flagged in up-right-up
          //    In these, the transition is up-right-up, so the change in y will be 2
          if (letter.offsetX < curX && letter.offsetY < curY - 1) {
            curWord = letter.letter + lastLetter;  
          }
          else {
            curWord = lastLetter + letter.letter;
          }
          
          curX = letter.offsetX;
          curY = letter.offsetY;
        }

        lastLetter = letter.letter;
      }
      
      // NOTE the last word never gets checked in the above loop
      //      this is fine though, since it is the seed word "start"
      // console.log(curWord);

      return true;
      */
    }

    // TODO TODO TODO
    var isWord = function(word) {
      console.log(word);
      return true;
    }
  }
});
