(function () {
    var app = angular.module('starter');
    var loginctrl = function ($scope,$state,apiFunc,$ionicHistory,$ionicLoading,$ionicPopup) {

 console.log('asd');


if(window.localStorage.getItem("user_id")!=null){
  $state.go('user.home');
}

  console.log(window.localStorage.getItem("user_id"));

        $ionicHistory.clearCache();

        $ionicHistory.clearHistory();

        //localStorage.clear();

//   var user_id=window.localStorage.getItem("user_id");
// console.log(user_id);
//  if(user_id!='undefined' && user_id!=null && user_id!='' && user_id!=undefined)
//            {
//             console.log('login controller');
//                 if(window.localStorage.getItem('introScreen')=='undefined' || window.localStorage.getItem('introScreen')==null || window.localStorage.getItem('introScreen')=='' || window.localStorage.getItem('introScreen')==undefined){
//       window.localStorage.setItem('introScreen','1');
//       // $state.go('user.slider');
// }else{
//              $state.go('user.home');
//              }
//            }else{
//            }


$scope.login1=function(){

  $state.go('user.home');

}
 


$scope.login=function(spell_bee_id){

  console.log(spell_bee_id);


var data= {
  "spell_bee_id":spell_bee_id
};

 $ionicLoading.show({template: '<ion-spinner class="spinner-energized"></ion-spinner>'});
                  apiFunc.login(data).then(function(result){
                console.log(result);
                    var response=result.response;
                    console.log(response);
                    if(result.status==7400){
                  $ionicLoading.hide();
                        window.localStorage.setItem('user_id',response.spell_bee_id);
                        window.localStorage.setItem('userDetails',JSON.stringify(response));
                        window.localStorage.setItem('level',response.level);
                        window.localStorage.setItem('hangman_score',response.hangman_score);
                        window.localStorage.setItem('quizz_score',response.quizz_score);
             $state.go('user.home');
             //$scope.get_questions_values();
                    }else{
                      //$scope.showAlert(result.message);
                      showAlert(result.message);
                    }
                  },
                  function(err){
                      console.log(err);
                  }
                  );
            }

//login-function

  $scope.get_questions_values=function(obj){
  
   //  var post_data=
   //   {
   // "level":obj,
   //  }
  
    var obj ={
       "spell_bee_id": window.localStorage.getItem("user_id"),
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
         var hint_arr=hint_val.split(',');
  
           var word_val= given_response[0].word;
         console.log(typeof(word_val));
         var word_arr=word_val.split(',');
  
  
           var id_arr= given_response[0].id_arr;
         console.log(typeof(id_arr));
         var id_arr=id_arr.split(',');
         
        localStorage.setItem('given_hint',JSON.stringify(hint_arr));
        localStorage.setItem('given_word',JSON.stringify(word_arr));
        localStorage.setItem('id_arr',JSON.stringify(id_arr));
    
        console.log(localStorage.getItem('given_hint'));
        console.log(localStorage.getItem('given_word'));
        console.log(localStorage.getItem('id_arr'));
    
    $state.go('user.hang');
      //document.getElementById("hangman").innerHTML='<object type="type/html" data="templates/hang_man/hang.html" ></object>';
  
         // console.log($rootScope.puzzle_list_array);
  
         // var  given_response=$rootScope.puzzle_list_array;
         // $rootScope.puzzle_list_array=given_response;
  
        // console.log(given_response);
        
          
            // localStorage.setItem('given_questions',JSON.stringify(given_response));
        
        
        // console.log(localStorage.getItem('given_questions'));
        
        
        // $rootScope.puzzle_list_array=localStorage.getItem('given_questions');  
        
        // console.log($rootScope.puzzle_list_array);
        
        // console.log(JSON.stringify(given_questions));
        
  
     },function (error) {
         // body...
     });
  }

  //login-function-end
  

 $scope.exit=function(){ 
    // window.localStorage.removeItem('user_id');
    //                   window.localStorage.removeItem('userDetails');
ionic.Platform.exitApp();
        };


    };
    app.controller("loginctrl", loginctrl);
}());