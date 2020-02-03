export function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getCoordinatesFromRange(ranges = {}) {
    const {
        XMin = GameControl.lowestIndex,
        XMax = GameControl.mapSize,
        YMin = GameControl.lowestIndex,
        YMax = GameControl.mapSize,
    } = ranges;
    return {
        x: getRandomFromRange(XMin, XMax),
        y: getRandomFromRange(YMin, YMax)
    }
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
    static mapSize = 25;
    static lowestIndex = 0;
    static gameLoopRefreshRate = 100;

    constructor() {
        if (GameControl._instance != null) return GameControl._instance

        this.gameMapElement = document.getElementById('gameMap');
        this.scoreElement = document.getElementById('score');
        this.resetButtonElement = document.getElementById('resetButton');
        this.pauseButtonElement = document.getElementById('pauseButton');
        this.startButtonElement = document.getElementById('startButton');
        this.gameStateMessageElement = document.getElementById('gameStateMessage');

        this._score = 0;
        // states: pause|play|begin|gameover
        this._state = 'begin';
        this.gameMap = [];

        const elemsCount = GameControl.mapSize ** 2;
        // Paint cells on map
        for (let i = GameControl.lowestIndex; i < elemsCount; i++) {
            const cell = document.createElement('div');
        
            cell.classList.add('cell');
            this.gameMapElement.appendChild(cell);
            this.gameMap.push(cell);
        }

        GameControl._instance = this
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

    getCell(coordinates) {
        return this.gameMap[coordinates.y * GameControl.mapSize + coordinates.x];
    };
}
