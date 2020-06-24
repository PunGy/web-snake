export function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function hasColisions(coordinates1, coordinates2) {
    return (
        coordinates1.x === coordinates2.x
        && coordinates1.y === coordinates2.y
    )
}

// Singleton class of game map
export class GameControl {
    static _instance = null;
    static cellSize = 20; // size of cell in pixel
    static lowestIndex = 0;
    static gameLoopRefreshRate = 100;
    static backgroundColor = '#eeeeee';
    static mapWidthPX = 500;
    static mapHeightPX = 500;

    constructor() {
        if (GameControl._instance != null) return GameControl._instance;

        this.gameMapElement = document.getElementById('gameMap');
        this.scoreElement = document.getElementById('score');
        this.resetButtonElement = document.getElementById('resetButton');
        this.pauseButtonElement = document.getElementById('pauseButton');
        this.startButtonElement = document.getElementById('startButton');
        this.gameStateMessageElement = document.getElementById('gameStateMessage');

        this.gameMapElement.width = GameControl.mapWidthPX
        this.gameMapElement.height = GameControl.mapHeightPX

        const { width, height } = GameControl.getMapSize()
        this.gameMap = Array.from({ length: width }, () => Array(height).fill(0));
        
        this._score = 0;
        // states: pause|play|begin|gameover
        this._state = 'begin';
        
        this.ctx = this.gameMapElement.getContext('2d');

        // fill game map
        this.drawBackground();

        GameControl._instance = this;
    };
    get state() {
        return this._state;
    }
    set state(nextState) {
        let message;
        switch (nextState) {
            case 'pause':
                message = 'Game was stoped';
                break;
            case 'play':
                message = 'Play';
                break;
            case 'begin':
                message = 'Start game';
                break;
            case 'gameover':
                message = `You are lose. Your score is ${this.score}`;
                break;
            default:
                message = 'Undefined state';
                console.error('Undefined state: ', this.state);
        }
        this.gameStateMessageElement.innerText = message;
        this._state = nextState;
    }
    get score() {
        return this._score;
    }
    set score(nextScore) {
        this.scoreElement.innerText = nextScore;
        this._score = nextScore;
    }

    static getMapSize() {
        const { mapWidthPX, mapHeightPX, cellSize } = GameControl
        return { width: Math.floor(mapWidthPX / cellSize), height: Math.floor(mapHeightPX / cellSize) }
    }
    getObject({ x, y }) {
        return this.gameMap[x][y];
    };
    drawBackground() {
        this.ctx.fillStyle = GameControl.backgroundColor;
        this.ctx.fillRect(GameControl.lowestIndex, GameControl.lowestIndex, GameControl.mapWidthPX, GameControl.mapHeightPX);
    }
    drawCell({ x, y }, color, object, crop = true) {
        const { ctx, gameMap } = this;
        const { backgroundColor, cellSize } = GameControl
        const fillSize = crop ? cellSize - 1 : cellSize

        ctx.fillStyle = color || backgroundColor;
        ctx.fillRect(x * cellSize, y * cellSize, fillSize,  fillSize)
        gameMap[x][y] = object
    }
    clearCell({ x, y }, nextObject) {
        const { cellSize, backgroundColor } = GameControl
        this.ctx.fillStyle = backgroundColor
        this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        this.gameMap[x][y] = nextObject || 0
    }


    getCoordinatesFromRange(ranges = {}, checkCollisions = true) {
        const { width, height } = GameControl.getMapSize()
        const {
            XMin = GameControl.lowestIndex,
            XMax = width,
            YMin = GameControl.lowestIndex,
            YMax = height,
        } = ranges;
        let x = getRandomFromRange(XMin, XMax),
            y = getRandomFromRange(YMin, YMax);

        while (checkCollisions && this.gameMap[x][y] !== 0) {
            x = getRandomFromRange(XMin, XMax);
            y = getRandomFromRange(YMin, YMax);
        }

        return { x, y }
    }
}
