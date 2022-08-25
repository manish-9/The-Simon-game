// variables
var buttonColors = ["red", "blue", "green", "yellow"];

var colorHistory = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// flash items on load
$(".gameStatus").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
setTimeout(function () {
  $("button").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}, 1000);

//initial color and action for game...
$(document).keypress(function () {
  if (!started) {
    nextColorSequence();
    started = true;
  }
});

$("button").click(function () {
  var currentColor = $(this).attr("id");
  userClickedPattern.push(currentColor);

  $("#" + currentColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(currentColor);
  animatePress(currentColor);
  checkAnswer(userClickedPattern.length - 1);
});

//function to store previous click pattern and to decide new color...
function nextColorSequence() {
  userClickedPattern = [];

  var randButton = Math.floor(Math.random() * 4);

  var newColor = buttonColors[randButton];
  colorHistory.push(newColor);

  level++;
  $(".gameStatus")
    .text("Level " + level)
    .fadeOut(100)
    .fadeIn(100);

  setTimeout(function () {
    $("#" + newColor)
      .fadeOut(100)
      .fadeIn(100);
  }, 1200);

  // console.log(colorHistory);
}

function checkAnswer(currentIndex) {
  if (colorHistory[currentIndex] === userClickedPattern[currentIndex]) {
    // console.log("colors at index [" + currentIndex + "] of both user input array and game random array Match.");

    if (userClickedPattern.length === colorHistory.length) {
      setTimeout(function () {
        nextColorSequence();
      }, 900);
    }
  } else {
    // console.log("colors at index [" +currentIndex + "] of both user input array and game random array did NOT Match.");
    startAgain();
  }
}

// function to animate buttons on click event...
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// function to play sounds...
function playSound(soundName) {
  var sound = new Audio("sounds/" + soundName + ".mp3");
  sound.play();
}

// function to Restart game...
function startAgain() {
  
  $(".gameStatus").html(
    'Game Over! Click "<span class="btn gameStatus">Restart</span>" to Start Again'
  );

  playSound("wrong");

  $("body").addClass("gameOver");
  setTimeout(function () {
    $("body").removeClass("gameOver");
  }, 100);

  $("span.btn").click(function () {
    colorHistory = [];
    level = 0;
    started = false;
    nextColorSequence();
  });
}
