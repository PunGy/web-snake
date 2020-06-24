import {
    hasColisions,
    GameControl,
} from './mapControl'

const defaultSnakeWidth = 3;

const EMPTY = 0
const SNAKE_HEAD = 1
const SNAKE_BODY = 2
const MOUSE = 3
const WALL = 4

const SNAKE_HEAD_COLOR = '#8e0000'
const SNAKE_BODY_COLOR = 'red'
const MOUSE_COLOR = 'blue'
const WALL_COLOR = 'black'

const gameControl = new GameControl();
export class Snake {
    constructor() {
        // get xy for head
        const headCoordinates = gameControl.getCoordinatesFromRange({
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
        this.bodyCoordinates.forEach((crns) => {
            gameControl.clearCell(crns)
        })
    }
    drawSnake() {
        this.bodyCoordinates.forEach((crns, i) => {
            if (i === 0) gameControl.drawCell(crns, SNAKE_HEAD_COLOR, SNAKE_HEAD)
            else gameControl.drawCell(crns, SNAKE_BODY_COLOR, SNAKE_BODY)
        });
    }

    getNextHeadCoordinates() {
        const head = this.bodyCoordinates[0];
        const { width, height } = GameControl.getMapSize()
        switch(this.direction) {
            // if current head is on border 
            case 'right':
                return {
                    x: head.x === width - 1 ? GameControl.lowestIndex : head.x + 1,
                    y: head.y,
                };
            case 'left':
                return {
                    x: head.x === 0 ? width - 1 : head.x - 1,
                    y: head.y,
                };
            case 'up':
                return {
                    x: head.x,
                    y: head.y === 0 ? height - 1 : head.y - 1,
                };
            case 'down':
                return {
                    x: head.x,
                    y: head.y === height - 1 ? GameControl.lowestIndex : head.y + 1,
                }
        }
    }
    changeDirection(event) {
        const { code } = event;
        let direction = '';
    
        if (code === 'ArrowLeft' && this.direction !== 'right') direction = 'left'
        else if (code === 'ArrowRight' && this.direction !== 'left') direction = 'right'
        else if (code === 'ArrowUp' && this.direction !== 'down') direction = 'up'
        else if (code === 'ArrowDown' && this.direction !== 'up') direction = 'down'
        
        const isChangeDirection = direction !== ''
        if (isChangeDirection) {
            if (!this.allowChangeDirection) {
                this.changeDirectionStack.push(() => this.changeDirection(event));
                return false;
            }
            this.direction = direction;
            this.allowChangeDirection = false; 
        }
        return isChangeDirection;
    }
    move(mouse) {
        const { bodyCoordinates } = this;
        const nextHeadCoordinates = this.getNextHeadCoordinates();
        const currentHeadCoordinates = bodyCoordinates[0]
        const tailCoordinates = Object.assign({}, bodyCoordinates[bodyCoordinates.length - 1]);

        if (gameControl.getObject(nextHeadCoordinates) === SNAKE_BODY) return false;

        const isCanEat = hasColisions(currentHeadCoordinates, mouse.coordinates)

        for (let i = bodyCoordinates.length - 1; i >= 1; i--) {
            Object.assign(bodyCoordinates[i], bodyCoordinates[i - 1]);
        }
        Object.assign(bodyCoordinates[0], nextHeadCoordinates)
        gameControl.clearCell(currentHeadCoordinates, SNAKE_BODY)

        if (!isCanEat) {
            gameControl.clearCell(tailCoordinates);
        }

        if (isCanEat) {
            bodyCoordinates.push(tailCoordinates);
            mouse.coordinates = Mouse.spawnMouse();
            gameControl.score = gameControl.score + 1;
        }
        return true;
    }
}

export class Mouse {
    static spawnMouse() {
        let mouseCoordinates = gameControl.getCoordinatesFromRange();
        gameControl.drawCell(mouseCoordinates, MOUSE_COLOR, MOUSE);

        return mouseCoordinates
    }
    clearMouse() {
        gameControl.clearCell(this.coordinates)
    }

    constructor() {
        const coordinates = Mouse.spawnMouse()

        this.coordinates = coordinates;
    }
}
