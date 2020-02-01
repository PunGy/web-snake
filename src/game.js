import {
    Snake, Mouse
} from './objectControl'

const snake = new Snake();
const mouse = new Mouse();
snake.drawSnake();

document.addEventListener('keydown', snake.changeDirection.bind(snake))

const gameLoop = setInterval(gameLoopFn, 100);

function gameLoopFn() {
    const isSuccessfull = snake.move(mouse);
    if (!isSuccessfull) {
        alert('GAME OVER');
        clearInterval(gameLoop);
    }
    snake.drawSnake();
    snake.allowChangeDirection = true;
    if (snake.changeDirectionStack.length >= 1) {
        snake.changeDirectionStack.shift()();
    }
}
