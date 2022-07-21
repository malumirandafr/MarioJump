
const mario = document.querySelector('.mario')

const pipe = document.querySelector('.pipe')

const gameover = document.querySelector('.gameover')

const floor = document.querySelector('.floor')

const info = document.querySelector('.info')

const points = document.querySelector('.points')
let contPoints
let positiveScore
let day = true

const display = document.querySelector('.time');

const gameboard = document.querySelector('.game-board')

var windowWidth = window.innerWidth;

var jump
var loop
var scored
var time

let pipeDistanceLeft = 120
let marioJumpHeight = 148
let marioDeathImageSize = '75px'
let marioDeathMarginLeft = '50px'
let classJump = 'jump'
let heightObjects = '68px'


function start() {
    contPoints = 0
    positiveScore = false

    pipe.classList.add('pipeanimation')


    if (windowWidth <= 950) {
        pipe.style.animation = `pipe-animation 1.0s infinite linear`
    }

    console.log(windowWidth)
    if (windowWidth <= 400) {
        pipe.style.width = '30px';
        pipe.style.height = '30px';
        pipe.style.bottom = '24px'

        mario.style.width = '60px';
        marioDeathImageSize = '30px';
        marioDeathMarginLeft = '22px'
        mario.style.bottom = '24px'

        pipeDistanceLeft = 50
        marioJumpHeight = 54

        classJump = 'jumpphone'

        floor.style.width = '600px'

        heightObjects = '20px'

        info.style.fontSize = '0.5em'

    }

    var timer = 0, minutes, seconds;
        time = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            timer++

        }, 1000);

    jump = () => {
        mario.classList.add(classJump)

        setTimeout(() => {
            mario.classList.remove(classJump)
        }, 500);
    }

    loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft

        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
        

        if (pipePosition <= pipeDistanceLeft && pipePosition > 0 && marioPosition < marioJumpHeight) {

            pipe.classList.remove('pipeanimation')

            pipe.style.left = `${pipePosition}px`

            mario.style.animation = 'none'

            mario.style.bottom = `${marioPosition}px`

            mario.src = './images/game-over.png'
            mario.style.width = marioDeathImageSize
            mario.style.marginLeft = marioDeathMarginLeft

            gameover.innerHTML = "GAME OVER"
            
            clearInterval(loop)
            clearInterval(time)
            clearInterval(scored)
        } else {
            if(pipePosition <= pipeDistanceLeft && pipePosition > 0 && marioPosition >= marioJumpHeight){
                positiveScore = true
            }
        }
    }, 10);


    scored = setInterval(() => {
        if (positiveScore) {
            contPoints++
            points.innerHTML = contPoints
            positiveScore = false
        }
    }, 1500);

}

const restart = () => {
    console.log('clicked')
    
    pipe.style.left = '100%'

    
    mario.style.marginLeft = '0px'
    mario.style.width = '150px'
    mario.style.bottom = heightObjects
    mario.src = 'imagens/mario.gif'
    mario.style.animation = ''

    gameover.innerHTML = ""
    points.innerHTML = "0"

    setTimeout(() => {
        start()
    }, 500);
    
}

start()

document.addEventListener('keydown', jump)

document.addEventListener('mousedown', jump)