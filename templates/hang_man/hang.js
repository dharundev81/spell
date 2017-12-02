(function () {
    var app = angular.module('starter');
    var hangmanController2= function ($route,$scope,$state,$window,$ionicPopup,apiFunc,$rootScope) {

$scope.win_values=0;



$scope.lose_values=0;

$scope.total_values=0;

      $route.reload();


$scope.$on('$ionicView.Beforeleave', function(){ //This just one when leaving, which happens when I logout
      $route.reload();
    });

  


 $scope.$on('$ionicView.enter', function(){
     
    });

var user_id=window.localStorage.getItem("user_id");
console.log(user_id);
      console.log(window.localStorage.getItem("hangman_score"));


// if(user_id=null || user_id==undefined){
//   $state.go('user_section.login');
// }
// console.log(localStorage.getItem('given_questions'));

// $rootScope.puzzle_list_array=localStorage.getItem('given_questions');
  

// $scope.$on('$ionicView.enter', function () {
               
// });


 // $scope.val=0;
//         $scope.increment=function()
//         {
// $scope.val+=1;

//         }
//         $scope.decrement=function()
//         {
// $scope.val-=1;

//         }
 // console.log(localStorage.getItem("adddetail"));


var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''),
    puzzle = '',
    puzzleLetterContainers = [],
    previouslyChosen = '',
    totalIncorrect = 0,
     index_value=0,
    remainingBlanks = 0,
    puzzleList = [
  "alphabet", "kitten", "blasphemy", "telephone", "sinkhole", "hammer", "technical", "banana", "elementary", "laptop", "excellent", "famous", "cheese", "actress", "landlord", "interest", "lipstick", "cardboard", "hungry", "inventory", "windblown", "attempt", "liquid", "tranquil", "effect", "alcohol", "strawberry", "clinic", "alchemy", "figure", "virtual", "melee", "gravity", "sugar", "piglet", "orange"
],

  puzzleList1 = [
  "alphabet1", "kitten1", "blasphemy1", "telephone1", "sinkhole1", "hammer1", "technical1", "banana1", "elementary1", "laptop1", "excellent1", "famous1", "cheese1", "actress1", "landlord1", "interest1", "lipstick1", "cardboard1", "hungry1", "inventory1", "windblown1", "attempt1", "liquid1", "tranquil1", "effect1", "alcohol1", "strawberry1", "clinic1", "alchemy1", "figure1", "virtual1", "melee1", "gravity1", "sugar1", "piglet1", "orange1"
],

    hangmanParts = [
      '<circle stroke-width="10" stroke-miterlimit="10" cx="254.404" cy="174.26" r="29.412"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="254.404" y1="203.672" x2="254.404" y2="314.056"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="255.339" y1="311.094" x2="185.875" y2="406.468"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="323.46" y1="406.468" x2="253.996" y2="311.094"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="254.404" y1="229.409" x2="164.11" y2="256.834"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="254.404" y1="229.409" x2="344.699" y2="256.834"/>',
'<circle fill="#000000" cx="243.663" cy="169.333" r="3.667"/>',
'<circle fill="#000000" cx="265.663" cy="169.333" r="3.667"/>',
'<path stroke-width="4" stroke-miterlimit="10" d="M245.571,190.082c0-4.879,3.955-8.833,8.833-8.833 c4.879,0,8.833,3.955,8.833,8.833"/>'
    ];



//add alphabet to div
alphabet.forEach((i) => {
    $('.hangman-letters').append(`<div>${i}</div>`);
  });

//set up initial puzzle
setUp();

$scope.new_game=function(){
}

//set up new puzzle when user clicks "start over"
$('#game-over-replay').click(function(){
  console.log('befrore',index_value);
  index_value++;
  
  setUp();
console.log('count',index_value);

var object3=$scope.total_values;
console.log(object3);
    localStorage.setItem('total', object3);
// newPuzzle();
    $route.reload();
  // $state.go($state.current, {}, {reload: true});
});

//use the function that checks letters, then disable that letter and check if gameover
$('.hangman-letters div').click(function(){
  var isCorrect = letterChosen(this.innerHTML);
  if(isCorrect) $(this).addClass('disabled correct');
  else $(this).addClass('disabled');
  if(remainingBlanks < 1) {
    gameOver(true);
  }
  if(totalIncorrect >= hangmanParts.length + 1) {
    gameOver(false);
  }
});

//functions

//wipe variables and containers and set up new game
function setUp(){
  $('.game-over').hide();
  puzzle = newPuzzle();
  puzzleLetterContainers = [];
  previouslyChosen = '';
  totalIncorrect = 0;
  remainingBlanks = puzzle.length;
  $('.hangman-puzzle').html('');
  $('#added-parts').html('');
  $('.hangman-letters div').each(function(){
    this.classList = '';
  })
  
  puzzle.split('').forEach((i) => {
    var thisClass = "hangman-puzzle-letters";
    if(i == ' ') {
      thisClass += ' space';
      remainingBlanks--;
    }
    $('.hangman-puzzle').append(`<div class="${thisClass}">&nbsp;</div>`);
  });
  puzzleLetterContainers = document.getElementsByClassName('hangman-puzzle-letters');
}

//check if the letter is correct, then add it to the board
function letterChosen(letter) {
  if(previouslyChosen.indexOf(letter) < 0) {
    previouslyChosen+=letter;
    var checkResults = checkLetter(puzzle, letter);
    if(checkResults) {
      checkResults.forEach(function(item) {
        puzzleLetterContainers[item].innerHTML = letter;
        remainingBlanks--;
      });
      return true;
    }
    else {
      wrongAnswer(letter);
      return false;
    } 
  }
}

//check submitted letter against puzzle and return false or every index of letter
function checkLetter(solution, thisLetter) {
  var indexes = [];
  solution.split('').forEach(function(item, index){
    if(item == thisLetter) {
      indexes.push(index);
    }
  });
  return indexes.length > 0 ? indexes : false;
}

//when answer is wrong, add to the hangman
function wrongAnswer(letter) {
  document.getElementById('added-parts').appendChild(parseSVG(hangmanParts[totalIncorrect]));
  totalIncorrect++;
}

//grab new puzzle from array
function newPuzzle() {


 

  var random =Math.random();
    console.log(random);
  var newPuzzle = puzzleList.splice(Math.floor(random*puzzleList.length), 1);
  var newPuzzle1 = puzzleList1.splice(Math.floor(random*puzzleList1.length), 1);


var hint_word=JSON.parse(localStorage.getItem('given_hint'));
  var word=JSON.parse(localStorage.getItem('given_word'));
  var id_value=JSON.parse(localStorage.getItem('id_arr'));
  var phonetics= JSON.parse(localStorage.getItem('phonetics'));

  console.log(hint_word);

console.log(word);

for (var i = 0; i < phonetics.length; i++) {
  // console.log;
  if(i == index_value){
  var pho=phonetics[i];
  console.log(pho);    
  }
}

for (var i = 0; i < hint_word.length; i++) {
  // console.log(i);
  if(i == index_value){
  var hint_value=hint_word[i];
  console.log(hint_value);    
  }
}


for (var i = 0; i < word.length; i++) {
  // console.log(i);
  if(i == index_value){
  var word_value=word[i];
  console.log(word_value);    
  }
}


for (var i = 0; i < id_value.length; i++) {
  // console.log(i);
  if(i == index_value){
  var id=id_value[i];
  console.log(id);    
  }
}

  var given_phonetics_words = phonetics.splice(Math.floor(random*phonetics.length), 1);

  var given_hint_words = hint_word.splice(Math.floor(random*hint_word.length), 1);

  var given_answer_words = word.splice(Math.floor(random*word.length), 1);

// var given_hint_words = new_val[Math.floor(random * new_val.length),1];
// var given_answer_words = new_vals[Math.floor(random * new_vals.length),1];

// console.log(given_answer_words[0]);
// console.log(given_hint_words[0]);

if(id==undefined){
  $state.go("user.home");
  }


  console.log(id);    
$scope.update_id=id;
console.log($scope.update_id);    

  $scope.myvalue=newPuzzle1;
  $scope.given_hint_word=given_hint_words;
  $scope.given_hint_word1=hint_value;
  $scope.given_phonetics_word=pho;
  $scope.given_ans_word=word_value;
  // console.log(newPuzzle[0]);
  // console.log(newPuzzle1[0]);

  return word_value;    
}

//svg parser from stackoverflow so I can just append new shapes to existing svg
function parseSVG(s) {
  var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
  div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
  var frag= document.createDocumentFragment();
  while (div.firstChild.firstChild)
    frag.appendChild(div.firstChild.firstChild);
  return frag;
}


$scope.showAlert = function() {
            $ionicPopup.alert({
              title: 'you Lose',
              scope: $scope,
              content: `Answer: &nbsp <b>{{given_ans_word}}</b> <br>
                        Meaning: &nbsp <b>{{given_hint_word1}}</b> <br>
                        Phonetics: &nbsp <b>{{given_phonetics_word}}</b>`
            }).then(function(res) {
              document.getElementById('game-over-replay').click();
              console.log('You Lose');
            });
          };

          $scope.showAlert1 = function() {
            $ionicPopup.alert({
              title: 'you Won',
              scope:$scope,
              content: `Answer: &nbsp <b>{{given_ans_word}}</b> <br>
                        Meaning: &nbsp <b>{{given_hint_word1}}</b> <br>
                        Phonetics: &nbsp <b>{{given_phonetics_word}}</b>`
            }).then(function(res) {
              document.getElementById('game-over-replay').click();
              console.log('You Win');
            });
          };
//take true/false for win/lose and pop up the dialog/replay
function gameOver(won) {
  if(!won) {
$scope.showAlert();
    // $('.game-over-lost').show();
    // $('.game-over-won').hide();
    $('.hangman-puzzle-letters').each(function(index) {
      console.log($(this).html());
      if($(this).html() == "&nbsp;" && !$(this).hasClass("space")) {
        $(this).html(puzzle.charAt(index));
        // $(this).addClass('game-lost');
      }
    });
$scope.lose_values++;
$scope.total_values++;
var object1=$scope.lose_values;
  $scope.update_score($scope.win_values);
console.log(object1);
    localStorage.setItem('lose', object1);

  }
  else {  
    $scope.showAlert1();
  $scope.win_values++;
  var object=$scope.win_values;
  $scope.total_values++;
    $scope.update_score($scope.win_values);
  console.log(object);
    localStorage.setItem('win', object);
    


// Retrieve the object from storage

    // $('.game-over-lost').hide();
    // $('.game-over-won').show();
  }
  // $('.game-over').show();
}







$scope.win_values=localStorage.getItem('win');  

$scope.lose_values=localStorage.getItem('lose');  

$scope.total_values=localStorage.getItem('total');  



$scope.update_score=function(obj){

  if($scope.win_values)

  var post_data=
   {
 "spell_id":window.localStorage.getItem("user_id"),
 "hangman_score":obj,
 "question_id":$scope.update_id
  }

  console.log(post_data);
   apiFunc.update_score(post_data).then(function (data) {
       console.log(data);
       if(data.status==7400){
       }else{
  MessageNotify(data.message)
       }
   },function (error) {
       // body...
   });
}

// console.log(localStorage.getItem('win'));
// console.log(localStorage.getItem('lose'));
// console.log(localStorage.getItem('total'));
 
// console.log($scope.win_values);
// console.log($scope.lose_values);
// console.log($scope.total_values);

    };
    app.controller("hangmanController2", hangmanController2);
}());