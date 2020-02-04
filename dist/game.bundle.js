/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _objectControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectControl */ "./src/objectControl.js");
/* harmony import */ var _mapControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mapControl */ "./src/mapControl.js");


var gameControl = new _mapControl__WEBPACK_IMPORTED_MODULE_1__["GameControl"]();
var snake = new _objectControl__WEBPACK_IMPORTED_MODULE_0__["Snake"]();
var mouse = new _objectControl__WEBPACK_IMPORTED_MODULE_0__["Mouse"]();
snake.drawSnake();
document.addEventListener('keydown', function (event) {
  // if it is not a change direction click
  if (!snake.changeDirection(event)) {
    var code = event.code;

    if (code === 'Enter' && gameControl.state !== 'play') {
      startGame();
    } else if (code === 'Space' && gameControl.state === 'play' || gameControl.state === 'pause') {
      if (gameControl.state === 'pause') startGame();else pauseGame();
    } else if (code === 'Escape' && gameControl.state !== 'begin') {
      resetGame();
    }
  }
});
var gameLoop = null;

function gameLoopFn() {
  var isSuccessfull = snake.move(mouse);

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

  gameLoop = setInterval(gameLoopFn, _mapControl__WEBPACK_IMPORTED_MODULE_1__["GameControl"].gameLoopRefreshRate);
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
gameControl.startButtonElement.addEventListener('click', startGame);
gameControl.pauseButtonElement.addEventListener('click', pauseGame);
gameControl.resetButtonElement.addEventListener('click', resetGame);

/***/ }),

/***/ "./src/mapControl.js":
/*!***************************!*\
  !*** ./src/mapControl.js ***!
  \***************************/
/*! exports provided: getRandomFromRange, getCoordinatesFromRange, hasColisions, GameControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomFromRange", function() { return getRandomFromRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoordinatesFromRange", function() { return getCoordinatesFromRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasColisions", function() { return hasColisions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameControl", function() { return GameControl; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getRandomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getCoordinatesFromRange() {
  var ranges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ranges$XMin = ranges.XMin,
      XMin = _ranges$XMin === void 0 ? GameControl.lowestIndex : _ranges$XMin,
      _ranges$XMax = ranges.XMax,
      XMax = _ranges$XMax === void 0 ? GameControl.mapSize : _ranges$XMax,
      _ranges$YMin = ranges.YMin,
      YMin = _ranges$YMin === void 0 ? GameControl.lowestIndex : _ranges$YMin,
      _ranges$YMax = ranges.YMax,
      YMax = _ranges$YMax === void 0 ? GameControl.mapSize : _ranges$YMax;
  return {
    x: getRandomFromRange(XMin, XMax),
    y: getRandomFromRange(YMin, YMax)
  };
}
function hasColisions(coordinates1, coordinates2) {
  return coordinates1.x === coordinates2.x && coordinates1.y === coordinates2.y;
} // Singleton class of game map

var GameControl =
/*#__PURE__*/
function () {
  function GameControl() {
    _classCallCheck(this, GameControl);

    if (GameControl._instance != null) return GameControl._instance;
    this.gameMapElement = document.getElementById('gameMap');
    this.scoreElement = document.getElementById('score');
    this.resetButtonElement = document.getElementById('resetButton');
    this.pauseButtonElement = document.getElementById('pauseButton');
    this.startButtonElement = document.getElementById('startButton');
    this.gameStateMessageElement = document.getElementById('gameStateMessage');
    this._score = 0; // states: pause|play|begin|gameover

    this._state = 'begin';
    this.gameMap = [];
    var elemsCount = Math.pow(GameControl.mapSize, 2); // Paint cells on map

    for (var i = GameControl.lowestIndex; i < elemsCount; i++) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      this.gameMapElement.appendChild(cell);
      this.gameMap.push(cell);
    }

    GameControl._instance = this;
  }

  _createClass(GameControl, [{
    key: "getCell",
    value: function getCell(coordinates) {
      return this.gameMap[coordinates.y * GameControl.mapSize + coordinates.x];
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    },
    set: function set(nextState) {
      var message;

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
          message = "You are lose. Your score is ".concat(this.score);
          break;

        default:
          message = 'Undefined state';
          console.error('Undefined state: ', this.state);
      }

      this.gameStateMessageElement.innerText = message;
      this._state = nextState;
    }
  }, {
    key: "score",
    get: function get() {
      return this._score;
    },
    set: function set(nextScore) {
      this.scoreElement.innerText = nextScore;
      this._score = nextScore;
    }
  }]);

  return GameControl;
}();

_defineProperty(GameControl, "_instance", null);

_defineProperty(GameControl, "mapSize", 25);

_defineProperty(GameControl, "lowestIndex", 0);

_defineProperty(GameControl, "gameLoopRefreshRate", 100);

/***/ }),

/***/ "./src/objectControl.js":
/*!******************************!*\
  !*** ./src/objectControl.js ***!
  \******************************/
/*! exports provided: Snake, Mouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Snake", function() { return Snake; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mouse", function() { return Mouse; });
/* harmony import */ var _mapControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapControl */ "./src/mapControl.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var defaultSnakeWidth = 3;
var gameControl = new _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"]();
var Snake =
/*#__PURE__*/
function () {
  function Snake() {
    _classCallCheck(this, Snake);

    // get xy for head
    var headCoordinates = Object(_mapControl__WEBPACK_IMPORTED_MODULE_0__["getCoordinatesFromRange"])({
      XMin: _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].lowestIndex + defaultSnakeWidth
    }); // generate coordinates for body of snake

    var snakeBodyCoordinates = [{
      x: headCoordinates.x,
      y: headCoordinates.y
    }, {
      x: headCoordinates.x - 1,
      y: headCoordinates.y
    }, {
      x: headCoordinates.x - 2,
      y: headCoordinates.y
    }];
    this.bodyCoordinates = snakeBodyCoordinates;
    this.direction = 'right';
    this.changeDirectionStack = [];
  }

  _createClass(Snake, [{
    key: "getBodyCells",
    value: function getBodyCells() {
      return this.bodyCoordinates.map(function (crns) {
        return gameControl.getCell(crns);
      });
    }
  }, {
    key: "clearSnake",
    value: function clearSnake() {
      // get cells from coordinates
      var snakeBodyCells = this.getBodyCells();
      snakeBodyCells.forEach(function (cell, i) {
        if (i === 0) cell.classList.remove('snakeHead');else cell.classList.remove('snakeBody');
      });
    }
  }, {
    key: "drawSnake",
    value: function drawSnake() {
      // get cells from coordinates
      var snakeBodyCells = this.getBodyCells(); // mark cells as snake

      snakeBodyCells.forEach(function (cell, i) {
        if (i === 0) cell.classList.add('snakeHead');else cell.classList.add('snakeBody');
      });
    }
  }, {
    key: "getNextHeadCoordinates",
    value: function getNextHeadCoordinates() {
      var head = this.bodyCoordinates[0];

      switch (this.direction) {
        // if current head is on border 
        case 'right':
          return {
            x: head.x === _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].mapSize - 1 ? _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].lowestIndex : head.x + 1,
            y: head.y
          };

        case 'left':
          return {
            x: head.x === 0 ? _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].mapSize - 1 : head.x - 1,
            y: head.y
          };

        case 'up':
          return {
            x: head.x,
            y: head.y === 0 ? _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].mapSize - 1 : head.y - 1
          };

        case 'down':
          return {
            x: head.x,
            y: head.y === _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].mapSize - 1 ? _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].lowestIndex : head.y + 1
          };
      }
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(event) {
      var _this = this;

      var code = event.code;
      var direction = '';
      if (code === 'ArrowLeft' && this.direction !== 'right') direction = 'left';else if (code === 'ArrowRight' && this.direction !== 'left') direction = 'right';else if (code === 'ArrowUp' && this.direction !== 'down') direction = 'up';else if (code === 'ArrowDown' && this.direction !== 'up') direction = 'down';
      var isChangeDirection = direction !== '';

      if (isChangeDirection) {
        if (!this.allowChangeDirection) {
          this.changeDirectionStack.push(function () {
            return _this.changeDirection(event);
          });
          return false;
        }

        this.direction = direction;
        this.allowChangeDirection = false;
      }

      return isChangeDirection;
    }
  }, {
    key: "move",
    value: function move(mouse) {
      var bodyCoordinates = this.bodyCoordinates;
      var nextHeadCoordinates = this.getNextHeadCoordinates();
      var currentHeadCell = gameControl.getCell(bodyCoordinates[0]);
      var tailCoordinates = Object.assign({}, bodyCoordinates[bodyCoordinates.length - 1]);
      if (gameControl.getCell(nextHeadCoordinates).classList.contains('snakeBody')) return false;
      var isCanEat = Object(_mapControl__WEBPACK_IMPORTED_MODULE_0__["hasColisions"])(bodyCoordinates[0], mouse.coordinates);

      for (var i = bodyCoordinates.length - 1; i >= 1; i--) {
        Object.assign(bodyCoordinates[i], bodyCoordinates[i - 1]);
      }

      Object.assign(bodyCoordinates[0], nextHeadCoordinates);
      currentHeadCell.classList.remove('snakeHead');

      if (!isCanEat) {
        gameControl.getCell(tailCoordinates).classList.remove('snakeBody');
      }

      if (isCanEat) {
        bodyCoordinates.push(tailCoordinates);
        currentHeadCell.classList.remove('mouse');
        mouse.coordinates = Mouse.spawnMouse();
        gameControl.score = gameControl.score + 1;
      }

      return true;
    }
  }]);

  return Snake;
}();
var Mouse =
/*#__PURE__*/
function () {
  _createClass(Mouse, [{
    key: "clearMouse",
    value: function clearMouse() {
      gameControl.getCell(this.coordinates).classList.remove('mouse');
    }
  }], [{
    key: "spawnMouse",
    value: function spawnMouse() {
      var mouseCoordinates = Object(_mapControl__WEBPACK_IMPORTED_MODULE_0__["getCoordinatesFromRange"])();
      var mouseCell = gameControl.getCell(mouseCoordinates);

      while (mouseCell.classList.contains('snakeBody', 'snakeHead')) {
        mouseCoordinates = Object(_mapControl__WEBPACK_IMPORTED_MODULE_0__["getCoordinatesFromRange"])();
        mouseCell = gameControl.getCell(mouseCoordinates);
      }

      mouseCell.classList.add('mouse');
      return mouseCoordinates;
    }
  }]);

  function Mouse() {
    _classCallCheck(this, Mouse);

    var coordinates = Mouse.spawnMouse();
    this.coordinates = coordinates;
  }

  return Mouse;
}();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcENvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdENvbnRyb2wuanMiXSwibmFtZXMiOlsiZ2FtZUNvbnRyb2wiLCJHYW1lQ29udHJvbCIsInNuYWtlIiwiU25ha2UiLCJtb3VzZSIsIk1vdXNlIiwiZHJhd1NuYWtlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjaGFuZ2VEaXJlY3Rpb24iLCJjb2RlIiwic3RhdGUiLCJzdGFydEdhbWUiLCJwYXVzZUdhbWUiLCJyZXNldEdhbWUiLCJnYW1lTG9vcCIsImdhbWVMb29wRm4iLCJpc1N1Y2Nlc3NmdWxsIiwibW92ZSIsImdhbWVPdmVyIiwiYWxsb3dDaGFuZ2VEaXJlY3Rpb24iLCJjaGFuZ2VEaXJlY3Rpb25TdGFjayIsImxlbmd0aCIsInNoaWZ0IiwicmVzZXRNYXAiLCJjbGVhclNuYWtlIiwiY29uc3RydWN0b3IiLCJjbGVhck1vdXNlIiwic2V0SW50ZXJ2YWwiLCJnYW1lTG9vcFJlZnJlc2hSYXRlIiwic3RhcnRCdXR0b25FbGVtZW50IiwiZGlzYWJsZWQiLCJwYXVzZUJ1dHRvbkVsZW1lbnQiLCJyZXNldEJ1dHRvbkVsZW1lbnQiLCJjbGVhckludGVydmFsIiwic2NvcmUiLCJnZXRSYW5kb21Gcm9tUmFuZ2UiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZXRDb29yZGluYXRlc0Zyb21SYW5nZSIsInJhbmdlcyIsIlhNaW4iLCJsb3dlc3RJbmRleCIsIlhNYXgiLCJtYXBTaXplIiwiWU1pbiIsIllNYXgiLCJ4IiwieSIsImhhc0NvbGlzaW9ucyIsImNvb3JkaW5hdGVzMSIsImNvb3JkaW5hdGVzMiIsIl9pbnN0YW5jZSIsImdhbWVNYXBFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzY29yZUVsZW1lbnQiLCJnYW1lU3RhdGVNZXNzYWdlRWxlbWVudCIsIl9zY29yZSIsIl9zdGF0ZSIsImdhbWVNYXAiLCJlbGVtc0NvdW50IiwiaSIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJwdXNoIiwiY29vcmRpbmF0ZXMiLCJuZXh0U3RhdGUiLCJtZXNzYWdlIiwiY29uc29sZSIsImVycm9yIiwiaW5uZXJUZXh0IiwibmV4dFNjb3JlIiwiZGVmYXVsdFNuYWtlV2lkdGgiLCJoZWFkQ29vcmRpbmF0ZXMiLCJzbmFrZUJvZHlDb29yZGluYXRlcyIsImJvZHlDb29yZGluYXRlcyIsImRpcmVjdGlvbiIsIm1hcCIsImNybnMiLCJnZXRDZWxsIiwic25ha2VCb2R5Q2VsbHMiLCJnZXRCb2R5Q2VsbHMiLCJmb3JFYWNoIiwicmVtb3ZlIiwiaGVhZCIsImlzQ2hhbmdlRGlyZWN0aW9uIiwibmV4dEhlYWRDb29yZGluYXRlcyIsImdldE5leHRIZWFkQ29vcmRpbmF0ZXMiLCJjdXJyZW50SGVhZENlbGwiLCJ0YWlsQ29vcmRpbmF0ZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjb250YWlucyIsImlzQ2FuRWF0Iiwic3Bhd25Nb3VzZSIsIm1vdXNlQ29vcmRpbmF0ZXMiLCJtb3VzZUNlbGwiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUVBLElBQU1BLFdBQVcsR0FBRyxJQUFJQyx1REFBSixFQUFwQjtBQUNBLElBQU1DLEtBQUssR0FBRyxJQUFJQyxvREFBSixFQUFkO0FBQ0EsSUFBTUMsS0FBSyxHQUFHLElBQUlDLG9EQUFKLEVBQWQ7QUFDQUgsS0FBSyxDQUFDSSxTQUFOO0FBRUFDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUMsVUFBQ0MsS0FBRCxFQUFXO0FBQzVDO0FBQ0EsTUFBSSxDQUFDUCxLQUFLLENBQUNRLGVBQU4sQ0FBc0JELEtBQXRCLENBQUwsRUFBbUM7QUFBQSxRQUN2QkUsSUFEdUIsR0FDZEYsS0FEYyxDQUN2QkUsSUFEdUI7O0FBRy9CLFFBQUlBLElBQUksS0FBSyxPQUFULElBQW9CWCxXQUFXLENBQUNZLEtBQVosS0FBc0IsTUFBOUMsRUFBc0Q7QUFDbERDLGVBQVM7QUFDWixLQUZELE1BRU8sSUFBSUYsSUFBSSxLQUFLLE9BQVQsSUFBb0JYLFdBQVcsQ0FBQ1ksS0FBWixLQUFzQixNQUExQyxJQUFvRFosV0FBVyxDQUFDWSxLQUFaLEtBQXNCLE9BQTlFLEVBQXVGO0FBQzFGLFVBQUlaLFdBQVcsQ0FBQ1ksS0FBWixLQUFzQixPQUExQixFQUFtQ0MsU0FBUyxHQUE1QyxLQUNLQyxTQUFTO0FBQ2pCLEtBSE0sTUFHQSxJQUFJSCxJQUFJLEtBQUssUUFBVCxJQUFxQlgsV0FBVyxDQUFDWSxLQUFaLEtBQXNCLE9BQS9DLEVBQXdEO0FBQzNERyxlQUFTO0FBQ1o7QUFDSjtBQUNKLENBZEQ7QUFnQkEsSUFBSUMsUUFBUSxHQUFHLElBQWY7O0FBRUEsU0FBU0MsVUFBVCxHQUFzQjtBQUNsQixNQUFNQyxhQUFhLEdBQUdoQixLQUFLLENBQUNpQixJQUFOLENBQVdmLEtBQVgsQ0FBdEI7O0FBQ0EsTUFBSSxDQUFDYyxhQUFMLEVBQW9CO0FBQ2hCRSxZQUFRO0FBQ1g7O0FBQ0RsQixPQUFLLENBQUNJLFNBQU47QUFDQUosT0FBSyxDQUFDbUIsb0JBQU4sR0FBNkIsSUFBN0I7O0FBQ0EsTUFBSW5CLEtBQUssQ0FBQ29CLG9CQUFOLENBQTJCQyxNQUEzQixJQUFxQyxDQUF6QyxFQUE0QztBQUN4Q3JCLFNBQUssQ0FBQ29CLG9CQUFOLENBQTJCRSxLQUEzQjtBQUNIO0FBQ0o7O0FBRUQsU0FBU0MsUUFBVCxHQUFvQjtBQUNoQnZCLE9BQUssQ0FBQ3dCLFVBQU47QUFDQXhCLE9BQUssQ0FBQ3lCLFdBQU47QUFDQXpCLE9BQUssQ0FBQ0ksU0FBTjtBQUVBRixPQUFLLENBQUN3QixVQUFOO0FBQ0F4QixPQUFLLENBQUN1QixXQUFOO0FBQ0g7O0FBRUQsU0FBU2QsU0FBVCxHQUFxQjtBQUNqQixNQUFJYixXQUFXLENBQUNZLEtBQVosS0FBc0IsVUFBMUIsRUFBc0M7QUFDbENhLFlBQVE7QUFDWDs7QUFFRFQsVUFBUSxHQUFHYSxXQUFXLENBQUNaLFVBQUQsRUFBYWhCLHVEQUFXLENBQUM2QixtQkFBekIsQ0FBdEI7QUFDQTlCLGFBQVcsQ0FBQ1ksS0FBWixHQUFvQixNQUFwQjtBQUVBWixhQUFXLENBQUMrQixrQkFBWixDQUErQkMsUUFBL0IsR0FBMEMsSUFBMUM7QUFDQWhDLGFBQVcsQ0FBQ2lDLGtCQUFaLENBQStCRCxRQUEvQixHQUEwQyxLQUExQztBQUNBaEMsYUFBVyxDQUFDa0Msa0JBQVosQ0FBK0JGLFFBQS9CLEdBQTBDLEtBQTFDO0FBQ0g7O0FBQ0QsU0FBU2xCLFNBQVQsR0FBcUI7QUFDakIsTUFBSUUsUUFBSixFQUFjbUIsYUFBYSxDQUFDbkIsUUFBRCxDQUFiO0FBRWRoQixhQUFXLENBQUNZLEtBQVosR0FBb0IsT0FBcEI7QUFFQVosYUFBVyxDQUFDK0Isa0JBQVosQ0FBK0JDLFFBQS9CLEdBQTBDLEtBQTFDO0FBQ0FoQyxhQUFXLENBQUNpQyxrQkFBWixDQUErQkQsUUFBL0IsR0FBMEMsSUFBMUM7QUFDSDs7QUFDRCxTQUFTakIsU0FBVCxHQUFxQjtBQUNqQixNQUFJQyxRQUFKLEVBQWNtQixhQUFhLENBQUNuQixRQUFELENBQWI7QUFFZGhCLGFBQVcsQ0FBQ1ksS0FBWixHQUFvQixPQUFwQjtBQUNBWixhQUFXLENBQUNvQyxLQUFaLEdBQW9CLENBQXBCO0FBRUFwQyxhQUFXLENBQUMrQixrQkFBWixDQUErQkMsUUFBL0IsR0FBMEMsS0FBMUM7QUFDQWhDLGFBQVcsQ0FBQ2lDLGtCQUFaLENBQStCRCxRQUEvQixHQUEwQyxJQUExQztBQUNBaEMsYUFBVyxDQUFDa0Msa0JBQVosQ0FBK0JGLFFBQS9CLEdBQTBDLElBQTFDO0FBRUFQLFVBQVE7QUFDWDs7QUFDRCxTQUFTTCxRQUFULEdBQW9CO0FBQ2hCLE1BQUlKLFFBQUosRUFBY21CLGFBQWEsQ0FBQ25CLFFBQUQsQ0FBYjtBQUVkaEIsYUFBVyxDQUFDaUMsa0JBQVosQ0FBK0JELFFBQS9CLEdBQTBDLElBQTFDO0FBQ0FoQyxhQUFXLENBQUNrQyxrQkFBWixDQUErQkYsUUFBL0IsR0FBMEMsSUFBMUM7QUFDQWhDLGFBQVcsQ0FBQytCLGtCQUFaLENBQStCQyxRQUEvQixHQUEwQyxLQUExQztBQUVBaEMsYUFBVyxDQUFDWSxLQUFaLEdBQW9CLFVBQXBCO0FBQ0FaLGFBQVcsQ0FBQ29DLEtBQVosR0FBb0IsQ0FBcEI7QUFDSDs7QUFFRHBDLFdBQVcsQ0FBQ2lDLGtCQUFaLENBQStCRCxRQUEvQixHQUEwQyxJQUExQztBQUNBaEMsV0FBVyxDQUFDa0Msa0JBQVosQ0FBK0JGLFFBQS9CLEdBQTBDLElBQTFDO0FBRUFoQyxXQUFXLENBQUMrQixrQkFBWixDQUErQnZCLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5REssU0FBekQ7QUFDQWIsV0FBVyxDQUFDaUMsa0JBQVosQ0FBK0J6QixnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeURNLFNBQXpEO0FBQ0FkLFdBQVcsQ0FBQ2tDLGtCQUFaLENBQStCMUIsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlETyxTQUF6RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakdPLFNBQVNzQixrQkFBVCxDQUE0QkMsR0FBNUIsRUFBaUNDLEdBQWpDLEVBQXNDO0FBQ3pDLFNBQU9DLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUJILEdBQUcsR0FBR0QsR0FBdkIsSUFBOEJBLEdBQXpDLENBQVA7QUFDSDtBQUVNLFNBQVNLLHVCQUFULEdBQThDO0FBQUEsTUFBYkMsTUFBYSx1RUFBSixFQUFJO0FBQUEscUJBTTdDQSxNQU42QyxDQUU3Q0MsSUFGNkM7QUFBQSxNQUU3Q0EsSUFGNkMsNkJBRXRDNUMsV0FBVyxDQUFDNkMsV0FGMEI7QUFBQSxxQkFNN0NGLE1BTjZDLENBRzdDRyxJQUg2QztBQUFBLE1BRzdDQSxJQUg2Qyw2QkFHdEM5QyxXQUFXLENBQUMrQyxPQUgwQjtBQUFBLHFCQU03Q0osTUFONkMsQ0FJN0NLLElBSjZDO0FBQUEsTUFJN0NBLElBSjZDLDZCQUl0Q2hELFdBQVcsQ0FBQzZDLFdBSjBCO0FBQUEscUJBTTdDRixNQU42QyxDQUs3Q00sSUFMNkM7QUFBQSxNQUs3Q0EsSUFMNkMsNkJBS3RDakQsV0FBVyxDQUFDK0MsT0FMMEI7QUFPakQsU0FBTztBQUNIRyxLQUFDLEVBQUVkLGtCQUFrQixDQUFDUSxJQUFELEVBQU9FLElBQVAsQ0FEbEI7QUFFSEssS0FBQyxFQUFFZixrQkFBa0IsQ0FBQ1ksSUFBRCxFQUFPQyxJQUFQO0FBRmxCLEdBQVA7QUFJSDtBQUNNLFNBQVNHLFlBQVQsQ0FBc0JDLFlBQXRCLEVBQW9DQyxZQUFwQyxFQUFrRDtBQUNyRCxTQUNJRCxZQUFZLENBQUNILENBQWIsS0FBbUJJLFlBQVksQ0FBQ0osQ0FBaEMsSUFDR0csWUFBWSxDQUFDRixDQUFiLEtBQW1CRyxZQUFZLENBQUNILENBRnZDO0FBSUgsQyxDQUVEOztBQUNPLElBQU1uRCxXQUFiO0FBQUE7QUFBQTtBQU1JLHlCQUFjO0FBQUE7O0FBQ1YsUUFBSUEsV0FBVyxDQUFDdUQsU0FBWixJQUF5QixJQUE3QixFQUFtQyxPQUFPdkQsV0FBVyxDQUFDdUQsU0FBbkI7QUFFbkMsU0FBS0MsY0FBTCxHQUFzQmxELFFBQVEsQ0FBQ21ELGNBQVQsQ0FBd0IsU0FBeEIsQ0FBdEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CcEQsUUFBUSxDQUFDbUQsY0FBVCxDQUF3QixPQUF4QixDQUFwQjtBQUNBLFNBQUt4QixrQkFBTCxHQUEwQjNCLFFBQVEsQ0FBQ21ELGNBQVQsQ0FBd0IsYUFBeEIsQ0FBMUI7QUFDQSxTQUFLekIsa0JBQUwsR0FBMEIxQixRQUFRLENBQUNtRCxjQUFULENBQXdCLGFBQXhCLENBQTFCO0FBQ0EsU0FBSzNCLGtCQUFMLEdBQTBCeEIsUUFBUSxDQUFDbUQsY0FBVCxDQUF3QixhQUF4QixDQUExQjtBQUNBLFNBQUtFLHVCQUFMLEdBQStCckQsUUFBUSxDQUFDbUQsY0FBVCxDQUF3QixrQkFBeEIsQ0FBL0I7QUFFQSxTQUFLRyxNQUFMLEdBQWMsQ0FBZCxDQVZVLENBV1Y7O0FBQ0EsU0FBS0MsTUFBTCxHQUFjLE9BQWQ7QUFDQSxTQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUVBLFFBQU1DLFVBQVUsWUFBRy9ELFdBQVcsQ0FBQytDLE9BQWYsRUFBMEIsQ0FBMUIsQ0FBaEIsQ0FmVSxDQWdCVjs7QUFDQSxTQUFLLElBQUlpQixDQUFDLEdBQUdoRSxXQUFXLENBQUM2QyxXQUF6QixFQUFzQ21CLENBQUMsR0FBR0QsVUFBMUMsRUFBc0RDLENBQUMsRUFBdkQsRUFBMkQ7QUFDdkQsVUFBTUMsSUFBSSxHQUFHM0QsUUFBUSxDQUFDNEQsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBRUFELFVBQUksQ0FBQ0UsU0FBTCxDQUFlQyxHQUFmLENBQW1CLE1BQW5CO0FBQ0EsV0FBS1osY0FBTCxDQUFvQmEsV0FBcEIsQ0FBZ0NKLElBQWhDO0FBQ0EsV0FBS0gsT0FBTCxDQUFhUSxJQUFiLENBQWtCTCxJQUFsQjtBQUNIOztBQUVEakUsZUFBVyxDQUFDdUQsU0FBWixHQUF3QixJQUF4QjtBQUNIOztBQWhDTDtBQUFBO0FBQUEsNEJBa0VZZ0IsV0FsRVosRUFrRXlCO0FBQ2pCLGFBQU8sS0FBS1QsT0FBTCxDQUFhUyxXQUFXLENBQUNwQixDQUFaLEdBQWdCbkQsV0FBVyxDQUFDK0MsT0FBNUIsR0FBc0N3QixXQUFXLENBQUNyQixDQUEvRCxDQUFQO0FBQ0g7QUFwRUw7QUFBQTtBQUFBLHdCQWlDZ0I7QUFDUixhQUFPLEtBQUtXLE1BQVo7QUFDSCxLQW5DTDtBQUFBLHNCQW9DY1csU0FwQ2QsRUFvQ3lCO0FBQ2pCLFVBQUlDLE9BQUo7O0FBQ0EsY0FBUUQsU0FBUjtBQUNJLGFBQUssT0FBTDtBQUNJQyxpQkFBTyxHQUFHLGlCQUFWO0FBQ0E7O0FBQ0osYUFBSyxNQUFMO0FBQ0lBLGlCQUFPLEdBQUcsTUFBVjtBQUNBOztBQUNKLGFBQUssT0FBTDtBQUNJQSxpQkFBTyxHQUFHLFlBQVY7QUFDQTs7QUFDSixhQUFLLFVBQUw7QUFDSUEsaUJBQU8seUNBQWtDLEtBQUt0QyxLQUF2QyxDQUFQO0FBQ0E7O0FBQ0o7QUFDSXNDLGlCQUFPLEdBQUcsaUJBQVY7QUFDQUMsaUJBQU8sQ0FBQ0MsS0FBUixDQUFjLG1CQUFkLEVBQW1DLEtBQUtoRSxLQUF4QztBQWZSOztBQWlCQSxXQUFLZ0QsdUJBQUwsQ0FBNkJpQixTQUE3QixHQUF5Q0gsT0FBekM7QUFDQSxXQUFLWixNQUFMLEdBQWNXLFNBQWQ7QUFDSDtBQXpETDtBQUFBO0FBQUEsd0JBMERnQjtBQUNSLGFBQU8sS0FBS1osTUFBWjtBQUNILEtBNURMO0FBQUEsc0JBNkRjaUIsU0E3RGQsRUE2RHlCO0FBQ2pCLFdBQUtuQixZQUFMLENBQWtCa0IsU0FBbEIsR0FBOEJDLFNBQTlCO0FBQ0EsV0FBS2pCLE1BQUwsR0FBY2lCLFNBQWQ7QUFDSDtBQWhFTDs7QUFBQTtBQUFBOztnQkFBYTdFLFcsZUFDVSxJOztnQkFEVkEsVyxhQUVRLEU7O2dCQUZSQSxXLGlCQUdZLEM7O2dCQUhaQSxXLHlCQUlvQixHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJqQztBQU1BLElBQU04RSxpQkFBaUIsR0FBRyxDQUExQjtBQUVBLElBQU0vRSxXQUFXLEdBQUcsSUFBSUMsdURBQUosRUFBcEI7QUFDTyxJQUFNRSxLQUFiO0FBQUE7QUFBQTtBQUNJLG1CQUFjO0FBQUE7O0FBQ1Y7QUFDQSxRQUFNNkUsZUFBZSxHQUFHckMsMkVBQXVCLENBQUM7QUFDNUNFLFVBQUksRUFBRTVDLHVEQUFXLENBQUM2QyxXQUFaLEdBQTBCaUM7QUFEWSxLQUFELENBQS9DLENBRlUsQ0FLVjs7QUFDQSxRQUFNRSxvQkFBb0IsR0FBRyxDQUN6QjtBQUFFOUIsT0FBQyxFQUFFNkIsZUFBZSxDQUFDN0IsQ0FBckI7QUFBd0JDLE9BQUMsRUFBRTRCLGVBQWUsQ0FBQzVCO0FBQTNDLEtBRHlCLEVBRXpCO0FBQUVELE9BQUMsRUFBRTZCLGVBQWUsQ0FBQzdCLENBQWhCLEdBQW9CLENBQXpCO0FBQTRCQyxPQUFDLEVBQUU0QixlQUFlLENBQUM1QjtBQUEvQyxLQUZ5QixFQUd6QjtBQUFFRCxPQUFDLEVBQUU2QixlQUFlLENBQUM3QixDQUFoQixHQUFvQixDQUF6QjtBQUE0QkMsT0FBQyxFQUFFNEIsZUFBZSxDQUFDNUI7QUFBL0MsS0FIeUIsQ0FBN0I7QUFNQSxTQUFLOEIsZUFBTCxHQUF1QkQsb0JBQXZCO0FBRUEsU0FBS0UsU0FBTCxHQUFpQixPQUFqQjtBQUNBLFNBQUs3RCxvQkFBTCxHQUE0QixFQUE1QjtBQUNIOztBQWpCTDtBQUFBO0FBQUEsbUNBa0JtQjtBQUNYLGFBQ0ksS0FBSzRELGVBQUwsQ0FBcUJFLEdBQXJCLENBQXlCLFVBQUFDLElBQUk7QUFBQSxlQUN6QnJGLFdBQVcsQ0FBQ3NGLE9BQVosQ0FBb0JELElBQXBCLENBRHlCO0FBQUEsT0FBN0IsQ0FESjtBQU1IO0FBekJMO0FBQUE7QUFBQSxpQ0EwQmlCO0FBQ1Q7QUFDQSxVQUFNRSxjQUFjLEdBQUcsS0FBS0MsWUFBTCxFQUF2QjtBQUNBRCxvQkFBYyxDQUFDRSxPQUFmLENBQXVCLFVBQUN2QixJQUFELEVBQU9ELENBQVAsRUFBYTtBQUNoQyxZQUFJQSxDQUFDLEtBQUssQ0FBVixFQUFhQyxJQUFJLENBQUNFLFNBQUwsQ0FBZXNCLE1BQWYsQ0FBc0IsV0FBdEIsRUFBYixLQUNLeEIsSUFBSSxDQUFDRSxTQUFMLENBQWVzQixNQUFmLENBQXNCLFdBQXRCO0FBQ1IsT0FIRDtBQUlIO0FBakNMO0FBQUE7QUFBQSxnQ0FrQ2dCO0FBQ1I7QUFDQSxVQUFNSCxjQUFjLEdBQUcsS0FBS0MsWUFBTCxFQUF2QixDQUZRLENBR1I7O0FBQ0FELG9CQUFjLENBQUNFLE9BQWYsQ0FBdUIsVUFBQ3ZCLElBQUQsRUFBT0QsQ0FBUCxFQUFhO0FBQ2hDLFlBQUlBLENBQUMsS0FBSyxDQUFWLEVBQWFDLElBQUksQ0FBQ0UsU0FBTCxDQUFlQyxHQUFmLENBQW1CLFdBQW5CLEVBQWIsS0FDS0gsSUFBSSxDQUFDRSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsV0FBbkI7QUFDUixPQUhEO0FBSUg7QUExQ0w7QUFBQTtBQUFBLDZDQTRDNkI7QUFDckIsVUFBTXNCLElBQUksR0FBRyxLQUFLVCxlQUFMLENBQXFCLENBQXJCLENBQWI7O0FBQ0EsY0FBTyxLQUFLQyxTQUFaO0FBQ0k7QUFDQSxhQUFLLE9BQUw7QUFDSSxpQkFBTztBQUNIaEMsYUFBQyxFQUFFd0MsSUFBSSxDQUFDeEMsQ0FBTCxLQUFXbEQsdURBQVcsQ0FBQytDLE9BQVosR0FBc0IsQ0FBakMsR0FBcUMvQyx1REFBVyxDQUFDNkMsV0FBakQsR0FBK0Q2QyxJQUFJLENBQUN4QyxDQUFMLEdBQVMsQ0FEeEU7QUFFSEMsYUFBQyxFQUFFdUMsSUFBSSxDQUFDdkM7QUFGTCxXQUFQOztBQUlKLGFBQUssTUFBTDtBQUNJLGlCQUFPO0FBQ0hELGFBQUMsRUFBRXdDLElBQUksQ0FBQ3hDLENBQUwsS0FBVyxDQUFYLEdBQWVsRCx1REFBVyxDQUFDK0MsT0FBWixHQUFzQixDQUFyQyxHQUF5QzJDLElBQUksQ0FBQ3hDLENBQUwsR0FBUyxDQURsRDtBQUVIQyxhQUFDLEVBQUV1QyxJQUFJLENBQUN2QztBQUZMLFdBQVA7O0FBSUosYUFBSyxJQUFMO0FBQ0ksaUJBQU87QUFDSEQsYUFBQyxFQUFFd0MsSUFBSSxDQUFDeEMsQ0FETDtBQUVIQyxhQUFDLEVBQUV1QyxJQUFJLENBQUN2QyxDQUFMLEtBQVcsQ0FBWCxHQUFlbkQsdURBQVcsQ0FBQytDLE9BQVosR0FBc0IsQ0FBckMsR0FBeUMyQyxJQUFJLENBQUN2QyxDQUFMLEdBQVM7QUFGbEQsV0FBUDs7QUFJSixhQUFLLE1BQUw7QUFDSSxpQkFBTztBQUNIRCxhQUFDLEVBQUV3QyxJQUFJLENBQUN4QyxDQURMO0FBRUhDLGFBQUMsRUFBRXVDLElBQUksQ0FBQ3ZDLENBQUwsS0FBV25ELHVEQUFXLENBQUMrQyxPQUFaLEdBQXNCLENBQWpDLEdBQXFDL0MsdURBQVcsQ0FBQzZDLFdBQWpELEdBQStENkMsSUFBSSxDQUFDdkMsQ0FBTCxHQUFTO0FBRnhFLFdBQVA7QUFsQlI7QUF1Qkg7QUFyRUw7QUFBQTtBQUFBLG9DQXNFb0IzQyxLQXRFcEIsRUFzRTJCO0FBQUE7O0FBQUEsVUFDWEUsSUFEVyxHQUNGRixLQURFLENBQ1hFLElBRFc7QUFFbkIsVUFBSXdFLFNBQVMsR0FBRyxFQUFoQjtBQUVBLFVBQUl4RSxJQUFJLEtBQUssV0FBVCxJQUF3QixLQUFLd0UsU0FBTCxLQUFtQixPQUEvQyxFQUF3REEsU0FBUyxHQUFHLE1BQVosQ0FBeEQsS0FDSyxJQUFJeEUsSUFBSSxLQUFLLFlBQVQsSUFBeUIsS0FBS3dFLFNBQUwsS0FBbUIsTUFBaEQsRUFBd0RBLFNBQVMsR0FBRyxPQUFaLENBQXhELEtBQ0EsSUFBSXhFLElBQUksS0FBSyxTQUFULElBQXNCLEtBQUt3RSxTQUFMLEtBQW1CLE1BQTdDLEVBQXFEQSxTQUFTLEdBQUcsSUFBWixDQUFyRCxLQUNBLElBQUl4RSxJQUFJLEtBQUssV0FBVCxJQUF3QixLQUFLd0UsU0FBTCxLQUFtQixJQUEvQyxFQUFxREEsU0FBUyxHQUFHLE1BQVo7QUFFMUQsVUFBTVMsaUJBQWlCLEdBQUdULFNBQVMsS0FBSyxFQUF4Qzs7QUFDQSxVQUFJUyxpQkFBSixFQUF1QjtBQUNuQixZQUFJLENBQUMsS0FBS3ZFLG9CQUFWLEVBQWdDO0FBQzVCLGVBQUtDLG9CQUFMLENBQTBCaUQsSUFBMUIsQ0FBK0I7QUFBQSxtQkFBTSxLQUFJLENBQUM3RCxlQUFMLENBQXFCRCxLQUFyQixDQUFOO0FBQUEsV0FBL0I7QUFDQSxpQkFBTyxLQUFQO0FBQ0g7O0FBQ0QsYUFBSzBFLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsYUFBSzlELG9CQUFMLEdBQTRCLEtBQTVCO0FBQ0g7O0FBQ0QsYUFBT3VFLGlCQUFQO0FBQ0g7QUF6Rkw7QUFBQTtBQUFBLHlCQTBGU3hGLEtBMUZULEVBMEZnQjtBQUFBLFVBQ0E4RSxlQURBLEdBQ29CLElBRHBCLENBQ0FBLGVBREE7QUFFUixVQUFNVyxtQkFBbUIsR0FBRyxLQUFLQyxzQkFBTCxFQUE1QjtBQUNBLFVBQU1DLGVBQWUsR0FBRy9GLFdBQVcsQ0FBQ3NGLE9BQVosQ0FBb0JKLGVBQWUsQ0FBQyxDQUFELENBQW5DLENBQXhCO0FBQ0EsVUFBTWMsZUFBZSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCaEIsZUFBZSxDQUFDQSxlQUFlLENBQUMzRCxNQUFoQixHQUF5QixDQUExQixDQUFqQyxDQUF4QjtBQUVBLFVBQUl2QixXQUFXLENBQUNzRixPQUFaLENBQW9CTyxtQkFBcEIsRUFBeUN6QixTQUF6QyxDQUFtRCtCLFFBQW5ELENBQTRELFdBQTVELENBQUosRUFBOEUsT0FBTyxLQUFQO0FBRTlFLFVBQU1DLFFBQVEsR0FBRy9DLGdFQUFZLENBQUM2QixlQUFlLENBQUMsQ0FBRCxDQUFoQixFQUFxQjlFLEtBQUssQ0FBQ29FLFdBQTNCLENBQTdCOztBQUVBLFdBQUssSUFBSVAsQ0FBQyxHQUFHaUIsZUFBZSxDQUFDM0QsTUFBaEIsR0FBeUIsQ0FBdEMsRUFBeUMwQyxDQUFDLElBQUksQ0FBOUMsRUFBaURBLENBQUMsRUFBbEQsRUFBc0Q7QUFDbERnQyxjQUFNLENBQUNDLE1BQVAsQ0FBY2hCLGVBQWUsQ0FBQ2pCLENBQUQsQ0FBN0IsRUFBa0NpQixlQUFlLENBQUNqQixDQUFDLEdBQUcsQ0FBTCxDQUFqRDtBQUNIOztBQUNEZ0MsWUFBTSxDQUFDQyxNQUFQLENBQWNoQixlQUFlLENBQUMsQ0FBRCxDQUE3QixFQUFrQ1csbUJBQWxDO0FBQ0FFLHFCQUFlLENBQUMzQixTQUFoQixDQUEwQnNCLE1BQTFCLENBQWlDLFdBQWpDOztBQUVBLFVBQUksQ0FBQ1UsUUFBTCxFQUFlO0FBQ1hwRyxtQkFBVyxDQUFDc0YsT0FBWixDQUFvQlUsZUFBcEIsRUFBcUM1QixTQUFyQyxDQUErQ3NCLE1BQS9DLENBQXNELFdBQXREO0FBQ0g7O0FBRUQsVUFBSVUsUUFBSixFQUFjO0FBQ1ZsQix1QkFBZSxDQUFDWCxJQUFoQixDQUFxQnlCLGVBQXJCO0FBQ0FELHVCQUFlLENBQUMzQixTQUFoQixDQUEwQnNCLE1BQTFCLENBQWlDLE9BQWpDO0FBQ0F0RixhQUFLLENBQUNvRSxXQUFOLEdBQW9CbkUsS0FBSyxDQUFDZ0csVUFBTixFQUFwQjtBQUNBckcsbUJBQVcsQ0FBQ29DLEtBQVosR0FBb0JwQyxXQUFXLENBQUNvQyxLQUFaLEdBQW9CLENBQXhDO0FBQ0g7O0FBQ0QsYUFBTyxJQUFQO0FBQ0g7QUFySEw7O0FBQUE7QUFBQTtBQXdITyxJQUFNL0IsS0FBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUNBWWlCO0FBQ1RMLGlCQUFXLENBQUNzRixPQUFaLENBQW9CLEtBQUtkLFdBQXpCLEVBQXNDSixTQUF0QyxDQUFnRHNCLE1BQWhELENBQXVELE9BQXZEO0FBQ0g7QUFkTDtBQUFBO0FBQUEsaUNBQ3dCO0FBQ2hCLFVBQUlZLGdCQUFnQixHQUFHM0QsMkVBQXVCLEVBQTlDO0FBQ0EsVUFBSTRELFNBQVMsR0FBR3ZHLFdBQVcsQ0FBQ3NGLE9BQVosQ0FBb0JnQixnQkFBcEIsQ0FBaEI7O0FBQ0EsYUFBT0MsU0FBUyxDQUFDbkMsU0FBVixDQUFvQitCLFFBQXBCLENBQTZCLFdBQTdCLEVBQTBDLFdBQTFDLENBQVAsRUFBK0Q7QUFDM0RHLHdCQUFnQixHQUFHM0QsMkVBQXVCLEVBQTFDO0FBQ0E0RCxpQkFBUyxHQUFHdkcsV0FBVyxDQUFDc0YsT0FBWixDQUFvQmdCLGdCQUFwQixDQUFaO0FBQ0g7O0FBQ0RDLGVBQVMsQ0FBQ25DLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLE9BQXhCO0FBRUEsYUFBT2lDLGdCQUFQO0FBQ0g7QUFYTDs7QUFnQkksbUJBQWM7QUFBQTs7QUFDVixRQUFNOUIsV0FBVyxHQUFHbkUsS0FBSyxDQUFDZ0csVUFBTixFQUFwQjtBQUVBLFNBQUs3QixXQUFMLEdBQW1CQSxXQUFuQjtBQUNIOztBQXBCTDtBQUFBLEkiLCJmaWxlIjoiZ2FtZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLmpzXCIpO1xuIiwiaW1wb3J0IHtcclxuICAgIFNuYWtlLCBNb3VzZVxyXG59IGZyb20gJy4vb2JqZWN0Q29udHJvbCdcclxuaW1wb3J0IHsgR2FtZUNvbnRyb2wgfSBmcm9tICcuL21hcENvbnRyb2wnO1xyXG5cclxuY29uc3QgZ2FtZUNvbnRyb2wgPSBuZXcgR2FtZUNvbnRyb2woKTtcclxuY29uc3Qgc25ha2UgPSBuZXcgU25ha2UoKTtcclxuY29uc3QgbW91c2UgPSBuZXcgTW91c2UoKTtcclxuc25ha2UuZHJhd1NuYWtlKCk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAvLyBpZiBpdCBpcyBub3QgYSBjaGFuZ2UgZGlyZWN0aW9uIGNsaWNrXHJcbiAgICBpZiAoIXNuYWtlLmNoYW5nZURpcmVjdGlvbihldmVudCkpIHtcclxuICAgICAgICBjb25zdCB7IGNvZGUgfSA9IGV2ZW50O1xyXG5cclxuICAgICAgICBpZiAoY29kZSA9PT0gJ0VudGVyJyAmJiBnYW1lQ29udHJvbC5zdGF0ZSAhPT0gJ3BsYXknKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gJ1NwYWNlJyAmJiBnYW1lQ29udHJvbC5zdGF0ZSA9PT0gJ3BsYXknIHx8IGdhbWVDb250cm9sLnN0YXRlID09PSAncGF1c2UnKSB7XHJcbiAgICAgICAgICAgIGlmIChnYW1lQ29udHJvbC5zdGF0ZSA9PT0gJ3BhdXNlJykgc3RhcnRHYW1lKClcclxuICAgICAgICAgICAgZWxzZSBwYXVzZUdhbWUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09ICdFc2NhcGUnICYmIGdhbWVDb250cm9sLnN0YXRlICE9PSAnYmVnaW4nKSB7XHJcbiAgICAgICAgICAgIHJlc2V0R2FtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuXHJcbmxldCBnYW1lTG9vcCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBnYW1lTG9vcEZuKCkge1xyXG4gICAgY29uc3QgaXNTdWNjZXNzZnVsbCA9IHNuYWtlLm1vdmUobW91c2UpO1xyXG4gICAgaWYgKCFpc1N1Y2Nlc3NmdWxsKSB7XHJcbiAgICAgICAgZ2FtZU92ZXIoKTtcclxuICAgIH1cclxuICAgIHNuYWtlLmRyYXdTbmFrZSgpO1xyXG4gICAgc25ha2UuYWxsb3dDaGFuZ2VEaXJlY3Rpb24gPSB0cnVlO1xyXG4gICAgaWYgKHNuYWtlLmNoYW5nZURpcmVjdGlvblN0YWNrLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgc25ha2UuY2hhbmdlRGlyZWN0aW9uU3RhY2suc2hpZnQoKSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldE1hcCgpIHtcclxuICAgIHNuYWtlLmNsZWFyU25ha2UoKTtcclxuICAgIHNuYWtlLmNvbnN0cnVjdG9yKCk7XHJcbiAgICBzbmFrZS5kcmF3U25ha2UoKTtcclxuXHJcbiAgICBtb3VzZS5jbGVhck1vdXNlKCk7XHJcbiAgICBtb3VzZS5jb25zdHJ1Y3RvcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XHJcbiAgICBpZiAoZ2FtZUNvbnRyb2wuc3RhdGUgPT09ICdnYW1lb3ZlcicpIHtcclxuICAgICAgICByZXNldE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdhbWVMb29wID0gc2V0SW50ZXJ2YWwoZ2FtZUxvb3BGbiwgR2FtZUNvbnRyb2wuZ2FtZUxvb3BSZWZyZXNoUmF0ZSk7XHJcbiAgICBnYW1lQ29udHJvbC5zdGF0ZSA9ICdwbGF5JztcclxuXHJcbiAgICBnYW1lQ29udHJvbC5zdGFydEJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgZ2FtZUNvbnRyb2wucGF1c2VCdXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBnYW1lQ29udHJvbC5yZXNldEJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcclxufVxyXG5mdW5jdGlvbiBwYXVzZUdhbWUoKSB7XHJcbiAgICBpZiAoZ2FtZUxvb3ApIGNsZWFySW50ZXJ2YWwoZ2FtZUxvb3ApO1xyXG5cclxuICAgIGdhbWVDb250cm9sLnN0YXRlID0gJ3BhdXNlJztcclxuXHJcbiAgICBnYW1lQ29udHJvbC5zdGFydEJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGdhbWVDb250cm9sLnBhdXNlQnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XHJcbn1cclxuZnVuY3Rpb24gcmVzZXRHYW1lKCkge1xyXG4gICAgaWYgKGdhbWVMb29wKSBjbGVhckludGVydmFsKGdhbWVMb29wKTtcclxuXHJcbiAgICBnYW1lQ29udHJvbC5zdGF0ZSA9ICdiZWdpbic7XHJcbiAgICBnYW1lQ29udHJvbC5zY29yZSA9IDA7XHJcblxyXG4gICAgZ2FtZUNvbnRyb2wuc3RhcnRCdXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBnYW1lQ29udHJvbC5wYXVzZUJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgZ2FtZUNvbnRyb2wucmVzZXRCdXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICByZXNldE1hcCgpO1xyXG59XHJcbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xyXG4gICAgaWYgKGdhbWVMb29wKSBjbGVhckludGVydmFsKGdhbWVMb29wKTtcclxuXHJcbiAgICBnYW1lQ29udHJvbC5wYXVzZUJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgZ2FtZUNvbnRyb2wucmVzZXRCdXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIGdhbWVDb250cm9sLnN0YXJ0QnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIGdhbWVDb250cm9sLnN0YXRlID0gJ2dhbWVvdmVyJztcclxuICAgIGdhbWVDb250cm9sLnNjb3JlID0gMDtcclxufVxyXG5cclxuZ2FtZUNvbnRyb2wucGF1c2VCdXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuZ2FtZUNvbnRyb2wucmVzZXRCdXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbmdhbWVDb250cm9sLnN0YXJ0QnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZSlcclxuZ2FtZUNvbnRyb2wucGF1c2VCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGF1c2VHYW1lKVxyXG5nYW1lQ29udHJvbC5yZXNldEJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXNldEdhbWUpXHJcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21Gcm9tUmFuZ2UobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNGcm9tUmFuZ2UocmFuZ2VzID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICAgIFhNaW4gPSBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCxcbiAgICAgICAgWE1heCA9IEdhbWVDb250cm9sLm1hcFNpemUsXG4gICAgICAgIFlNaW4gPSBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCxcbiAgICAgICAgWU1heCA9IEdhbWVDb250cm9sLm1hcFNpemUsXG4gICAgfSA9IHJhbmdlcztcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBnZXRSYW5kb21Gcm9tUmFuZ2UoWE1pbiwgWE1heCksXG4gICAgICAgIHk6IGdldFJhbmRvbUZyb21SYW5nZShZTWluLCBZTWF4KVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb2xpc2lvbnMoY29vcmRpbmF0ZXMxLCBjb29yZGluYXRlczIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBjb29yZGluYXRlczEueCA9PT0gY29vcmRpbmF0ZXMyLnhcbiAgICAgICAgJiYgY29vcmRpbmF0ZXMxLnkgPT09IGNvb3JkaW5hdGVzMi55XG4gICAgKVxufVxuXG4vLyBTaW5nbGV0b24gY2xhc3Mgb2YgZ2FtZSBtYXBcbmV4cG9ydCBjbGFzcyBHYW1lQ29udHJvbCB7XG4gICAgc3RhdGljIF9pbnN0YW5jZSA9IG51bGw7XG4gICAgc3RhdGljIG1hcFNpemUgPSAyNTtcbiAgICBzdGF0aWMgbG93ZXN0SW5kZXggPSAwO1xuICAgIHN0YXRpYyBnYW1lTG9vcFJlZnJlc2hSYXRlID0gMTAwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmIChHYW1lQ29udHJvbC5faW5zdGFuY2UgIT0gbnVsbCkgcmV0dXJuIEdhbWVDb250cm9sLl9pbnN0YW5jZVxuXG4gICAgICAgIHRoaXMuZ2FtZU1hcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU1hcCcpO1xuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpO1xuICAgICAgICB0aGlzLnJlc2V0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldEJ1dHRvbicpO1xuICAgICAgICB0aGlzLnBhdXNlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXVzZUJ1dHRvbicpO1xuICAgICAgICB0aGlzLnN0YXJ0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydEJ1dHRvbicpO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZU1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTdGF0ZU1lc3NhZ2UnKTtcblxuICAgICAgICB0aGlzLl9zY29yZSA9IDA7XG4gICAgICAgIC8vIHN0YXRlczogcGF1c2V8cGxheXxiZWdpbnxnYW1lb3ZlclxuICAgICAgICB0aGlzLl9zdGF0ZSA9ICdiZWdpbic7XG4gICAgICAgIHRoaXMuZ2FtZU1hcCA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGVsZW1zQ291bnQgPSBHYW1lQ29udHJvbC5tYXBTaXplICoqIDI7XG4gICAgICAgIC8vIFBhaW50IGNlbGxzIG9uIG1hcFxuICAgICAgICBmb3IgKGxldCBpID0gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXg7IGkgPCBlbGVtc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1hcEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgICAgICB0aGlzLmdhbWVNYXAucHVzaChjZWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVDb250cm9sLl9pbnN0YW5jZSA9IHRoaXNcbiAgICB9O1xuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgIH1cbiAgICBzZXQgc3RhdGUobmV4dFN0YXRlKSB7XG4gICAgICAgIGxldCBtZXNzYWdlO1xuICAgICAgICBzd2l0Y2ggKG5leHRTdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnR2FtZSB3YXMgc3RvcGVkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BsYXknOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnUGxheSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiZWdpbic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdTdGFydCBnYW1lJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2dhbWVvdmVyJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYFlvdSBhcmUgbG9zZS4gWW91ciBzY29yZSBpcyAke3RoaXMuc2NvcmV9YDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdVbmRlZmluZWQgc3RhdGUnO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuZGVmaW5lZCBzdGF0ZTogJywgdGhpcy5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lU3RhdGVNZXNzYWdlRWxlbWVudC5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICB9XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcmU7XG4gICAgfVxuICAgIHNldCBzY29yZShuZXh0U2NvcmUpIHtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gbmV4dFNjb3JlO1xuICAgICAgICB0aGlzLl9zY29yZSA9IG5leHRTY29yZTtcbiAgICB9XG5cbiAgICBnZXRDZWxsKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVNYXBbY29vcmRpbmF0ZXMueSAqIEdhbWVDb250cm9sLm1hcFNpemUgKyBjb29yZGluYXRlcy54XTtcbiAgICB9O1xufVxuIiwiaW1wb3J0IHtcbiAgICBnZXRDb29yZGluYXRlc0Zyb21SYW5nZSxcbiAgICBoYXNDb2xpc2lvbnMsXG4gICAgR2FtZUNvbnRyb2wsXG59IGZyb20gJy4vbWFwQ29udHJvbCdcblxuY29uc3QgZGVmYXVsdFNuYWtlV2lkdGggPSAzO1xuXG5jb25zdCBnYW1lQ29udHJvbCA9IG5ldyBHYW1lQ29udHJvbCgpO1xuZXhwb3J0IGNsYXNzIFNuYWtlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gZ2V0IHh5IGZvciBoZWFkXG4gICAgICAgIGNvbnN0IGhlYWRDb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzRnJvbVJhbmdlKHtcbiAgICAgICAgICAgIFhNaW46IEdhbWVDb250cm9sLmxvd2VzdEluZGV4ICsgZGVmYXVsdFNuYWtlV2lkdGgsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBnZW5lcmF0ZSBjb29yZGluYXRlcyBmb3IgYm9keSBvZiBzbmFrZVxuICAgICAgICBjb25zdCBzbmFrZUJvZHlDb29yZGluYXRlcyA9IFtcbiAgICAgICAgICAgIHsgeDogaGVhZENvb3JkaW5hdGVzLngsIHk6IGhlYWRDb29yZGluYXRlcy55IH0sXG4gICAgICAgICAgICB7IHg6IGhlYWRDb29yZGluYXRlcy54IC0gMSwgeTogaGVhZENvb3JkaW5hdGVzLnkgfSxcbiAgICAgICAgICAgIHsgeDogaGVhZENvb3JkaW5hdGVzLnggLSAyLCB5OiBoZWFkQ29vcmRpbmF0ZXMueSB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuYm9keUNvb3JkaW5hdGVzID0gc25ha2VCb2R5Q29vcmRpbmF0ZXM7XG5cbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvblN0YWNrID0gW107XG4gICAgfVxuICAgIGdldEJvZHlDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuYm9keUNvb3JkaW5hdGVzLm1hcChjcm5zID0+IChcbiAgICAgICAgICAgICAgICBnYW1lQ29udHJvbC5nZXRDZWxsKGNybnMpXG4gICAgICAgICAgICApKVxuICAgICAgICApO1xuXG4gICAgfVxuICAgIGNsZWFyU25ha2UoKSB7XG4gICAgICAgIC8vIGdldCBjZWxscyBmcm9tIGNvb3JkaW5hdGVzXG4gICAgICAgIGNvbnN0IHNuYWtlQm9keUNlbGxzID0gdGhpcy5nZXRCb2R5Q2VsbHMoKTtcbiAgICAgICAgc25ha2VCb2R5Q2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc25ha2VIZWFkJylcbiAgICAgICAgICAgIGVsc2UgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzbmFrZUJvZHknKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBkcmF3U25ha2UoKSB7XG4gICAgICAgIC8vIGdldCBjZWxscyBmcm9tIGNvb3JkaW5hdGVzXG4gICAgICAgIGNvbnN0IHNuYWtlQm9keUNlbGxzID0gdGhpcy5nZXRCb2R5Q2VsbHMoKTtcbiAgICAgICAgLy8gbWFyayBjZWxscyBhcyBzbmFrZVxuICAgICAgICBzbmFrZUJvZHlDZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkgY2VsbC5jbGFzc0xpc3QuYWRkKCdzbmFrZUhlYWQnKVxuICAgICAgICAgICAgZWxzZSBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NuYWtlQm9keScpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE5leHRIZWFkQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IGhlYWQgPSB0aGlzLmJvZHlDb29yZGluYXRlc1swXTtcbiAgICAgICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAvLyBpZiBjdXJyZW50IGhlYWQgaXMgb24gYm9yZGVyIFxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGhlYWQueCA9PT0gR2FtZUNvbnRyb2wubWFwU2l6ZSAtIDEgPyBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCA6IGhlYWQueCArIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IGhlYWQueSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogaGVhZC54ID09PSAwID8gR2FtZUNvbnRyb2wubWFwU2l6ZSAtIDEgOiBoZWFkLnggLSAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBoZWFkLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBoZWFkLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IGhlYWQueSA9PT0gMCA/IEdhbWVDb250cm9sLm1hcFNpemUgLSAxIDogaGVhZC55IC0gMSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogaGVhZC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBoZWFkLnkgPT09IEdhbWVDb250cm9sLm1hcFNpemUgLSAxID8gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXggOiBoZWFkLnkgKyAxLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VEaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBjb2RlIH0gPSBldmVudDtcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9ICcnO1xuICAgIFxuICAgICAgICBpZiAoY29kZSA9PT0gJ0Fycm93TGVmdCcgJiYgdGhpcy5kaXJlY3Rpb24gIT09ICdyaWdodCcpIGRpcmVjdGlvbiA9ICdsZWZ0J1xuICAgICAgICBlbHNlIGlmIChjb2RlID09PSAnQXJyb3dSaWdodCcgJiYgdGhpcy5kaXJlY3Rpb24gIT09ICdsZWZ0JykgZGlyZWN0aW9uID0gJ3JpZ2h0J1xuICAgICAgICBlbHNlIGlmIChjb2RlID09PSAnQXJyb3dVcCcgJiYgdGhpcy5kaXJlY3Rpb24gIT09ICdkb3duJykgZGlyZWN0aW9uID0gJ3VwJ1xuICAgICAgICBlbHNlIGlmIChjb2RlID09PSAnQXJyb3dEb3duJyAmJiB0aGlzLmRpcmVjdGlvbiAhPT0gJ3VwJykgZGlyZWN0aW9uID0gJ2Rvd24nXG4gICAgICAgIFxuICAgICAgICBjb25zdCBpc0NoYW5nZURpcmVjdGlvbiA9IGRpcmVjdGlvbiAhPT0gJydcbiAgICAgICAgaWYgKGlzQ2hhbmdlRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWxsb3dDaGFuZ2VEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvblN0YWNrLnB1c2goKCkgPT4gdGhpcy5jaGFuZ2VEaXJlY3Rpb24oZXZlbnQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgICAgIHRoaXMuYWxsb3dDaGFuZ2VEaXJlY3Rpb24gPSBmYWxzZTsgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlRGlyZWN0aW9uO1xuICAgIH1cbiAgICBtb3ZlKG1vdXNlKSB7XG4gICAgICAgIGNvbnN0IHsgYm9keUNvb3JkaW5hdGVzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBuZXh0SGVhZENvb3JkaW5hdGVzID0gdGhpcy5nZXROZXh0SGVhZENvb3JkaW5hdGVzKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRIZWFkQ2VsbCA9IGdhbWVDb250cm9sLmdldENlbGwoYm9keUNvb3JkaW5hdGVzWzBdKTtcbiAgICAgICAgY29uc3QgdGFpbENvb3JkaW5hdGVzID0gT2JqZWN0LmFzc2lnbih7fSwgYm9keUNvb3JkaW5hdGVzW2JvZHlDb29yZGluYXRlcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZ2FtZUNvbnRyb2wuZ2V0Q2VsbChuZXh0SGVhZENvb3JkaW5hdGVzKS5jbGFzc0xpc3QuY29udGFpbnMoJ3NuYWtlQm9keScpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgaXNDYW5FYXQgPSBoYXNDb2xpc2lvbnMoYm9keUNvb3JkaW5hdGVzWzBdLCBtb3VzZS5jb29yZGluYXRlcylcblxuICAgICAgICBmb3IgKGxldCBpID0gYm9keUNvb3JkaW5hdGVzLmxlbmd0aCAtIDE7IGkgPj0gMTsgaS0tKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJvZHlDb29yZGluYXRlc1tpXSwgYm9keUNvb3JkaW5hdGVzW2kgLSAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmFzc2lnbihib2R5Q29vcmRpbmF0ZXNbMF0sIG5leHRIZWFkQ29vcmRpbmF0ZXMpXG4gICAgICAgIGN1cnJlbnRIZWFkQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzbmFrZUhlYWQnKVxuXG4gICAgICAgIGlmICghaXNDYW5FYXQpIHtcbiAgICAgICAgICAgIGdhbWVDb250cm9sLmdldENlbGwodGFpbENvb3JkaW5hdGVzKS5jbGFzc0xpc3QucmVtb3ZlKCdzbmFrZUJvZHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0NhbkVhdCkge1xuICAgICAgICAgICAgYm9keUNvb3JkaW5hdGVzLnB1c2godGFpbENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGN1cnJlbnRIZWFkQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdtb3VzZScpO1xuICAgICAgICAgICAgbW91c2UuY29vcmRpbmF0ZXMgPSBNb3VzZS5zcGF3bk1vdXNlKCk7XG4gICAgICAgICAgICBnYW1lQ29udHJvbC5zY29yZSA9IGdhbWVDb250cm9sLnNjb3JlICsgMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3VzZSB7XG4gICAgc3RhdGljIHNwYXduTW91c2UoKSB7XG4gICAgICAgIGxldCBtb3VzZUNvb3JkaW5hdGVzID0gZ2V0Q29vcmRpbmF0ZXNGcm9tUmFuZ2UoKTtcbiAgICAgICAgbGV0IG1vdXNlQ2VsbCA9IGdhbWVDb250cm9sLmdldENlbGwobW91c2VDb29yZGluYXRlcyk7XG4gICAgICAgIHdoaWxlIChtb3VzZUNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbmFrZUJvZHknLCAnc25ha2VIZWFkJykpIHtcbiAgICAgICAgICAgIG1vdXNlQ29vcmRpbmF0ZXMgPSBnZXRDb29yZGluYXRlc0Zyb21SYW5nZSgpO1xuICAgICAgICAgICAgbW91c2VDZWxsID0gZ2FtZUNvbnRyb2wuZ2V0Q2VsbChtb3VzZUNvb3JkaW5hdGVzKTtcbiAgICAgICAgfVxuICAgICAgICBtb3VzZUNlbGwuY2xhc3NMaXN0LmFkZCgnbW91c2UnKTtcblxuICAgICAgICByZXR1cm4gbW91c2VDb29yZGluYXRlc1xuICAgIH1cbiAgICBjbGVhck1vdXNlKCkge1xuICAgICAgICBnYW1lQ29udHJvbC5nZXRDZWxsKHRoaXMuY29vcmRpbmF0ZXMpLmNsYXNzTGlzdC5yZW1vdmUoJ21vdXNlJylcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBNb3VzZS5zcGF3bk1vdXNlKClcblxuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==