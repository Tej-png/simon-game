var buttonColors = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

document.addEventListener("keydown", (e) => {
  var gameTitle = document.querySelector(".line-title");
  gameTitle.innerHTML = "level " + level;
  if (!started) {
    nextSequence();
    started = true;
  }
});

var btns = document.querySelectorAll(".btn");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function (e) {
    var userChooseColour = e.target.id;
    userClickedPattern.push(userChooseColour);
    playSound(userChooseColour);
    e.target.classList.add("pressed");
    checkSequence(userClickedPattern.length - 1);
    setTimeout(function () {
      e.target.classList.remove("pressed");
    }, 100);
  });
}

function nextSequence() {
  userClickedPattern = [];
  var gameTitle = document.querySelector(".line-title");
  gameTitle.innerHTML = "level " + level;
  level++;
  var randomNum = Math.round(Math.random() * 3);
  var randomChoosenColor = buttonColors[randomNum];
  gamePattern.push(randomChoosenColor);
  animateBtn(randomChoosenColor);
}

function checkSequence(currenLevel) {
  if (gamePattern[currenLevel] === userClickedPattern[currenLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var body = document.querySelector("body");
    var gameTitle = document.querySelector(".line-title");
    gameTitle.innerHTML = "Game Over, Press Any Key to Restart";
    body.classList.add("game-over");
    setTimeout(function () {
      body.classList.remove("game-over");
    }, 200);
    playSound("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function animateBtn(selecedBtn) {
  var activeBtn = document.getElementById(selecedBtn);
  var activeBtn = document.querySelector("." + selecedBtn);
  activeBtn.classList.add("clicked");

  playSound(activeBtn.id);
  setTimeout(function () {
    activeBtn.classList.remove("clicked");
  }, 100);
}

function playSound(selectedColor) {
  switch (selectedColor) {
    case "blue":
      var blue = new Audio("./sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("./sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("./sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("./sounds/yellow.mp3");
      yellow.play();
      break;
    case "wrong":
      var wrong = new Audio("./sounds/wrong.mp3");
      wrong.play();
      break;

    default:
      break;
  }
}
