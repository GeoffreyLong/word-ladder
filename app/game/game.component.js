angular.module('game').component('game', {
  templateUrl: 'game/game.template.html',
  controller: function GameController($scope){
    $scope.leftLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    $scope.topLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    $scope.rightLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    var current = {
      direction: 'right',
      offsetX: 4,
      offsetY: 7
    };
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
      console.log("hello");
      var curLetter = $scope.game.gameLetters[0];
      $('#gameBoard').css({
        'transform': 'translate(' + curLetter.offsetX * -50 + 'px, ' + (100 + curLetter.offsetY * 50) + 'px)'
      });
    }

    $scope.letterPressed = function(letter) {
      console.log(letter);
    };
  }
});
