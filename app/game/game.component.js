angular.module('game').component('game', {
  templateUrl: 'game/game.template.html',
  controller: function GameController($scope){
    $scope.leftLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    $scope.topLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    $scope.rightLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // Orientation should always alternate
    // Force the first word to be vertical by prepopulating it
    // Data structure
    //    An array of objects, 
    //        the first object in array is the first to populate
    //        the last object in array is current.
    //        An even index is vertical, odd is horizontal
    //    letters:    The letters of the word
    //    lowerPivot: The index of the letter that connects to the previous word
    //                This is only -1 in the first case.
    //    upperPivot: The index of the letter that connects to the next word
    //                This is -1 until the word is 'solidified'
    //    curSelected:The index of the letter currently selected
    //                If another letter is selected that is not in the orientation
    //                  If the word is valid and the curSelected != lowerPivot 
    //                    the upperPivot becomes curSelected
    //                    TODO check the curSelected != lowerPivot
    //                       What if the new word starts from the very top
    //                       of an old word. Should I prevent continuing old words?
    //                       It certainly makes it easier, but is it best for the game?
    //                Then the pivot becomes the curSelected if the word is valid
    //                And you are on a new word, curSelected becomes -1
    // TODO I don't think this will work properly for quadruply connected letters
    //      I guess I could check if the upper pivot is one away from the lower
    //      Then there would be some clashing
    //      Else I could theorize an alternate data structure
    //          The first that comes to mind is a 2d array
    //              This gets tricky though because it is shifting and growing
    $scope.gameLetters = [{
      letters: ['s', 't', 'a', 'r', 't'],
      lowerPivot: -1,
      upperPivot: 4,
      curSelected: -1
    }, {
      letters: ['t', 'a', 'm', 'e'],
      lowerPivot: 0,
      upperPivot: 2,
      curSelected: -1
    }, {
      letters: ['m', 'e', 'a', 'n'], 
      lowerPivot: 0,
      upperPivot: -1,
      curSelected: 1
    }];

    $scope.letterPressed = function(letter) {
      console.log(letter);
    };
  }
});
