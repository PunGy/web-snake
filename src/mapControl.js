const gameMapElement = document.getElementById('gameMap')
const gameMap = [];

export const mapSize = 25;
export const lowestIndex = 0;

export function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getCoordinatesFromRange(ranges = {}) {
    const {
        XMin = lowestIndex,
        XMax = mapSize,
        YMin = lowestIndex,
        YMax = mapSize,
    } = ranges;
    return {
        x: getRandomFromRange(XMin, XMax),
        y: getRandomFromRange(YMin, YMax)
    }
}
export function getCell(coordinates) {
    return gameMap[coordinates.y * mapSize + coordinates.x];
}

export function hasColisions(coordinates1, coordinates2) {
    return (
        coordinates1.x === coordinates2.x
        && coordinates1.y === coordinates2.y
    )
}
export function printGameMap() {
    // preserve double calling
    if (gameMap.length > 0 || gameMapElement.children.length > 0) return;

    const elemsCount = mapSize ** 2;
    for (let i = lowestIndex; i < elemsCount; i++) {
        const cell = document.createElement('div');
    
        cell.classList.add('cell');
        gameMapElement.appendChild(cell);
        gameMap.push(cell);
    }
}
