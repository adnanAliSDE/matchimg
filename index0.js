// scoring logic
const submitBtn = document.querySelector(".btn");
const entriesSection = document.querySelector(".entries");
const statusBar = document.querySelector(".status");
const board = document.querySelector(".board");

/*Pseudo code
1. Home ->take level-> startButton ->startGame

// Helper functions
def shuffledImages(imgSrc):
    return shuffled array;

def initGameBoard():
    set every item src image -> dummy.png

2. startGame
    time=0;
    score=0;
    generate shuffled array;
    init board() 
    checkWin()
        if win:
            alert("Hurray You won the game")
        else:
            alert "you lost"
            resetGame()
    updateTimeLeft
        if time === -1
            checkWin(score,time)

    updateScore
        updates the DOM
        checkWin(score,time)

    checkMove
        handleMove
        if matched -> done.png 
            updateScore
        else -> dummy.png
*/
