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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/objectControl.js");
/******/ })
/************************************************************************/
/******/ ({

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcENvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdENvbnRyb2wuanMiXSwibmFtZXMiOlsiZ2V0UmFuZG9tRnJvbVJhbmdlIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0Q29vcmRpbmF0ZXNGcm9tUmFuZ2UiLCJyYW5nZXMiLCJYTWluIiwiR2FtZUNvbnRyb2wiLCJsb3dlc3RJbmRleCIsIlhNYXgiLCJtYXBTaXplIiwiWU1pbiIsIllNYXgiLCJ4IiwieSIsImhhc0NvbGlzaW9ucyIsImNvb3JkaW5hdGVzMSIsImNvb3JkaW5hdGVzMiIsIl9pbnN0YW5jZSIsImdhbWVNYXBFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNjb3JlRWxlbWVudCIsInJlc2V0QnV0dG9uRWxlbWVudCIsInBhdXNlQnV0dG9uRWxlbWVudCIsInN0YXJ0QnV0dG9uRWxlbWVudCIsImdhbWVTdGF0ZU1lc3NhZ2VFbGVtZW50IiwiX3Njb3JlIiwiX3N0YXRlIiwiZ2FtZU1hcCIsImVsZW1zQ291bnQiLCJpIiwiY2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInB1c2giLCJjb29yZGluYXRlcyIsIm5leHRTdGF0ZSIsIm1lc3NhZ2UiLCJzY29yZSIsImNvbnNvbGUiLCJlcnJvciIsInN0YXRlIiwiaW5uZXJUZXh0IiwibmV4dFNjb3JlIiwiZGVmYXVsdFNuYWtlV2lkdGgiLCJnYW1lQ29udHJvbCIsIlNuYWtlIiwiaGVhZENvb3JkaW5hdGVzIiwic25ha2VCb2R5Q29vcmRpbmF0ZXMiLCJib2R5Q29vcmRpbmF0ZXMiLCJkaXJlY3Rpb24iLCJjaGFuZ2VEaXJlY3Rpb25TdGFjayIsIm1hcCIsImNybnMiLCJnZXRDZWxsIiwic25ha2VCb2R5Q2VsbHMiLCJnZXRCb2R5Q2VsbHMiLCJmb3JFYWNoIiwicmVtb3ZlIiwiaGVhZCIsImV2ZW50IiwiY29kZSIsImlzQ2hhbmdlRGlyZWN0aW9uIiwiYWxsb3dDaGFuZ2VEaXJlY3Rpb24iLCJjaGFuZ2VEaXJlY3Rpb24iLCJtb3VzZSIsIm5leHRIZWFkQ29vcmRpbmF0ZXMiLCJnZXROZXh0SGVhZENvb3JkaW5hdGVzIiwiY3VycmVudEhlYWRDZWxsIiwidGFpbENvb3JkaW5hdGVzIiwiT2JqZWN0IiwiYXNzaWduIiwibGVuZ3RoIiwiY29udGFpbnMiLCJpc0NhbkVhdCIsIk1vdXNlIiwic3Bhd25Nb3VzZSIsIm1vdXNlQ29vcmRpbmF0ZXMiLCJtb3VzZUNlbGwiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZPLFNBQVNBLGtCQUFULENBQTRCQyxHQUE1QixFQUFpQ0MsR0FBakMsRUFBc0M7QUFDekMsU0FBT0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FB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LENBQUNDLFVBQU4sRUFBcEI7QUFFQSxTQUFLekMsV0FBTCxHQUFtQkEsV0FBbkI7QUFDSDs7QUFwQkw7QUFBQSxJIiwiZmlsZSI6Im9iamVjdHMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvb2JqZWN0Q29udHJvbC5qc1wiKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21Gcm9tUmFuZ2UobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNGcm9tUmFuZ2UocmFuZ2VzID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICAgIFhNaW4gPSBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCxcbiAgICAgICAgWE1heCA9IEdhbWVDb250cm9sLm1hcFNpemUsXG4gICAgICAgIFlNaW4gPSBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCxcbiAgICAgICAgWU1heCA9IEdhbWVDb250cm9sLm1hcFNpemUsXG4gICAgfSA9IHJhbmdlcztcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBnZXRSYW5kb21Gcm9tUmFuZ2UoWE1pbiwgWE1heCksXG4gICAgICAgIHk6IGdldFJhbmRvbUZyb21SYW5nZShZTWluLCBZTWF4KVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb2xpc2lvbnMoY29vcmRpbmF0ZXMxLCBjb29yZGluYXRlczIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBjb29yZGluYXRlczEueCA9PT0gY29vcmRpbmF0ZXMyLnhcbiAgICAgICAgJiYgY29vcmRpbmF0ZXMxLnkgPT09IGNvb3JkaW5hdGVzMi55XG4gICAgKVxufVxuXG4vLyBTaW5nbGV0b24gY2xhc3Mgb2YgZ2FtZSBtYXBcbmV4cG9ydCBjbGFzcyBHYW1lQ29udHJvbCB7XG4gICAgc3RhdGljIF9pbnN0YW5jZSA9IG51bGw7XG4gICAgc3RhdGljIG1hcFNpemUgPSAyNTtcbiAgICBzdGF0aWMgbG93ZXN0SW5kZXggPSAwO1xuICAgIHN0YXRpYyBnYW1lTG9vcFJlZnJlc2hSYXRlID0gMTAwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmIChHYW1lQ29udHJvbC5faW5zdGFuY2UgIT0gbnVsbCkgcmV0dXJuIEdhbWVDb250cm9sLl9pbnN0YW5jZVxuXG4gICAgICAgIHRoaXMuZ2FtZU1hcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU1hcCcpO1xuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpO1xuICAgICAgICB0aGlzLnJlc2V0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldEJ1dHRvbicpO1xuICAgICAgICB0aGlzLnBhdXNlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXVzZUJ1dHRvbicpO1xuICAgICAgICB0aGlzLnN0YXJ0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydEJ1dHRvbicpO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZU1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTdGF0ZU1lc3NhZ2UnKTtcblxuICAgICAgICB0aGlzLl9zY29yZSA9IDA7XG4gICAgICAgIC8vIHN0YXRlczogcGF1c2V8cGxheXxiZWdpbnxnYW1lb3ZlclxuICAgICAgICB0aGlzLl9zdGF0ZSA9ICdiZWdpbic7XG4gICAgICAgIHRoaXMuZ2FtZU1hcCA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGVsZW1zQ291bnQgPSBHYW1lQ29udHJvbC5tYXBTaXplICoqIDI7XG4gICAgICAgIC8vIFBhaW50IGNlbGxzIG9uIG1hcFxuICAgICAgICBmb3IgKGxldCBpID0gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXg7IGkgPCBlbGVtc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1hcEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgICAgICB0aGlzLmdhbWVNYXAucHVzaChjZWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVDb250cm9sLl9pbnN0YW5jZSA9IHRoaXNcbiAgICB9O1xuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgIH1cbiAgICBzZXQgc3RhdGUobmV4dFN0YXRlKSB7XG4gICAgICAgIGxldCBtZXNzYWdlO1xuICAgICAgICBzd2l0Y2ggKG5leHRTdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnR2FtZSB3YXMgc3RvcGVkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BsYXknOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnUGxheSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiZWdpbic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdTdGFydCBnYW1lJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2dhbWVvdmVyJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYFlvdSBhcmUgbG9zZS4gWW91ciBzY29yZSBpcyAke3RoaXMuc2NvcmV9YDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdVbmRlZmluZWQgc3RhdGUnO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuZGVmaW5lZCBzdGF0ZTogJywgdGhpcy5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lU3RhdGVNZXNzYWdlRWxlbWVudC5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICB9XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcmU7XG4gICAgfVxuICAgIHNldCBzY29yZShuZXh0U2NvcmUpIHtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gbmV4dFNjb3JlO1xuICAgICAgICB0aGlzLl9zY29yZSA9IG5leHRTY29yZTtcbiAgICB9XG5cbiAgICBnZXRDZWxsKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVNYXBbY29vcmRpbmF0ZXMueSAqIEdhbWVDb250cm9sLm1hcFNpemUgKyBjb29yZGluYXRlcy54XTtcbiAgICB9O1xufVxuIiwiaW1wb3J0IHtcbiAgICBnZXRDb29yZGluYXRlc0Zyb21SYW5nZSxcbiAgICBoYXNDb2xpc2lvbnMsXG4gICAgR2FtZUNvbnRyb2wsXG59IGZyb20gJy4vbWFwQ29udHJvbCdcblxuY29uc3QgZGVmYXVsdFNuYWtlV2lkdGggPSAzO1xuXG5jb25zdCBnYW1lQ29udHJvbCA9IG5ldyBHYW1lQ29udHJvbCgpO1xuZXhwb3J0IGNsYXNzIFNuYWtlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gZ2V0IHh5IGZvciBoZWFkXG4gICAgICAgIGNvbnN0IGhlYWRDb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzRnJvbVJhbmdlKHtcbiAgICAgICAgICAgIFhNaW46IEdhbWVDb250cm9sLmxvd2VzdEluZGV4ICsgZGVmYXVsdFNuYWtlV2lkdGgsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBnZW5lcmF0ZSBjb29yZGluYXRlcyBmb3IgYm9keSBvZiBzbmFrZVxuICAgICAgICBjb25zdCBzbmFrZUJvZHlDb29yZGluYXRlcyA9IFtcbiAgICAgICAgICAgIHsgeDogaGVhZENvb3JkaW5hdGVzLngsIHk6IGhlYWRDb29yZGluYXRlcy55IH0sXG4gICAgICAgICAgICB7IHg6IGhlYWRDb29yZGluYXRlcy54IC0gMSwgeTogaGVhZENvb3JkaW5hdGVzLnkgfSxcbiAgICAgICAgICAgIHsgeDogaGVhZENvb3JkaW5hdGVzLnggLSAyLCB5OiBoZWFkQ29vcmRpbmF0ZXMueSB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuYm9keUNvb3JkaW5hdGVzID0gc25ha2VCb2R5Q29vcmRpbmF0ZXM7XG5cbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvblN0YWNrID0gW107XG4gICAgfVxuICAgIGdldEJvZHlDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuYm9keUNvb3JkaW5hdGVzLm1hcChjcm5zID0+IChcbiAgICAgICAgICAgICAgICBnYW1lQ29udHJvbC5nZXRDZWxsKGNybnMpXG4gICAgICAgICAgICApKVxuICAgICAgICApO1xuXG4gICAgfVxuICAgIGNsZWFyU25ha2UoKSB7XG4gICAgICAgIC8vIGdldCBjZWxscyBmcm9tIGNvb3JkaW5hdGVzXG4gICAgICAgIGNvbnN0IHNuYWtlQm9keUNlbGxzID0gdGhpcy5nZXRCb2R5Q2VsbHMoKTtcbiAgICAgICAgc25ha2VCb2R5Q2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc25ha2VIZWFkJylcbiAgICAgICAgICAgIGVsc2UgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzbmFrZUJvZHknKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBkcmF3U25ha2UoKSB7XG4gICAgICAgIC8vIGdldCBjZWxscyBmcm9tIGNvb3JkaW5hdGVzXG4gICAgICAgIGNvbnN0IHNuYWtlQm9keUNlbGxzID0gdGhpcy5nZXRCb2R5Q2VsbHMoKTtcbiAgICAgICAgLy8gbWFyayBjZWxscyBhcyBzbmFrZVxuICAgICAgICBzbmFrZUJvZHlDZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkgY2VsbC5jbGFzc0xpc3QuYWRkKCdzbmFrZUhlYWQnKVxuICAgICAgICAgICAgZWxzZSBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NuYWtlQm9keScpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE5leHRIZWFkQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IGhlYWQgPSB0aGlzLmJvZHlDb29yZGluYXRlc1swXTtcbiAgICAgICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAvLyBpZiBjdXJyZW50IGhlYWQgaXMgb24gYm9yZGVyIFxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGhlYWQueCA9PT0gR2FtZUNvbnRyb2wubWFwU2l6ZSAtIDEgPyBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCA6IGhlYWQueCArIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IGhlYWQueSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogaGVhZC54ID09PSAwID8gR2FtZUNvbnRyb2wubWFwU2l6ZSAtIDEgOiBoZWFkLnggLSAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBoZWFkLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBoZWFkLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IGhlYWQueSA9PT0gMCA/IEdhbWVDb250cm9sLm1hcFNpemUgLSAxIDogaGVhZC55IC0gMSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogaGVhZC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBoZWFkLnkgPT09IEdhbWVDb250cm9sLm1hcFNpemUgLSAxID8gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXggOiBoZWFkLnkgKyAxLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VEaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBjb2RlIH0gPSBldmVudDtcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9ICcnO1xuICAgIFxuICAgICAgICBpZiAoY29kZSA9PT0gJ0Fycm93TGVmdCcgJiYgdGhpcy5kaXJlY3Rpb24gIT09ICdyaWdodCcpIGRpcmVjdGlvbiA9ICdsZWZ0J1xuICAgICAgICBlbHNlIGlmIChjb2RlID09PSAnQXJyb3dSaWdodCcgJiYgdGhpcy5kaXJlY3Rpb24gIT09ICdsZWZ0JykgZGlyZWN0aW9uID0gJ3JpZ2h0J1xuICAgICAgICBlbHNlIGlmIChjb2RlID09PSAnQXJyb3dVcCcgJiYgdGhpcy5kaXJlY3Rpb24gIT09ICdkb3duJykgZGlyZWN0aW9uID0gJ3VwJ1xuICAgICAgICBlbHNlIGlmIChjb2RlID09PSAnQXJyb3dEb3duJyAmJiB0aGlzLmRpcmVjdGlvbiAhPT0gJ3VwJykgZGlyZWN0aW9uID0gJ2Rvd24nXG4gICAgICAgIFxuICAgICAgICBjb25zdCBpc0NoYW5nZURpcmVjdGlvbiA9IGRpcmVjdGlvbiAhPT0gJydcbiAgICAgICAgaWYgKGlzQ2hhbmdlRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWxsb3dDaGFuZ2VEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvblN0YWNrLnB1c2goKCkgPT4gdGhpcy5jaGFuZ2VEaXJlY3Rpb24oZXZlbnQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgICAgIHRoaXMuYWxsb3dDaGFuZ2VEaXJlY3Rpb24gPSBmYWxzZTsgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlRGlyZWN0aW9uO1xuICAgIH1cbiAgICBtb3ZlKG1vdXNlKSB7XG4gICAgICAgIGNvbnN0IHsgYm9keUNvb3JkaW5hdGVzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBuZXh0SGVhZENvb3JkaW5hdGVzID0gdGhpcy5nZXROZXh0SGVhZENvb3JkaW5hdGVzKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRIZWFkQ2VsbCA9IGdhbWVDb250cm9sLmdldENlbGwoYm9keUNvb3JkaW5hdGVzWzBdKTtcbiAgICAgICAgY29uc3QgdGFpbENvb3JkaW5hdGVzID0gT2JqZWN0LmFzc2lnbih7fSwgYm9keUNvb3JkaW5hdGVzW2JvZHlDb29yZGluYXRlcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZ2FtZUNvbnRyb2wuZ2V0Q2VsbChuZXh0SGVhZENvb3JkaW5hdGVzKS5jbGFzc0xpc3QuY29udGFpbnMoJ3NuYWtlQm9keScpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgaXNDYW5FYXQgPSBoYXNDb2xpc2lvbnMoYm9keUNvb3JkaW5hdGVzWzBdLCBtb3VzZS5jb29yZGluYXRlcylcblxuICAgICAgICBmb3IgKGxldCBpID0gYm9keUNvb3JkaW5hdGVzLmxlbmd0aCAtIDE7IGkgPj0gMTsgaS0tKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJvZHlDb29yZGluYXRlc1tpXSwgYm9keUNvb3JkaW5hdGVzW2kgLSAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmFzc2lnbihib2R5Q29vcmRpbmF0ZXNbMF0sIG5leHRIZWFkQ29vcmRpbmF0ZXMpXG4gICAgICAgIGN1cnJlbnRIZWFkQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzbmFrZUhlYWQnKVxuXG4gICAgICAgIGlmICghaXNDYW5FYXQpIHtcbiAgICAgICAgICAgIGdhbWVDb250cm9sLmdldENlbGwodGFpbENvb3JkaW5hdGVzKS5jbGFzc0xpc3QucmVtb3ZlKCdzbmFrZUJvZHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0NhbkVhdCkge1xuICAgICAgICAgICAgYm9keUNvb3JkaW5hdGVzLnB1c2godGFpbENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGN1cnJlbnRIZWFkQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdtb3VzZScpO1xuICAgICAgICAgICAgbW91c2UuY29vcmRpbmF0ZXMgPSBNb3VzZS5zcGF3bk1vdXNlKCk7XG4gICAgICAgICAgICBnYW1lQ29udHJvbC5zY29yZSA9IGdhbWVDb250cm9sLnNjb3JlICsgMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3VzZSB7XG4gICAgc3RhdGljIHNwYXduTW91c2UoKSB7XG4gICAgICAgIGxldCBtb3VzZUNvb3JkaW5hdGVzID0gZ2V0Q29vcmRpbmF0ZXNGcm9tUmFuZ2UoKTtcbiAgICAgICAgbGV0IG1vdXNlQ2VsbCA9IGdhbWVDb250cm9sLmdldENlbGwobW91c2VDb29yZGluYXRlcyk7XG4gICAgICAgIHdoaWxlIChtb3VzZUNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbmFrZUJvZHknLCAnc25ha2VIZWFkJykpIHtcbiAgICAgICAgICAgIG1vdXNlQ29vcmRpbmF0ZXMgPSBnZXRDb29yZGluYXRlc0Zyb21SYW5nZSgpO1xuICAgICAgICAgICAgbW91c2VDZWxsID0gZ2FtZUNvbnRyb2wuZ2V0Q2VsbChtb3VzZUNvb3JkaW5hdGVzKTtcbiAgICAgICAgfVxuICAgICAgICBtb3VzZUNlbGwuY2xhc3NMaXN0LmFkZCgnbW91c2UnKTtcblxuICAgICAgICByZXR1cm4gbW91c2VDb29yZGluYXRlc1xuICAgIH1cbiAgICBjbGVhck1vdXNlKCkge1xuICAgICAgICBnYW1lQ29udHJvbC5nZXRDZWxsKHRoaXMuY29vcmRpbmF0ZXMpLmNsYXNzTGlzdC5yZW1vdmUoJ21vdXNlJylcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBNb3VzZS5zcGF3bk1vdXNlKClcblxuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==