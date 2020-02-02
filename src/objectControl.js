import {
    getCoordinatesFromRange,
    hasColisions,
    GameControl,
} from './mapControl'

const defaultSnakeWidth = 3;

const gameControl = new GameControl();
export class Snake {
    constructor() {
        // get xy for head
        const headCoordinates = getCoordinatesFromRange({
            XMin: GameControl.lowestIndex + defaultSnakeWidth,
        });
        // generate coordinates for body of snake
        const snakeBodyCoordinates = [
            { x: headCoordinates.x, y: headCoordinates.y },
            { x: headCoordinates.x - 1, y: headCoordinates.y },
            { x: headCoordinates.x - 2, y: headCoordinates.y },
        ];

        this.bodyCoordinates = snakeBodyCoordinates;

        this.direction = 'right';
        this.changeDirectionStack = [];
    }
    getBodyCells() {
        return (
            this.bodyCoordinates.map(crns => (
                gameControl.getCell(crns)
            ))
        );

    }
    clearSnake() {
        // get cells from coordinates
        const snakeBodyCells = this.getBodyCells();
        snakeBodyCells.forEach((cell, i) => {
            if (i === 0) cell.classList.remove('snakeHead')
            else cell.classList.remove('snakeBody')
        })
    }
    drawSnake() {
        // get cells from coordinates
        const snakeBodyCells = this.getBodyCells();
        // mark cells as snake
        snakeBodyCells.forEach((cell, i) => {
            if (i === 0) cell.classList.add('snakeHead')
            else cell.classList.add('snakeBody')
        });
    }

    getNextHeadCoordinates() {
        const head = this.bodyCoordinates[0];
        switch(this.direction) {
            // if current head is on border 
            case 'right':
                return {
                    x: head.x === GameControl.mapSize - 1 ? GameControl.lowestIndex : head.x + 1,
                    y: head.y,
                };
            case 'left':
                return {
                    x: head.x === 0 ? GameControl.mapSize - 1 : head.x - 1,
                    y: head.y,
                };
            case 'up':
                return {
                    x: head.x,
                    y: head.y === 0 ? GameControl.mapSize - 1 : head.y - 1,
                };
            case 'down':
                return {
                    x: head.x,
                    y: head.y === GameControl.mapSize - 1 ? GameControl.lowestIndex : head.y + 1,
                }
        }
    }
    changeDirection(event) {
        if (!this.allowChangeDirection) {
            this.changeDirectionStack.push(() => this.changeDirection(event));
            return;
        }
        const { code } = event;
    
        if (code === 'ArrowLeft' && this.direction !== 'right') this.direction = 'left'
        else if (code === 'ArrowRight' && this.direction !== 'left') this.direction = 'right'
        else if (code === 'ArrowUp' && this.direction !== 'down') this.direction = 'up'
        else if (code === 'ArrowDown' && this.direction !== 'up') this.direction = 'down'
        this.allowChangeDirection = false;
    }
    move(mouse) {
        const { bodyCoordinates } = this;
        const nextHeadCoordinates = this.getNextHeadCoordinates();
        const currentHeadCell = gameControl.getCell(bodyCoordinates[0]);
        const tailCoordinates = Object.assign({}, bodyCoordinates[bodyCoordinates.length - 1]);
        
        if (gameControl.getCell(nextHeadCoordinates).classList.contains('snakeBody')) return false;

        const isCanEat = hasColisions(bodyCoordinates[0], mouse.coordinates)

        for (let i = bodyCoordinates.length - 1; i >= 1; i--) {
            Object.assign(bodyCoordinates[i], bodyCoordinates[i - 1]);
        }
        Object.assign(bodyCoordinates[0], nextHeadCoordinates)
        currentHeadCell.classList.remove('snakeHead')

        if (!isCanEat) {
            gameControl.getCell(tailCoordinates).classList.remove('snakeBody');
        }

        if (isCanEat) {
            bodyCoordinates.push(tailCoordinates);
            currentHeadCell.classList.remove('mouse');
            mouse.coordinates = Mouse.spawnMouse();
        }
        return true;
    }
}

export class Mouse {
    static spawnMouse() {
        let mouseCoordinates = getCoordinatesFromRange();
        let mouseCell = gameControl.getCell(mouseCoordinates);
        while (mouseCell.classList.contains('snakeBody', 'snakeHead')) {
            mouseCoordinates = getCoordinatesFromRange();
            mouseCell = gameControl.getCell(mouseCoordinates);
        }
        mouseCell.classList.add('mouse');

        return mouseCoordinates
    }
    clearMouse() {
        gameControl.getCell(this.coordinates).classList.remove('mouse')
    }

    constructor() {
        const coordinates = Mouse.spawnMouse()

        this.coordinates = coordinates;
    }
}
