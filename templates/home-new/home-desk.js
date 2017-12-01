(function () {
    var app = angular.module('starter');
    var hangmanController1 = function ($scope,$state,apiFunc,$rootScope,$ionicPopup) {

 console.log('asd');

if(window.localStorage.getItem("user_id")==null){
  $state.go('user_section.login');
}


 $scope.$on('$ionicView.enter', function(){ //This is fired twice in a row
      // $route.reload();
      $scope.leaderboard_list();
      // $scope.get_questions_for_user();
    });

$scope.leaderboard_list=function(){
   var obj ={
     "level": window.localStorage.getItem("level"),
  }
  console.log(obj)
   apiFunc.leaderboard_list(obj).then(function (data) {
    console.log(data);
    $scope.leaderboard_list_data=data.response;
    console.log($scope.leaderboard_list_data);


   },function (error) {
       // body...
   });
}

$scope.leaderboard_list();

//Quiz-LeaderBoard

$scope.leaderboard_list1=function(){
    var obj ={
      "level": window.localStorage.getItem("level"),
   }
   console.log(obj)
    apiFunc.leaderboard_list1(obj).then(function (data) {
     console.log(data);
     $scope.leaderboard_list_data1=data.response;
     console.log($scope.leaderboard_list_data);
 
 
    },function (error) {
        // body...
    });
 }
 
 $scope.leaderboard_list1();

$scope.get_questions_values=function(obj){

  var obj ={
     "spell_bee_id": window.localStorage.getItem("user_id"),
     "type":'hangman',
     "level": window.localStorage.getItem("level")
  }
   apiFunc.get_questions_for_user(obj).then(function (data) {
       console.log(data);
        localStorage.removeItem('lose');
        localStorage.removeItem('win');
        localStorage.removeItem('total');


       given_response =data.response;

       console.log(given_response[0].hint);
       
       var hint_val= given_response[0].hint;
       console.log(typeof(hint_val));
       var hint_arr=hint_val.split(',@');

         var word_val= given_response[0].word;
       console.log(typeof(word_val));
       var word_arr=word_val.split(',@');


         var id_arr= given_response[0].id_arr;
       console.log(typeof(id_arr));
       var id_arr=id_arr.split(',@');

       var phonetics= given_response[0].phonetics;
       console.log(typeof(phonetics));
       var phonetics=phonetics.split(',@');
       
        localStorage.setItem('given_hint',JSON.stringify(hint_arr));
        localStorage.setItem('given_word',JSON.stringify(word_arr));
        localStorage.setItem('id_arr',JSON.stringify(id_arr));
        localStorage.setItem('phonetics',JSON.stringify(phonetics));

        console.log(localStorage.getItem('given_hint'));
        console.log(localStorage.getItem('given_word'));
        console.log(localStorage.getItem('id_arr'));
        console.log(localStorage.getItem('phonetics'));

    $state.go('user.hang');

     
   },function (error) {
       // body...
   });
}

//Quiz

$scope.quizz_questions=function(){
  
   //  var post_data=
   //   {
   // "level":obj,
   //  }
  
    console.log("enter");

      var obj ={
          "spell_bee_id": window.localStorage.getItem("user_id"),
          "type":'quiz',
          "level": window.localStorage.getItem("level")
      }
      console.log(obj);
      apiFunc.get_questions_for_user1(obj).then(function (data) {
          console.log(data);
          if(data.status==7400){
              $rootScope.questions=data.response;
              console.log($rootScope.questions);
              localStorage.setItem('questions',JSON.stringify(data.response));
  
              var new_val =localStorage.getItem('questions');
              console.log(JSON.parse(new_val));
              $state.go('user.question');
          // $route.reload();
          }else{
      //MessageNotify(data.message)
        $scope.showAlert(data.message);
          }
      },function (error) {
          // body...
      });
}

$scope.showAlert = function(message) {
    var alertPopup = $ionicPopup.alert({
      title: 'Message',
      template: message
    });
    alertPopup.then(function(res) {
      console.log(message);
    });
  };
  
  
  $scope.leaderboard=function(obj){
  
   //  var post_data=
   //   {
   // "level":obj,
   //  }
  
  
      var obj ={
          "level": window.localStorage.getItem("level"),
      }
      console.log(obj);
      apiFunc.leaderboard_list1(obj).then(function (data) {
          console.log(data);
          if(data.status==7400){
          // $route.reload();
          $scope.leaderboard_data=data.response;
          }else{
      MessageNotify(data.message)
          }
      },function (error) {
          // body...
      });
  }

 //Quiz-END

 //Goback
 $scope.home=function(){
$state.go('user.home');
}
//Goback

 $scope.exit=function(){
//ionic.Platform.exitApp();
console.log("logout");
//$location.path('/user_section/login');
$state.go('user.login');
localStorage.clear();
        };
    };
    app.controller("hangmanController1", hangmanController1);
}());