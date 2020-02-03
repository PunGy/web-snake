import {
    Snake, Mouse
} from './objectControl'
import { GameControl } from './mapControl';

const gameControl = new GameControl();
const snake = new Snake();
const mouse = new Mouse();
snake.drawSnake();

document.addEventListener('keydown', (event) => {
    // if it is not a change direction click
    if (!snake.changeDirection(event)) {
        const { code } = event;
        if (code === 'Enter' && gameControl.state !== 'play') {
            startGame();
        } else if (code === 'Space') {
            if (gameControl.state === 'pause') startGame()
            else pauseGame();
        } else if (code === 'Escape') {
            resetGame();
        }
    }
})

let gameLoop = null;

function gameLoopFn() {
    const isSuccessfull = snake.move(mouse);
    if (!isSuccessfull) {
        gameOver();
    }
    snake.drawSnake();
    snake.allowChangeDirection = true;
    if (snake.changeDirectionStack.length >= 1) {
        snake.changeDirectionStack.shift()();
    }
}

function resetMap() {
    snake.clearSnake();
    snake.constructor();
    snake.drawSnake();

    mouse.clearMouse();
    mouse.constructor();
}

function startGame() {
    if (gameControl.state === 'gameover') {
        resetMap();
    }

    gameLoop = setInterval(gameLoopFn, GameControl.gameLoopRefreshRate);
    gameControl.state = 'play';

    gameControl.startButtonElement.disabled = true;
    gameControl.pauseButtonElement.disabled = false;
    gameControl.resetButtonElement.disabled = false;
}
function pauseGame() {
    if (gameLoop) clearInterval(gameLoop);

    gameControl.state = 'pause';

    gameControl.startButtonElement.disabled = false;
    gameControl.pauseButtonElement.disabled = true;
}
function resetGame() {
    if (gameLoop) clearInterval(gameLoop);

    gameControl.state = 'begin';
    gameControl.score = 0;

    gameControl.startButtonElement.disabled = false;
    gameControl.pauseButtonElement.disabled = true;
    gameControl.resetButtonElement.disabled = true;

    resetMap();
}
function gameOver() {
    if (gameLoop) clearInterval(gameLoop);

    gameControl.pauseButtonElement.disabled = true;
    gameControl.resetButtonElement.disabled = true;
    gameControl.startButtonElement.disabled = false;

    gameControl.state = 'gameover';
    gameControl.score = 0;
}

gameControl.pauseButtonElement.disabled = true;
gameControl.resetButtonElement.disabled = true;

gameControl.startButtonElement.addEventListener('click', startGame)
gameControl.pauseButtonElement.addEventListener('click', pauseGame)
gameControl.resetButtonElement.addEventListener('click', resetGame)
