angular.module('letter').component('letter', {
  // FACT if I pass data in, 
  //      passing letterInfo on template doesn't work (needs to be lower case)
  //      if I pass letter-info in, the binding is letterInfo
  bindings: {
    letterInfo: '=',
  },
  templateUrl: 'letter/letter.template.html',
  controller: function LetterController($scope, $element){
    $scope.letter = this.letterInfo.letter;

    // NOTE doing the css like this might be "hacky"
    //      I should figure out a better way of manipuation
    $element.css({
      'position': 'absolute',
      'top': this.letterInfo.offsetY * -50,            
      'left': this.letterInfo.offsetX * 50
    });
  }
});
