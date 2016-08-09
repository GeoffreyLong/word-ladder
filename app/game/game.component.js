angular.module('game').component('game', {
  templateUrl: 'game/game.template.html',
  controller: function GameController($scope){
    $scope.leftLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    $scope.topLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    $scope.rightLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // Orientation should always alternate
    // Shouldn't force the first word to be vertical...
    //    I could force it by populating the first word myself
    //    With something like "start"... that might be a good option!
    // The first word always comes first in the array
    $scope.gameLetters = [{
      orientation: 'v',
      word: 'hello'
    }, {
      orientation: 'h',
      word: 'game'
    ];

    $scope.letterPressed = function(letter) {
      console.log(letter);
    };
  }
});
