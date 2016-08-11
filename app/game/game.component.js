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
    $scope.gameLetters = {
      enabled: [{
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
      }],
      disabled: [
        [{
          letter: 's',
          offsetX: 0,
          offsetY: 4
        }, {
          letter: 'e',
          offsetX: 1,
          offsetY: 4
        }, {
          letter: 'n',
          offsetX: 2,
          offsetY: 4
        }, {
          letter: 'd',
          offsetX: 3,
          offsetY: 4
        }], [{
          letter: 'r',
          offsetX: 1,
          offsetY: 5
        }, {
          letter: 'n',
          offsetX: 1,
          offsetY: 3
        }, {
          letter: 't',
          offsetX: 1,
          offsetY: 2
        }]
      ]
    };

    $scope.letterPressed = function(letter) {
      console.log(letter);
    };
  }
});
