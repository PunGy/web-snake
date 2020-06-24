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
/*! exports provided: getRandomFromRange, hasColisions, GameControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomFromRange", function() { return getRandomFromRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasColisions", function() { return hasColisions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameControl", function() { return GameControl; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getRandomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function hasColisions(coordinates1, coordinates2) {
  return coordinates1.x === coordinates2.x && coordinates1.y === coordinates2.y;
} // Singleton class of game map

var GameControl =
/*#__PURE__*/
function () {
  // size of cell in pixel
  function GameControl() {
    _classCallCheck(this, GameControl);

    if (GameControl._instance != null) return GameControl._instance;
    this.gameMapElement = document.getElementById('gameMap');
    this.scoreElement = document.getElementById('score');
    this.resetButtonElement = document.getElementById('resetButton');
    this.pauseButtonElement = document.getElementById('pauseButton');
    this.startButtonElement = document.getElementById('startButton');
    this.gameStateMessageElement = document.getElementById('gameStateMessage');
    this.gameMapElement.width = GameControl.mapWidthPX;
    this.gameMapElement.height = GameControl.mapHeightPX;

    var _GameControl$getMapSi = GameControl.getMapSize(),
        width = _GameControl$getMapSi.width,
        height = _GameControl$getMapSi.height;

    this.gameMap = Array.from({
      length: width
    }, function () {
      return Array(height).fill(0);
    });
    this._score = 0; // states: pause|play|begin|gameover

    this._state = 'begin';
    this.ctx = this.gameMapElement.getContext('2d'); // fill game map

    this.drawBackground();
    GameControl._instance = this;
  }

  _createClass(GameControl, [{
    key: "getObject",
    value: function getObject(_ref) {
      var x = _ref.x,
          y = _ref.y;
      return this.gameMap[x][y];
    }
  }, {
    key: "drawBackground",
    value: function drawBackground() {
      this.ctx.fillStyle = GameControl.backgroundColor;
      this.ctx.fillRect(GameControl.lowestIndex, GameControl.lowestIndex, GameControl.mapWidthPX, GameControl.mapHeightPX);
    }
  }, {
    key: "drawCell",
    value: function drawCell(_ref2, color, object) {
      var x = _ref2.x,
          y = _ref2.y;
      var ctx = this.ctx,
          gameMap = this.gameMap;
      var cellSize = GameControl.cellSize,
          backgroundColor = GameControl.backgroundColor;
      ctx.fillStyle = color || backgroundColor;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
      gameMap[x][y] = object;
    }
  }, {
    key: "clearCell",
    value: function clearCell(_ref3, nextObject) {
      var x = _ref3.x,
          y = _ref3.y;
      var cellSize = GameControl.cellSize,
          backgroundColor = GameControl.backgroundColor;
      this.ctx.fillStyle = backgroundColor;
      this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      this.gameMap[x][y] = nextObject || 0;
    }
  }, {
    key: "getCoordinatesFromRange",
    value: function getCoordinatesFromRange() {
      var ranges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var checkCollisions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var _GameControl$getMapSi2 = GameControl.getMapSize(),
          width = _GameControl$getMapSi2.width,
          height = _GameControl$getMapSi2.height;

      var _ranges$XMin = ranges.XMin,
          XMin = _ranges$XMin === void 0 ? GameControl.lowestIndex : _ranges$XMin,
          _ranges$XMax = ranges.XMax,
          XMax = _ranges$XMax === void 0 ? width : _ranges$XMax,
          _ranges$YMin = ranges.YMin,
          YMin = _ranges$YMin === void 0 ? GameControl.lowestIndex : _ranges$YMin,
          _ranges$YMax = ranges.YMax,
          YMax = _ranges$YMax === void 0 ? height : _ranges$YMax;
      var x = getRandomFromRange(XMin, XMax),
          y = getRandomFromRange(YMin, YMax);

      while (checkCollisions && this.gameMap[x][y] !== 0) {
        x = getRandomFromRange(XMin, XMax);
        y = getRandomFromRange(YMin, YMax);
      }

      return {
        x: x,
        y: y
      };
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
  }], [{
    key: "getMapSize",
    value: function getMapSize() {
      var mapWidthPX = GameControl.mapWidthPX,
          mapHeightPX = GameControl.mapHeightPX,
          cellSize = GameControl.cellSize;
      return {
        width: Math.floor(mapWidthPX / cellSize),
        height: Math.floor(mapHeightPX / cellSize)
      };
    }
  }]);

  return GameControl;
}();

_defineProperty(GameControl, "_instance", null);

_defineProperty(GameControl, "cellSize", 20);

_defineProperty(GameControl, "lowestIndex", 0);

_defineProperty(GameControl, "gameLoopRefreshRate", 100);

_defineProperty(GameControl, "backgroundColor", '#eeeeee');

_defineProperty(GameControl, "mapWidthPX", 500);

_defineProperty(GameControl, "mapHeightPX", 500);

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
var EMPTY = 0;
var SNAKE_HEAD = 1;
var SNAKE_BODY = 2;
var MOUSE = 3;
var SNAKE_HEAD_COLOR = 'black';
var SNAKE_BODY_COLOR = 'red';
var MOUSE_COLOR = 'blue';
var gameControl = new _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"]();
var Snake =
/*#__PURE__*/
function () {
  function Snake() {
    _classCallCheck(this, Snake);

    // get xy for head
    var headCoordinates = gameControl.getCoordinatesFromRange({
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
      this.bodyCoordinates.forEach(function (crns) {
        gameControl.clearCell(crns);
      });
    }
  }, {
    key: "drawSnake",
    value: function drawSnake() {
      this.bodyCoordinates.forEach(function (crns, i) {
        if (i === 0) gameControl.drawCell(crns, SNAKE_HEAD_COLOR, SNAKE_HEAD);else gameControl.drawCell(crns, SNAKE_BODY_COLOR, SNAKE_BODY);
      });
    }
  }, {
    key: "getNextHeadCoordinates",
    value: function getNextHeadCoordinates() {
      var head = this.bodyCoordinates[0];

      var _GameControl$getMapSi = _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].getMapSize(),
          width = _GameControl$getMapSi.width,
          height = _GameControl$getMapSi.height;

      switch (this.direction) {
        // if current head is on border 
        case 'right':
          return {
            x: head.x === width - 1 ? _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].lowestIndex : head.x + 1,
            y: head.y
          };

        case 'left':
          return {
            x: head.x === 0 ? width - 1 : head.x - 1,
            y: head.y
          };

        case 'up':
          return {
            x: head.x,
            y: head.y === 0 ? height - 1 : head.y - 1
          };

        case 'down':
          return {
            x: head.x,
            y: head.y === height - 1 ? _mapControl__WEBPACK_IMPORTED_MODULE_0__["GameControl"].lowestIndex : head.y + 1
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
      var currentHeadCoordinates = bodyCoordinates[0];
      var tailCoordinates = Object.assign({}, bodyCoordinates[bodyCoordinates.length - 1]);
      if (gameControl.getObject(nextHeadCoordinates) === SNAKE_BODY) return false;
      var isCanEat = Object(_mapControl__WEBPACK_IMPORTED_MODULE_0__["hasColisions"])(currentHeadCoordinates, mouse.coordinates);

      for (var i = bodyCoordinates.length - 1; i >= 1; i--) {
        Object.assign(bodyCoordinates[i], bodyCoordinates[i - 1]);
      }

      Object.assign(bodyCoordinates[0], nextHeadCoordinates);
      gameControl.clearCell(currentHeadCoordinates, SNAKE_BODY);

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
  }]);

  return Snake;
}();
var Mouse =
/*#__PURE__*/
function () {
  _createClass(Mouse, [{
    key: "clearMouse",
    value: function clearMouse() {
      gameControl.clearCell(this.coordinates);
    }
  }], [{
    key: "spawnMouse",
    value: function spawnMouse() {
      var mouseCoordinates = gameControl.getCoordinatesFromRange();
      gameControl.drawCell(mouseCoordinates, MOUSE_COLOR, MOUSE);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcENvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdENvbnRyb2wuanMiXSwibmFtZXMiOlsiZ2FtZUNvbnRyb2wiLCJHYW1lQ29udHJvbCIsInNuYWtlIiwiU25ha2UiLCJtb3VzZSIsIk1vdXNlIiwiZHJhd1NuYWtlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjaGFuZ2VEaXJlY3Rpb24iLCJjb2RlIiwic3RhdGUiLCJzdGFydEdhbWUiLCJwYXVzZUdhbWUiLCJyZXNldEdhbWUiLCJnYW1lTG9vcCIsImdhbWVMb29wRm4iLCJpc1N1Y2Nlc3NmdWxsIiwibW92ZSIsImdhbWVPdmVyIiwiYWxsb3dDaGFuZ2VEaXJlY3Rpb24iLCJjaGFuZ2VEaXJlY3Rpb25TdGFjayIsImxlbmd0aCIsInNoaWZ0IiwicmVzZXRNYXAiLCJjbGVhclNuYWtlIiwiY29uc3RydWN0b3IiLCJjbGVhck1vdXNlIiwic2V0SW50ZXJ2YWwiLCJnYW1lTG9vcFJlZnJlc2hSYXRlIiwic3RhcnRCdXR0b25FbGVtZW50IiwiZGlzYWJsZWQiLCJwYXVzZUJ1dHRvbkVsZW1lbnQiLCJyZXNldEJ1dHRvbkVsZW1lbnQiLCJjbGVhckludGVydmFsIiwic2NvcmUiLCJnZXRSYW5kb21Gcm9tUmFuZ2UiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJoYXNDb2xpc2lvbnMiLCJjb29yZGluYXRlczEiLCJjb29yZGluYXRlczIiLCJ4IiwieSIsIl9pbnN0YW5jZSIsImdhbWVNYXBFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzY29yZUVsZW1lbnQiLCJnYW1lU3RhdGVNZXNzYWdlRWxlbWVudCIsIndpZHRoIiwibWFwV2lkdGhQWCIsImhlaWdodCIsIm1hcEhlaWdodFBYIiwiZ2V0TWFwU2l6ZSIsImdhbWVNYXAiLCJBcnJheSIsImZyb20iLCJmaWxsIiwiX3Njb3JlIiwiX3N0YXRlIiwiY3R4IiwiZ2V0Q29udGV4dCIsImRyYXdCYWNrZ3JvdW5kIiwiZmlsbFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiZmlsbFJlY3QiLCJsb3dlc3RJbmRleCIsImNvbG9yIiwib2JqZWN0IiwiY2VsbFNpemUiLCJuZXh0T2JqZWN0IiwicmFuZ2VzIiwiY2hlY2tDb2xsaXNpb25zIiwiWE1pbiIsIlhNYXgiLCJZTWluIiwiWU1heCIsIm5leHRTdGF0ZSIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZXJyb3IiLCJpbm5lclRleHQiLCJuZXh0U2NvcmUiLCJkZWZhdWx0U25ha2VXaWR0aCIsIkVNUFRZIiwiU05BS0VfSEVBRCIsIlNOQUtFX0JPRFkiLCJNT1VTRSIsIlNOQUtFX0hFQURfQ09MT1IiLCJTTkFLRV9CT0RZX0NPTE9SIiwiTU9VU0VfQ09MT1IiLCJoZWFkQ29vcmRpbmF0ZXMiLCJnZXRDb29yZGluYXRlc0Zyb21SYW5nZSIsInNuYWtlQm9keUNvb3JkaW5hdGVzIiwiYm9keUNvb3JkaW5hdGVzIiwiZGlyZWN0aW9uIiwibWFwIiwiY3JucyIsImdldENlbGwiLCJmb3JFYWNoIiwiY2xlYXJDZWxsIiwiaSIsImRyYXdDZWxsIiwiaGVhZCIsImlzQ2hhbmdlRGlyZWN0aW9uIiwicHVzaCIsIm5leHRIZWFkQ29vcmRpbmF0ZXMiLCJnZXROZXh0SGVhZENvb3JkaW5hdGVzIiwiY3VycmVudEhlYWRDb29yZGluYXRlcyIsInRhaWxDb29yZGluYXRlcyIsIk9iamVjdCIsImFzc2lnbiIsImdldE9iamVjdCIsImlzQ2FuRWF0IiwiY29vcmRpbmF0ZXMiLCJzcGF3bk1vdXNlIiwibW91c2VDb29yZGluYXRlcyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFD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QTtBQUFBO0FBQUE7QUFBQSxpQ0FPaUI7QUFDVEwsaUJBQVcsQ0FBQ3dHLFNBQVosQ0FBc0IsS0FBS2MsV0FBM0I7QUFDSDtBQVRMO0FBQUE7QUFBQSxpQ0FDd0I7QUFDaEIsVUFBSUUsZ0JBQWdCLEdBQUd4SCxXQUFXLENBQUNnRyx1QkFBWixFQUF2QjtBQUNBaEcsaUJBQVcsQ0FBQzBHLFFBQVosQ0FBcUJjLGdCQUFyQixFQUF1QzFCLFdBQXZDLEVBQW9ESCxLQUFwRDtBQUVBLGFBQU82QixnQkFBUDtBQUNIO0FBTkw7O0FBV0ksbUJBQWM7QUFBQTs7QUFDVixRQUFNRixXQUFXLEdBQUdqSCxLQUFLLENBQUNrSCxVQUFOLEVBQXBCO0FBRUEsU0FBS0QsV0FBTCxHQUFtQkEsV0FBbkI7QUFDSDs7QUFmTDtBQUFBLEkiLCJmaWxlIjoiZ2FtZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLmpzXCIpO1xuIiwiaW1wb3J0IHtcclxuICAgIFNuYWtlLCBNb3VzZVxyXG59IGZyb20gJy4vb2JqZWN0Q29udHJvbCdcclxuaW1wb3J0IHsgR2FtZUNvbnRyb2wgfSBmcm9tICcuL21hcENvbnRyb2wnO1xyXG5cclxuY29uc3QgZ2FtZUNvbnRyb2wgPSBuZXcgR2FtZUNvbnRyb2woKTtcclxuY29uc3Qgc25ha2UgPSBuZXcgU25ha2UoKTtcclxuY29uc3QgbW91c2UgPSBuZXcgTW91c2UoKTtcclxuc25ha2UuZHJhd1NuYWtlKCk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAvLyBpZiBpdCBpcyBub3QgYSBjaGFuZ2UgZGlyZWN0aW9uIGNsaWNrXHJcbiAgICBpZiAoIXNuYWtlLmNoYW5nZURpcmVjdGlvbihldmVudCkpIHtcclxuICAgICAgICBjb25zdCB7IGNvZGUgfSA9IGV2ZW50O1xyXG5cclxuICAgICAgICBpZiAoY29kZSA9PT0gJ0VudGVyJyAmJiBnYW1lQ29udHJvbC5zdGF0ZSAhPT0gJ3BsYXknKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gJ1NwYWNlJyAmJiBnYW1lQ29udHJvbC5zdGF0ZSA9PT0gJ3BsYXknIHx8IGdhbWVDb250cm9sLnN0YXRlID09PSAncGF1c2UnKSB7XHJcbiAgICAgICAgICAgIGlmIChnYW1lQ29udHJvbC5zdGF0ZSA9PT0gJ3BhdXNlJykgc3RhcnRHYW1lKClcclxuICAgICAgICAgICAgZWxzZSBwYXVzZUdhbWUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09ICdFc2NhcGUnICYmIGdhbWVDb250cm9sLnN0YXRlICE9PSAnYmVnaW4nKSB7XHJcbiAgICAgICAgICAgIHJlc2V0R2FtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuXHJcbmxldCBnYW1lTG9vcCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBnYW1lTG9vcEZuKCkge1xyXG4gICAgY29uc3QgaXNTdWNjZXNzZnVsbCA9IHNuYWtlLm1vdmUobW91c2UpO1xyXG4gICAgaWYgKCFpc1N1Y2Nlc3NmdWxsKSB7XHJcbiAgICAgICAgZ2FtZU92ZXIoKTtcclxuICAgIH1cclxuICAgIHNuYWtlLmRyYXdTbmFrZSgpO1xyXG4gICAgc25ha2UuYWxsb3dDaGFuZ2VEaXJlY3Rpb24gPSB0cnVlO1xyXG4gICAgaWYgKHNuYWtlLmNoYW5nZURpcmVjdGlvblN0YWNrLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgc25ha2UuY2hhbmdlRGlyZWN0aW9uU3RhY2suc2hpZnQoKSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldE1hcCgpIHtcclxuICAgIHNuYWtlLmNsZWFyU25ha2UoKTtcclxuICAgIHNuYWtlLmNvbnN0cnVjdG9yKCk7XHJcbiAgICBzbmFrZS5kcmF3U25ha2UoKTtcclxuXHJcbiAgICBtb3VzZS5jbGVhck1vdXNlKCk7XHJcbiAgICBtb3VzZS5jb25zdHJ1Y3RvcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XHJcbiAgICBpZiAoZ2FtZUNvbnRyb2wuc3RhdGUgPT09ICdnYW1lb3ZlcicpIHtcclxuICAgICAgICByZXNldE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdhbWVMb29wID0gc2V0SW50ZXJ2YWwoZ2FtZUxvb3BGbiwgR2FtZUNvbnRyb2wuZ2FtZUxvb3BSZWZyZXNoUmF0ZSk7XHJcbiAgICBnYW1lQ29udHJvbC5zdGF0ZSA9ICdwbGF5JztcclxuXHJcbiAgICBnYW1lQ29udHJvbC5zdGFydEJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgZ2FtZUNvbnRyb2wucGF1c2VCdXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBnYW1lQ29udHJvbC5yZXNldEJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcclxufVxyXG5mdW5jdGlvbiBwYXVzZUdhbWUoKSB7XHJcbiAgICBpZiAoZ2FtZUxvb3ApIGNsZWFySW50ZXJ2YWwoZ2FtZUxvb3ApO1xyXG5cclxuICAgIGdhbWVDb250cm9sLnN0YXRlID0gJ3BhdXNlJztcclxuXHJcbiAgICBnYW1lQ29udHJvbC5zdGFydEJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGdhbWVDb250cm9sLnBhdXNlQnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XHJcbn1cclxuZnVuY3Rpb24gcmVzZXRHYW1lKCkge1xyXG4gICAgaWYgKGdhbWVMb29wKSBjbGVhckludGVydmFsKGdhbWVMb29wKTtcclxuXHJcbiAgICBnYW1lQ29udHJvbC5zdGF0ZSA9ICdiZWdpbic7XHJcbiAgICBnYW1lQ29udHJvbC5zY29yZSA9IDA7XHJcblxyXG4gICAgZ2FtZUNvbnRyb2wuc3RhcnRCdXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBnYW1lQ29udHJvbC5wYXVzZUJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgZ2FtZUNvbnRyb2wucmVzZXRCdXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICByZXNldE1hcCgpO1xyXG59XHJcbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xyXG4gICAgaWYgKGdhbWVMb29wKSBjbGVhckludGVydmFsKGdhbWVMb29wKTtcclxuXHJcbiAgICBnYW1lQ29udHJvbC5wYXVzZUJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgZ2FtZUNvbnRyb2wucmVzZXRCdXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIGdhbWVDb250cm9sLnN0YXJ0QnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIGdhbWVDb250cm9sLnN0YXRlID0gJ2dhbWVvdmVyJztcclxuICAgIGdhbWVDb250cm9sLnNjb3JlID0gMDtcclxufVxyXG5cclxuZ2FtZUNvbnRyb2wucGF1c2VCdXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuZ2FtZUNvbnRyb2wucmVzZXRCdXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbmdhbWVDb250cm9sLnN0YXJ0QnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZSlcclxuZ2FtZUNvbnRyb2wucGF1c2VCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGF1c2VHYW1lKVxyXG5nYW1lQ29udHJvbC5yZXNldEJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXNldEdhbWUpXHJcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21Gcm9tUmFuZ2UobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ29saXNpb25zKGNvb3JkaW5hdGVzMSwgY29vcmRpbmF0ZXMyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgY29vcmRpbmF0ZXMxLnggPT09IGNvb3JkaW5hdGVzMi54XG4gICAgICAgICYmIGNvb3JkaW5hdGVzMS55ID09PSBjb29yZGluYXRlczIueVxuICAgIClcbn1cblxuLy8gU2luZ2xldG9uIGNsYXNzIG9mIGdhbWUgbWFwXG5leHBvcnQgY2xhc3MgR2FtZUNvbnRyb2wge1xuICAgIHN0YXRpYyBfaW5zdGFuY2UgPSBudWxsO1xuICAgIHN0YXRpYyBjZWxsU2l6ZSA9IDIwOyAvLyBzaXplIG9mIGNlbGwgaW4gcGl4ZWxcbiAgICBzdGF0aWMgbG93ZXN0SW5kZXggPSAwO1xuICAgIHN0YXRpYyBnYW1lTG9vcFJlZnJlc2hSYXRlID0gMTAwO1xuICAgIHN0YXRpYyBiYWNrZ3JvdW5kQ29sb3IgPSAnI2VlZWVlZSc7XG4gICAgc3RhdGljIG1hcFdpZHRoUFggPSA1MDA7XG4gICAgc3RhdGljIG1hcEhlaWdodFBYID0gNTAwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmIChHYW1lQ29udHJvbC5faW5zdGFuY2UgIT0gbnVsbCkgcmV0dXJuIEdhbWVDb250cm9sLl9pbnN0YW5jZTtcblxuICAgICAgICB0aGlzLmdhbWVNYXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVNYXAnKTtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKTtcbiAgICAgICAgdGhpcy5yZXNldEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRCdXR0b24nKTtcbiAgICAgICAgdGhpcy5wYXVzZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF1c2VCdXR0b24nKTtcbiAgICAgICAgdGhpcy5zdGFydEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRCdXR0b24nKTtcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVNZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU3RhdGVNZXNzYWdlJyk7XG5cbiAgICAgICAgdGhpcy5nYW1lTWFwRWxlbWVudC53aWR0aCA9IEdhbWVDb250cm9sLm1hcFdpZHRoUFhcbiAgICAgICAgdGhpcy5nYW1lTWFwRWxlbWVudC5oZWlnaHQgPSBHYW1lQ29udHJvbC5tYXBIZWlnaHRQWFxuXG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gR2FtZUNvbnRyb2wuZ2V0TWFwU2l6ZSgpXG4gICAgICAgIHRoaXMuZ2FtZU1hcCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHdpZHRoIH0sICgpID0+IEFycmF5KGhlaWdodCkuZmlsbCgwKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9zY29yZSA9IDA7XG4gICAgICAgIC8vIHN0YXRlczogcGF1c2V8cGxheXxiZWdpbnxnYW1lb3ZlclxuICAgICAgICB0aGlzLl9zdGF0ZSA9ICdiZWdpbic7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuZ2FtZU1hcEVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICAvLyBmaWxsIGdhbWUgbWFwXG4gICAgICAgIHRoaXMuZHJhd0JhY2tncm91bmQoKTtcblxuICAgICAgICBHYW1lQ29udHJvbC5faW5zdGFuY2UgPSB0aGlzO1xuICAgIH07XG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuICAgIHNldCBzdGF0ZShuZXh0U3RhdGUpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgICAgIHN3aXRjaCAobmV4dFN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICdwYXVzZSc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdHYW1lIHdhcyBzdG9wZWQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGxheSc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdQbGF5JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JlZ2luJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1N0YXJ0IGdhbWUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZ2FtZW92ZXInOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgWW91IGFyZSBsb3NlLiBZb3VyIHNjb3JlIGlzICR7dGhpcy5zY29yZX1gO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1VuZGVmaW5lZCBzdGF0ZSc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5kZWZpbmVkIHN0YXRlOiAnLCB0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdhbWVTdGF0ZU1lc3NhZ2VFbGVtZW50LmlubmVyVGV4dCA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gbmV4dFN0YXRlO1xuICAgIH1cbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZTtcbiAgICB9XG4gICAgc2V0IHNjb3JlKG5leHRTY29yZSkge1xuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudC5pbm5lclRleHQgPSBuZXh0U2NvcmU7XG4gICAgICAgIHRoaXMuX3Njb3JlID0gbmV4dFNjb3JlO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRNYXBTaXplKCkge1xuICAgICAgICBjb25zdCB7IG1hcFdpZHRoUFgsIG1hcEhlaWdodFBYLCBjZWxsU2l6ZSB9ID0gR2FtZUNvbnRyb2xcbiAgICAgICAgcmV0dXJuIHsgd2lkdGg6IE1hdGguZmxvb3IobWFwV2lkdGhQWCAvIGNlbGxTaXplKSwgaGVpZ2h0OiBNYXRoLmZsb29yKG1hcEhlaWdodFBYIC8gY2VsbFNpemUpIH1cbiAgICB9XG4gICAgZ2V0T2JqZWN0KHsgeCwgeSB9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVNYXBbeF1beV07XG4gICAgfTtcbiAgICBkcmF3QmFja2dyb3VuZCgpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gR2FtZUNvbnRyb2wuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChHYW1lQ29udHJvbC5sb3dlc3RJbmRleCwgR2FtZUNvbnRyb2wubG93ZXN0SW5kZXgsIEdhbWVDb250cm9sLm1hcFdpZHRoUFgsIEdhbWVDb250cm9sLm1hcEhlaWdodFBYKTtcbiAgICB9XG4gICAgZHJhd0NlbGwoeyB4LCB5IH0sIGNvbG9yLCBvYmplY3QpIHtcbiAgICAgICAgY29uc3QgeyBjdHgsIGdhbWVNYXAgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgY2VsbFNpemUsIGJhY2tncm91bmRDb2xvciB9ID0gR2FtZUNvbnRyb2xcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yIHx8IGJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHggKiBjZWxsU2l6ZSwgeSAqIGNlbGxTaXplLCBjZWxsU2l6ZSAtIDEsIGNlbGxTaXplIC0gMSlcbiAgICAgICAgZ2FtZU1hcFt4XVt5XSA9IG9iamVjdFxuICAgIH1cbiAgICBjbGVhckNlbGwoeyB4LCB5IH0sIG5leHRPYmplY3QpIHtcbiAgICAgICAgY29uc3QgeyBjZWxsU2l6ZSwgYmFja2dyb3VuZENvbG9yIH0gPSBHYW1lQ29udHJvbFxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCAqIGNlbGxTaXplLCB5ICogY2VsbFNpemUsIGNlbGxTaXplLCBjZWxsU2l6ZSlcbiAgICAgICAgdGhpcy5nYW1lTWFwW3hdW3ldID0gbmV4dE9iamVjdCB8fCAwXG4gICAgfVxuXG5cbiAgICBnZXRDb29yZGluYXRlc0Zyb21SYW5nZShyYW5nZXMgPSB7fSwgY2hlY2tDb2xsaXNpb25zID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IEdhbWVDb250cm9sLmdldE1hcFNpemUoKVxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBYTWluID0gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXgsXG4gICAgICAgICAgICBYTWF4ID0gd2lkdGgsXG4gICAgICAgICAgICBZTWluID0gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXgsXG4gICAgICAgICAgICBZTWF4ID0gaGVpZ2h0LFxuICAgICAgICB9ID0gcmFuZ2VzO1xuICAgICAgICBsZXQgeCA9IGdldFJhbmRvbUZyb21SYW5nZShYTWluLCBYTWF4KSxcbiAgICAgICAgICAgIHkgPSBnZXRSYW5kb21Gcm9tUmFuZ2UoWU1pbiwgWU1heCk7XG5cbiAgICAgICAgd2hpbGUgKGNoZWNrQ29sbGlzaW9ucyAmJiB0aGlzLmdhbWVNYXBbeF1beV0gIT09IDApIHtcbiAgICAgICAgICAgIHggPSBnZXRSYW5kb21Gcm9tUmFuZ2UoWE1pbiwgWE1heCk7XG4gICAgICAgICAgICB5ID0gZ2V0UmFuZG9tRnJvbVJhbmdlKFlNaW4sIFlNYXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgeCwgeSB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBoYXNDb2xpc2lvbnMsXG4gICAgR2FtZUNvbnRyb2wsXG59IGZyb20gJy4vbWFwQ29udHJvbCdcblxuY29uc3QgZGVmYXVsdFNuYWtlV2lkdGggPSAzO1xuXG5jb25zdCBFTVBUWSA9IDBcbmNvbnN0IFNOQUtFX0hFQUQgPSAxXG5jb25zdCBTTkFLRV9CT0RZID0gMlxuY29uc3QgTU9VU0UgPSAzXG5cbmNvbnN0IFNOQUtFX0hFQURfQ09MT1IgPSAnYmxhY2snXG5jb25zdCBTTkFLRV9CT0RZX0NPTE9SID0gJ3JlZCdcbmNvbnN0IE1PVVNFX0NPTE9SID0gJ2JsdWUnXG5cbmNvbnN0IGdhbWVDb250cm9sID0gbmV3IEdhbWVDb250cm9sKCk7XG5leHBvcnQgY2xhc3MgU25ha2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBnZXQgeHkgZm9yIGhlYWRcbiAgICAgICAgY29uc3QgaGVhZENvb3JkaW5hdGVzID0gZ2FtZUNvbnRyb2wuZ2V0Q29vcmRpbmF0ZXNGcm9tUmFuZ2Uoe1xuICAgICAgICAgICAgWE1pbjogR2FtZUNvbnRyb2wubG93ZXN0SW5kZXggKyBkZWZhdWx0U25ha2VXaWR0aCxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGdlbmVyYXRlIGNvb3JkaW5hdGVzIGZvciBib2R5IG9mIHNuYWtlXG4gICAgICAgIGNvbnN0IHNuYWtlQm9keUNvb3JkaW5hdGVzID0gW1xuICAgICAgICAgICAgeyB4OiBoZWFkQ29vcmRpbmF0ZXMueCwgeTogaGVhZENvb3JkaW5hdGVzLnkgfSxcbiAgICAgICAgICAgIHsgeDogaGVhZENvb3JkaW5hdGVzLnggLSAxLCB5OiBoZWFkQ29vcmRpbmF0ZXMueSB9LFxuICAgICAgICAgICAgeyB4OiBoZWFkQ29vcmRpbmF0ZXMueCAtIDIsIHk6IGhlYWRDb29yZGluYXRlcy55IH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5ib2R5Q29vcmRpbmF0ZXMgPSBzbmFrZUJvZHlDb29yZGluYXRlcztcblxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uU3RhY2sgPSBbXTtcbiAgICB9XG4gICAgZ2V0Qm9keUNlbGxzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5ib2R5Q29vcmRpbmF0ZXMubWFwKGNybnMgPT4gKFxuICAgICAgICAgICAgICAgIGdhbWVDb250cm9sLmdldENlbGwoY3JucylcbiAgICAgICAgICAgICkpXG4gICAgICAgICk7XG5cbiAgICB9XG4gICAgY2xlYXJTbmFrZSgpIHtcbiAgICAgICAgdGhpcy5ib2R5Q29vcmRpbmF0ZXMuZm9yRWFjaCgoY3JucykgPT4ge1xuICAgICAgICAgICAgZ2FtZUNvbnRyb2wuY2xlYXJDZWxsKGNybnMpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGRyYXdTbmFrZSgpIHtcbiAgICAgICAgdGhpcy5ib2R5Q29vcmRpbmF0ZXMuZm9yRWFjaCgoY3JucywgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIGdhbWVDb250cm9sLmRyYXdDZWxsKGNybnMsIFNOQUtFX0hFQURfQ09MT1IsIFNOQUtFX0hFQUQpXG4gICAgICAgICAgICBlbHNlIGdhbWVDb250cm9sLmRyYXdDZWxsKGNybnMsIFNOQUtFX0JPRFlfQ09MT1IsIFNOQUtFX0JPRFkpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE5leHRIZWFkQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IGhlYWQgPSB0aGlzLmJvZHlDb29yZGluYXRlc1swXTtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBHYW1lQ29udHJvbC5nZXRNYXBTaXplKClcbiAgICAgICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAvLyBpZiBjdXJyZW50IGhlYWQgaXMgb24gYm9yZGVyIFxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGhlYWQueCA9PT0gd2lkdGggLSAxID8gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXggOiBoZWFkLnggKyAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBoZWFkLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGhlYWQueCA9PT0gMCA/IHdpZHRoIC0gMSA6IGhlYWQueCAtIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IGhlYWQueSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGhlYWQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogaGVhZC55ID09PSAwID8gaGVpZ2h0IC0gMSA6IGhlYWQueSAtIDEsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGhlYWQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogaGVhZC55ID09PSBoZWlnaHQgLSAxID8gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXggOiBoZWFkLnkgKyAxLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VEaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBjb2RlIH0gPSBldmVudDtcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9ICcnO1xuICAgIFxuICAgICAgICBpZiAoY29kZSA9PT0gJ0Fycm93TGVmdCcgJiYgdGhpcy5kaXJlY3Rpb24gIT09ICdyaWdodCcpIGRpcmVjdGlvbiA9ICdsZWZ0J1xuICAgICAgICBlbHNlIGlmIChjb2RlID09PSAnQXJyb3dSaWdodCcgJiYgdGhpcy5kaXJlY3Rpb24gIT09ICdsZWZ0JykgZGlyZWN0aW9uID0gJ3JpZ2h0J1xuICAgICAgICBlbHNlIGlmIChjb2RlID09PSAnQXJyb3dVcCcgJiYgdGhpcy5kaXJlY3Rpb24gIT09ICdkb3duJykgZGlyZWN0aW9uID0gJ3VwJ1xuICAgICAgICBlbHNlIGlmIChjb2RlID09PSAnQXJyb3dEb3duJyAmJiB0aGlzLmRpcmVjdGlvbiAhPT0gJ3VwJykgZGlyZWN0aW9uID0gJ2Rvd24nXG4gICAgICAgIFxuICAgICAgICBjb25zdCBpc0NoYW5nZURpcmVjdGlvbiA9IGRpcmVjdGlvbiAhPT0gJydcbiAgICAgICAgaWYgKGlzQ2hhbmdlRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWxsb3dDaGFuZ2VEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvblN0YWNrLnB1c2goKCkgPT4gdGhpcy5jaGFuZ2VEaXJlY3Rpb24oZXZlbnQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgICAgIHRoaXMuYWxsb3dDaGFuZ2VEaXJlY3Rpb24gPSBmYWxzZTsgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlRGlyZWN0aW9uO1xuICAgIH1cbiAgICBtb3ZlKG1vdXNlKSB7XG4gICAgICAgIGNvbnN0IHsgYm9keUNvb3JkaW5hdGVzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBuZXh0SGVhZENvb3JkaW5hdGVzID0gdGhpcy5nZXROZXh0SGVhZENvb3JkaW5hdGVzKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRIZWFkQ29vcmRpbmF0ZXMgPSBib2R5Q29vcmRpbmF0ZXNbMF1cbiAgICAgICAgY29uc3QgdGFpbENvb3JkaW5hdGVzID0gT2JqZWN0LmFzc2lnbih7fSwgYm9keUNvb3JkaW5hdGVzW2JvZHlDb29yZGluYXRlcy5sZW5ndGggLSAxXSk7XG5cbiAgICAgICAgaWYgKGdhbWVDb250cm9sLmdldE9iamVjdChuZXh0SGVhZENvb3JkaW5hdGVzKSA9PT0gU05BS0VfQk9EWSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGlzQ2FuRWF0ID0gaGFzQ29saXNpb25zKGN1cnJlbnRIZWFkQ29vcmRpbmF0ZXMsIG1vdXNlLmNvb3JkaW5hdGVzKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBib2R5Q29vcmRpbmF0ZXMubGVuZ3RoIC0gMTsgaSA+PSAxOyBpLS0pIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYm9keUNvb3JkaW5hdGVzW2ldLCBib2R5Q29vcmRpbmF0ZXNbaSAtIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKGJvZHlDb29yZGluYXRlc1swXSwgbmV4dEhlYWRDb29yZGluYXRlcylcbiAgICAgICAgZ2FtZUNvbnRyb2wuY2xlYXJDZWxsKGN1cnJlbnRIZWFkQ29vcmRpbmF0ZXMsIFNOQUtFX0JPRFkpXG5cbiAgICAgICAgaWYgKCFpc0NhbkVhdCkge1xuICAgICAgICAgICAgZ2FtZUNvbnRyb2wuY2xlYXJDZWxsKHRhaWxDb29yZGluYXRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNDYW5FYXQpIHtcbiAgICAgICAgICAgIGJvZHlDb29yZGluYXRlcy5wdXNoKHRhaWxDb29yZGluYXRlcyk7XG4gICAgICAgICAgICBtb3VzZS5jb29yZGluYXRlcyA9IE1vdXNlLnNwYXduTW91c2UoKTtcbiAgICAgICAgICAgIGdhbWVDb250cm9sLnNjb3JlID0gZ2FtZUNvbnRyb2wuc2NvcmUgKyAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdXNlIHtcbiAgICBzdGF0aWMgc3Bhd25Nb3VzZSgpIHtcbiAgICAgICAgbGV0IG1vdXNlQ29vcmRpbmF0ZXMgPSBnYW1lQ29udHJvbC5nZXRDb29yZGluYXRlc0Zyb21SYW5nZSgpO1xuICAgICAgICBnYW1lQ29udHJvbC5kcmF3Q2VsbChtb3VzZUNvb3JkaW5hdGVzLCBNT1VTRV9DT0xPUiwgTU9VU0UpO1xuXG4gICAgICAgIHJldHVybiBtb3VzZUNvb3JkaW5hdGVzXG4gICAgfVxuICAgIGNsZWFyTW91c2UoKSB7XG4gICAgICAgIGdhbWVDb250cm9sLmNsZWFyQ2VsbCh0aGlzLmNvb3JkaW5hdGVzKVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IE1vdXNlLnNwYXduTW91c2UoKVxuXG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9