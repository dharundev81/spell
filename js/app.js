// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngRoute','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });



  // $ionicPlatform.registerBackButtonAction(function(e){
  //     if ($rootScope.backButtonPressedOnceToExit) {
  //     //MessageNotify('kalai1');
  //       ionic.Platform.exitApp();
  //     }else if($ionicHistory.backView() && $state.current.name!='user.home') {
  //     //MessageNotify('kalai2');
  //       $ionicHistory.goBack();
  //     }else {
  //       if($state.current.name=='user.home'){
  //         $rootScope.backButtonPressedOnceToExit = true;
  //         MessageNotify("Press back button again to exit");
  //         //MessageNotify("Press back button again to exit");
  //         setTimeout(function(){
  //           $rootScope.backButtonPressedOnceToExit = false;
  //         },2000);
  //       }else{
  //         $rootScope.backButtonPressedOnceToExit = true;
  //         MessageNotify("Press back button again to exit");
  //         //MessageNotify("Press back button again to exit");
  //         setTimeout(function(){
  //           $rootScope.backButtonPressedOnceToExit = false;
  //         },2000);
  //       }
  //     }
  //     e.preventDefault();
  //     return false;
  //   },101);



})




.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.views.transition('none');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('user', {
      url: '/user',
      abstract: true,
     cache:false, 
      templateUrl: 'templates/login_user.html',
  })


 .state('user_section', {
      url: '/user_section',
      abstract: true,
     cache:false, 
      templateUrl: 'templates/user_section.html',
  })



  .state('user_section.login', {
    url: '/login',
    views: {
      'userContent_section': {
        templateUrl: 'templates/login/login.html'
      }
    }
  })


    .state('user.login', {
      url: '/login',
      views: {
        'userContent': {
          templateUrl: 'templates/login_form.html',
          //templateUrl: 'template1/login1.html',
          
        }
      },
      cache: false
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('user.home', {
    url: '/home',
    views: {
      'userContent': {
        templateUrl: 'templates/home/home.html'
      }
    }
  })

  .state('user.home-desk', {
    url: '/home-desk',
    views: {
      'userContent': {
        templateUrl: 'templates/home-new/home-desk.html'
      }
    }
  })

    .state('user.grade', {
    url: '/grade',
    views: {
      'userContent': {
        templateUrl: 'templates/home/grade.html'
      }
    }
  })


      .state('user.leaderboard', {
    url: '/leaderboard',
    views: {
      'userContent': {
        templateUrl: 'templates/home/leaderboard.html'
      }
    }
  })
  

    .state('user.about', {
    url: '/about',
    views: {
      'userContent': {
        templateUrl: 'templates/about/about.html'
      }
    }
  })

   .state('user.hang_man2', {
    url: '/hang_man2',
    views: {
      'userContent': {
        templateUrl: 'templates/hang_man/hang_man.html'
      }
    }
  })


.state('user.hang_man1', {
    url: '/hang_man1',
    views: {
      'userContent': {
        templateUrl: 'templates/hang_man/hang_man.html'
      }
    }
  })

.state('user.hang', {
    url: '/hang',
    views: {
      'userContent': {
        templateUrl: 'templates/hang_man/hang.html'
      }
    }
  })
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  //Quizz
  .state('user.question', {
    url: '/question',
    views: {
      'userContent': {
        templateUrl: 'templates/question/question.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/user_section/login');
});
