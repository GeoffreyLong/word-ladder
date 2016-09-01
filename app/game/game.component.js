angular.module('game').component('game', {
  templateUrl: 'game/game.template.html',
  controller: function GameController($scope, letterService, dictService){
    $scope.topLetters = letterService.initialSeed(9, 2);
    $scope.leftLetters = letterService.initialSeed(9, 2);
    $scope.rightLetters = letterService.initialSeed(9, 2);

    
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

    // TODO will need to doctor the letters on the side of the board as well...
    $scope.undo = function() {
      $scope.game.gameLetters.shift();
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
        curLetter = letters[letterIdx];

        // NOTE could probably remove this via hacks
        if (letterIdx == letters.length) break;
      }

      if (curWord.length < 3) {
        alert("Words have to be at least 3 letters");
        return false;
      }
      if (!dictService.checkWord(curWord)) {
        alert('"' + curWord + '" is not a word!');
        return false;
      }

      return true;
    }
  }
});
