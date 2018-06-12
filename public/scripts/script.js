var numSquares = 6;
var colors = [];
var pickedColor;
var maxScore = numSquares - 1;
var score = 0;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");
var resetButton = document.querySelector("#reset");
var scoreDisplay = document.querySelector("#scoreDisplay");
var quitButton = document.querySelector("#quit");
const remote = require('electron').remote;


init();

function init() {
    setupSquares();
    setupModeButtons();
    reset();
}


function setupSquares(){
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!"
                h1.style.backgroundColor = pickedColor;
                changeColors(clickedColor);
                resetButton.textContent = "Play Again?"
                score += maxScore;
                scoreDisplay.textContent = score;
                maxScore = 0;
            } else {
                messageDisplay.textContent = "Try again!"
                this.style.backgroundColor = "#232323";
                maxScore -= 1;
            }
        });
    }
}

function setupModeButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

function reset() {
    colors = generateColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        squares[i].style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors"
    messageDisplay.textContent = "";
    maxScore = numSquares - 1;
}


resetButton.addEventListener("click", function() {
    reset();
})

quitButton.addEventListener("click", function(){
   var window = remote.getCurrentWindow();
   window.close();
});


function generateColors(num) {
    var arr = []
    for (i = 0; i < num; i++) {
        arr.push(randomColors());
    }
    return arr;
}

function randomColors() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function changeColors(color) {
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}




