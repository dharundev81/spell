(function () {

var app = angular.module('starter');

var question= function($route,$ionicModal,$scope,$cordovaBarcodeScanner,$timeout,apiFunc,$rootScope,$state,$ionicPopup){


    $scope.$on('$ionicView.leave', function(){ //This just one when leaving, which happens when I logout
      $route.reload();
    });

 $scope.level= window.localStorage.getItem("level")
 $scope.score_value =localStorage.getItem('quizz_score');
     
  console.log(localStorage.getItem('quizz_score'));


  console.log(window.localStorage.getItem("user_id"));


$ionicModal.fromTemplateUrl('templates/question/my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });




   $scope.openModal = function() {
    $ionicPopup.alert({
        title: 'you Lose',
        content: 'Try Again Next time'
      }).then(function(res) {
        $scope.go_back();
      });
   };
	
   $scope.closeModal = function() {
      $scope.modal.hide();
   };



   $ionicModal.fromTemplateUrl('templates/question/correct.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modall) {
      $scope.correct_modal = modall;
   });




   $scope.correct_openModal = function() {
      $scope.correct_modal.show();
   };
	
   $scope.correct_closeModal = function() {
      $scope.correct_modal.hide();
   };



   $ionicModal.fromTemplateUrl('templates/question/wrong.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modalll) {
      $scope.wrong_modal =modalll;
   });




   $scope.wrong_openModal = function() {
      $scope.wrong_modal.show();
   };
	
   $scope.wrong_closeModal = function() {
      $scope.wrong_modal.hide();
   };

   $scope.go_back1=function(){
    //var promise = $timeout(getRestDataFromServer, 2000);
    $scope.$on('$destroy', function(){
        $timeout.cancel(mytimeout);
    });
        $scope.modal.hide();
  $state.go('user.home');
  }

  $scope.go_about=function(){
    //var promise = $timeout(getRestDataFromServer, 2000);
    $scope.$on('$destroy', function(){
        $timeout.cancel(mytimeout);
    });
        $scope.modal.hide();
  $state.go('user.about');
  }

  $scope.go_leaderboard=function(){
    //var promise = $timeout(getRestDataFromServer, 2000);
    $scope.$on('$destroy', function(){
        $timeout.cancel(mytimeout);
    });
        $scope.modal.hide();
  $state.go('user.leaderboard');
  }

  /*window.onhashchange = function() {
    $scope.modal.hide();
    $state.go('user.home');
   }*/

$scope.go_back=function(){
      $scope.modal.hide();
$state.go('user.home');
}


    $scope.counter = 60;
    $scope.onTimeout = function(){
        // if ($scope.counter > 0) $scope.counter--;
        // 
        // mytimeout = $timeout($scope.onTimeout,1000);
        if ($scope.counter > 0) {
        	$scope.counter--;
        	mytimeout = $timeout($scope.onTimeout,1000);
        }else if($scope.counter ==0){


    $scope.openModal();

           /* $scope.showAlert = function() {
            $ionicPopup.alert({
              title: 'you Lose',
              content: 'Try Again Next time'
            }).then(function(res) {
              document.getElementById('game-over-replay').click();
              console.log('You Lose');
            });
          };*/

        	//console.log("counter ends");
        	// $scope.counter = 60;
        	// mytimeout = $timeout($scope.onTimeout,1000);
        	// $scope.quizz_index++;
        	
        }
    }
    var mytimeout = $timeout($scope.onTimeout,1000);

console.log('asd');


        console.log($rootScope.questions);





  $scope.quizz_index = 0;

    $scope.meal = {};
$scope.score= 0;
// $scope.score_value=0;
$scope.question_level= 1;


$scope.correcting_values=function(obj,obj1,obj2){

        // console.log($rootScope.questions);
 console.log(obj1);
 console.log(obj2);

 console.log(obj.id);	
 $scope.question_id=obj.id;
 console.log($scope.quizz_index);

 // $scope.question_level=parseInt($scope.question_level)+parseInt($scope.quizz_index);

 console.log($scope.question_level);

    $scope.counter = 60;
if($scope.quizz_index == $rootScope.questions.length - 1){
$scope.openModal();
	// $state.go('user.home');
}else{
	console.log('polam');
}

 console.log($rootScope.questions.length-1);

          if ($scope.quizz_index < $rootScope.questions.length) {
            //$scope.quizz_index = 0;
            $scope.quizz_index++;

        } else {
         console.log($scope.quizz_index);
        }
      

 if(obj1==obj2){
 	$scope.score=parseInt($scope.score_value)+parseInt(obj.point);
console.log($scope.score);
var score_card=$scope.score;

 localStorage.setItem('score_card',JSON.stringify(score_card));

  console.log(localStorage.getItem('score_card'));
$scope.score_value=localStorage.getItem('score_card');

$scope.update_score1(score_card);
  console.log('correct');
  $scope.toast();
      // $scope.correct_modal.show();
 }else{
      // $scope.wrong_modal.show();
var score_card="0";
$scope.update_score1(score_card);
   console.log('wrong');
   $scope.toast1();
 }
}

//toast
$scope.toast=function() {
  var x = document.getElementById("snackbar")
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  
}

$scope.toast1=function() {
  var x = document.getElementById("snackbar2")
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  
}
//toast-end


$scope.update_score1=function(score){

  var post_data=
   {
 "spell_id":window.localStorage.getItem("user_id"),
 "quizz_score":score,
 "question_id":$scope.question_id
  }

  console.log(post_data);
   apiFunc.update_score1(post_data).then(function (data) {
       console.log(data);
       if(data.status==7400){
       }else{
          MessageNotify(data.message)
       }
   },function (error) {
       // body...
   });
}

};

app.controller("question",question);
}());