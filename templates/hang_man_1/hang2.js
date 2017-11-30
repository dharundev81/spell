(function () {
    var app = angular.module('starter');
    var hangmanController1 = function ($scope,$state) {

 // console.log(localStorage.getItem("adddetail"));

$(document).ready(function(){
        function hideHangMan(){
          $(".verline").hide();
          $(".nosnik").hide();
          $(".hornline").hide();
          $(".provaz").hide();
          $(".hlava").hide();
          $(".telo").hide();
          $(".pruka").hide();
          $(".lruka").hide();
          $(".lnoha").hide();
          $(".pnoha").hide();
        }
        hideHangMan();
        $("#reset").hide();
        $("#next").hide();
        $(".win").hide();
        $(".lose").hide();
        
        $("#letterIn").focus();
        
        var questions = [
          {question:"NATIONAL GAME", answer:"HOCKEY"}
        ];
        
        var answerQueue = [];
        var hangMan = 0;
        
        var numOfQuestion = Math.floor(Math.random()*questions.length);
        for(var i = 0; i < questions[numOfQuestion].answer.length; i++){
          if(questions[numOfQuestion].answer[i] == " "){
            $(".tajenka").append("<div class=\"space\"></div>");
          } else {
            $(".tajenka").append("<div id=\"taj"+ i +"\" class=\"letter\"></div>");
          }
        }
        $(".otazka").html(questions[numOfQuestion].question);
        answerQueue.push(questions[numOfQuestion].answer);
        var actualIndex = 0;
        var badLetters = [];
        var score = 0;
        var rightLetters = [];
        var finalScore = answerQueue[actualIndex].replace(/\s/g, "").length;
        
        $("#guess").on("click",function(){
          if($("#letterIn").val() && rightLetters.indexOf($("#letterIn").val().toUpperCase()) === -1 && 
        badLetters.indexOf($("#letterIn").val().toUpperCase()) === -1 && score != finalScore &&
        $("#letterIn").val() != " " && hangMan != 10){
            var input = $("#letterIn").val().toUpperCase();
            var pos = answerQueue[actualIndex].indexOf(input);
            if(pos === -1){
              $(".badLetters").append(input+" ");
              badLetters.push(input);
              var selector = ++hangMan;
              switch(hangMan){
                case 1: selector = ".verline"; break;
                case 2: selector = ".nosnik"; break;
                case 3: selector = ".horline"; break;
                case 4: selector = ".provaz"; break;
                case 5: selector = ".hlava"; break;
                case 6: selector = ".telo"; break;
                case 7: selector = ".pruka"; break;
                case 8: selector = ".lruka"; break;
                case 9: selector = ".lnoha"; break;
                case 10: selector = ".pnoha"; break;
              }
              if(selector == ".nosnik"){
                $(".horline").hide();
              }
              $(selector).fadeIn();
              if(hangMan == 10){
                $("#reset").fadeIn();
                $(".lose").fadeIn();
              }
            }
            else {
              while(pos !== -1){
                score++;
                $("#taj"+pos).append(input);
                pos = answerQueue[actualIndex].indexOf(input, pos + 1);
              }
              rightLetters.push(input);
            }
            if(score == finalScore){
              $("#next").fadeIn();
            }
          }
          $("#letterIn").val("");
          $("#letterIn").focus();
        });
        $("#next").on("click", function(){
          $("#next").hide();
          if(answerQueue.length == questions.length){
            $(".win").fadeIn();
            $("#reset").fadeIn();
          } else {
            score = 0;
            hangMan = 0;
            hideHangMan();
            numOfQuestion = Math.floor(Math.random()*questions.length);
            while(answerQueue.indexOf(questions[numOfQuestion].answer) !== -1){
              numOfQuestion = Math.floor(Math.random()*questions.length);
            }
            answerQueue.push(questions[numOfQuestion].answer);
            actualIndex++;
            badLetters = [];
            rightLetters = [];
            $(".badLetters").html("");
            $(".otazka").html(questions[numOfQuestion].question);
            $(".tajenka").html("");
            for(var i = 0; i < questions[numOfQuestion].answer.length; i++){
              if(questions[numOfQuestion].answer[i] == " "){
                $(".tajenka").append("<div class=\"space\"></div>");
              } else {
                $(".tajenka").append("<div id=\"taj"+ i +"\" class=\"letter\"></div>");
              }
            }
            finalScore = answerQueue[actualIndex].replace(/\s/g, "").length;
          }
          $("#letterIn").val("");
          $("#letterIn").focus();
        });
        $("#reset").on("click", function(){
          $("#reset").hide();
          $(".lose").hide();
          $(".win").hide();
          score = 0;
          hangMan = 0;
          hideHangMan();
          numOfQuestion = Math.floor(Math.random()*questions.length);
          answerQueue = [];
          answerQueue.push(questions[numOfQuestion].answer);
          actualIndex= 0;
          badLetters = [];
          rightLetters = [];
          $(".badLetters").html("");
          $(".otazka").html(questions[numOfQuestion].question);
          $(".tajenka").html("");
          for(var i = 0; i < questions[numOfQuestion].answer.length; i++){
            if(questions[numOfQuestion].answer[i] == " "){
              $(".tajenka").append("<div class=\"space\"></div>");
            } else {
              $(".tajenka").append("<div id=\"taj"+ i +"\" class=\"letter\"></div>");
            }
          }
          finalScore = answerQueue[actualIndex].replace(/\s/g, "").length;
          $("#letterIn").val("");
          $("#letterIn").focus();
        });
      });

    };
    app.controller("hangmanController1", hangmanController1);
}());