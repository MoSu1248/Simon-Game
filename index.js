let number;  

let buttonColours = ["red", "blue", "green", "yellow"]

let gamePattern = []

let userClickedPattern = [];

let level = 0; 

let started = false; 

$(".btn").click(function () {
    
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour); 

    $(`.${userChosenColour}`).addClass("blink")
    setTimeout(() => {
    $(`.${userChosenColour}`).removeClass("blink")

    }, 800);
  
    playSound(userChosenColour); 

    lastIndex = userClickedPattern.length - 1
    
    checkAnswer(lastIndex); 
  
})

function nextSequence() {
    
userClickedPattern = [];

level++;
   
    number = Math.floor(Math.random() * 4)
    gamePattern.push(buttonColours[number])
    let randomChosenColour = buttonColours[number];

    $(`.${randomChosenColour}`).addClass("blink")
    setTimeout(() => {
    $(`.${randomChosenColour}`).removeClass("blink")

    }, 800);
  
    playSound(randomChosenColour); 

    document.getElementById('level-title').innerHTML = `Level ${level}`

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

        let wrong = new Audio("sounds/wrong.mp3")
        wrong.play(); 

        $(`.someclass`).addClass("game-over"); 
        setTimeout(() => {
        $(`.someclass`).removeClass("game-over"); 
        }, 200);
        
        document.getElementById('level-title').innerHTML = `Game Over, Press Any Key To Restart`
        startOver(); 
    }

}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

addEventListener("keypress", function () {

    if (!started) {
        document.getElementById('level-title').innerHTML = `Level ${level}`
        nextSequence(); 
        started = true; 
    }

})


function startOver() {
    level = 0;    
    gamePattern = []
    started = false; 
}