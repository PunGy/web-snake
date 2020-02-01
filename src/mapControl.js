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

    constructor() {
        if (GameMap._instance != null) return GameMap._instance

        this.gameMapElement = document.getElementById('gameMap');
        this.scoreElement = document.getElementById('score');
        this.resetButtonElement = document.getElementById('resetButton');
        this.pauseButtonElement = document.getElementById('pauseButton');
        this.startButtonElement = document.getElementById('startButton');
        this.gameStateMessageElement = document.getElementById('gameStateMessage');

        // states: pause|play
        this.state = 'pause';
        this.gameMap = [];

        const elemsCount = GameMap.mapSize ** 2;
        for (let i = GameMap.lowestIndex; i < elemsCount; i++) {
            const cell = document.createElement('div');
        
            cell.classList.add('cell');
            this.gameMapElement.appendChild(cell);
            this.gameMap.push(cell);
        }

        GameControl._instance = this
    };

    getCell(coordinates) {
        return this.gameMap[coordinates.y * GameControl.mapSize + coordinates.x];
    };
}
