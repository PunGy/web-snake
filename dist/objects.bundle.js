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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcENvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdENvbnRyb2wuanMiXSwibmFtZXMiOlsiZ2V0UmFuZG9tRnJvbVJhbmdlIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaGFzQ29saXNpb25zIiwiY29vcmRpbmF0ZXMxIiwiY29vcmRpbmF0ZXMyIiwieCIsInkiLCJHYW1lQ29udHJvbCIsIl9pbnN0YW5jZSIsImdhbWVNYXBFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNjb3JlRWxlbWVudCIsInJlc2V0QnV0dG9uRWxlbWVudCIsInBhdXNlQnV0dG9uRWxlbWVudCIsInN0YXJ0QnV0dG9uRWxlbWVudCIsImdhbWVTdGF0ZU1lc3NhZ2VFbGVtZW50Iiwid2lkdGgiLCJtYXBXaWR0aFBYIiwiaGVpZ2h0IiwibWFwSGVpZ2h0UFgiLCJnZXRNYXBTaXplIiwiZ2FtZU1hcCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJfc2NvcmUiLCJfc3RhdGUiLCJjdHgiLCJnZXRDb250ZXh0IiwiZHJhd0JhY2tncm91bmQiLCJmaWxsU3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJmaWxsUmVjdCIsImxvd2VzdEluZGV4IiwiY29sb3IiLCJvYmplY3QiLCJjZWxsU2l6ZSIsIm5leHRPYmplY3QiLCJyYW5nZXMiLCJjaGVja0NvbGxpc2lvbnMiLCJYTWluIiwiWE1heCIsIllNaW4iLCJZTWF4IiwibmV4dFN0YXRlIiwibWVzc2FnZSIsInNjb3JlIiwiY29uc29sZSIsImVycm9yIiwic3RhdGUiLCJpbm5lclRleHQiLCJuZXh0U2NvcmUiLCJkZWZhdWx0U25ha2VXaWR0aCIsIkVNUFRZIiwiU05BS0VfSEVBRCIsIlNOQUtFX0JPRFkiLCJNT1VTRSIsIlNOQUtFX0hFQURfQ09MT1IiLCJTTkFLRV9CT0RZX0NPTE9SIiwiTU9VU0VfQ09MT1IiLCJnYW1lQ29udHJvbCIsIlNuYWtlIiwiaGVhZENvb3JkaW5hdGVzIiwiZ2V0Q29vcmRpbmF0ZXNGcm9tUmFuZ2UiLCJzbmFrZUJvZHlDb29yZGluYXRlcyIsImJvZHlDb29yZGluYXRlcyIsImRpcmVjdGlvbiIsImNoYW5nZURpcmVjdGlvblN0YWNrIiwibWFwIiwiY3JucyIsImdldENlbGwiLCJmb3JFYWNoIiwiY2xlYXJDZWxsIiwiaSIsImRyYXdDZWxsIiwiaGVhZCIsImV2ZW50IiwiY29kZSIsImlzQ2hhbmdlRGlyZWN0aW9uIiwiYWxsb3dDaGFuZ2VEaXJlY3Rpb24iLCJwdXNoIiwiY2hhbmdlRGlyZWN0aW9uIiwibW91c2UiLCJuZXh0SGVhZENvb3JkaW5hdGVzIiwiZ2V0TmV4dEhlYWRDb29yZGluYXRlcyIsImN1cnJlbnRIZWFkQ29vcmRpbmF0ZXMiLCJ0YWlsQ29vcmRpbmF0ZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJnZXRPYmplY3QiLCJpc0NhbkVhdCIsImNvb3JkaW5hdGVzIiwiTW91c2UiLCJzcGF3bk1vdXNlIiwibW91c2VDb29yZGluYXRlcyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJB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R0FBR0MsS0FBSyxDQUFDQyxVQUFOLEVBQXBCO0FBRUEsU0FBS0YsV0FBTCxHQUFtQkEsV0FBbkI7QUFDSDs7QUFmTDtBQUFBLEkiLCJmaWxlIjoib2JqZWN0cy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9vYmplY3RDb250cm9sLmpzXCIpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbUZyb21SYW5nZShtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb2xpc2lvbnMoY29vcmRpbmF0ZXMxLCBjb29yZGluYXRlczIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBjb29yZGluYXRlczEueCA9PT0gY29vcmRpbmF0ZXMyLnhcbiAgICAgICAgJiYgY29vcmRpbmF0ZXMxLnkgPT09IGNvb3JkaW5hdGVzMi55XG4gICAgKVxufVxuXG4vLyBTaW5nbGV0b24gY2xhc3Mgb2YgZ2FtZSBtYXBcbmV4cG9ydCBjbGFzcyBHYW1lQ29udHJvbCB7XG4gICAgc3RhdGljIF9pbnN0YW5jZSA9IG51bGw7XG4gICAgc3RhdGljIGNlbGxTaXplID0gMjA7IC8vIHNpemUgb2YgY2VsbCBpbiBwaXhlbFxuICAgIHN0YXRpYyBsb3dlc3RJbmRleCA9IDA7XG4gICAgc3RhdGljIGdhbWVMb29wUmVmcmVzaFJhdGUgPSAxMDA7XG4gICAgc3RhdGljIGJhY2tncm91bmRDb2xvciA9ICcjZWVlZWVlJztcbiAgICBzdGF0aWMgbWFwV2lkdGhQWCA9IDUwMDtcbiAgICBzdGF0aWMgbWFwSGVpZ2h0UFggPSA1MDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYgKEdhbWVDb250cm9sLl9pbnN0YW5jZSAhPSBudWxsKSByZXR1cm4gR2FtZUNvbnRyb2wuX2luc3RhbmNlO1xuXG4gICAgICAgIHRoaXMuZ2FtZU1hcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU1hcCcpO1xuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpO1xuICAgICAgICB0aGlzLnJlc2V0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldEJ1dHRvbicpO1xuICAgICAgICB0aGlzLnBhdXNlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXVzZUJ1dHRvbicpO1xuICAgICAgICB0aGlzLnN0YXJ0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydEJ1dHRvbicpO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZU1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVTdGF0ZU1lc3NhZ2UnKTtcblxuICAgICAgICB0aGlzLmdhbWVNYXBFbGVtZW50LndpZHRoID0gR2FtZUNvbnRyb2wubWFwV2lkdGhQWFxuICAgICAgICB0aGlzLmdhbWVNYXBFbGVtZW50LmhlaWdodCA9IEdhbWVDb250cm9sLm1hcEhlaWdodFBYXG5cbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBHYW1lQ29udHJvbC5nZXRNYXBTaXplKClcbiAgICAgICAgdGhpcy5nYW1lTWFwID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogd2lkdGggfSwgKCkgPT4gQXJyYXkoaGVpZ2h0KS5maWxsKDApKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3Njb3JlID0gMDtcbiAgICAgICAgLy8gc3RhdGVzOiBwYXVzZXxwbGF5fGJlZ2lufGdhbWVvdmVyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gJ2JlZ2luJztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5nYW1lTWFwRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIC8vIGZpbGwgZ2FtZSBtYXBcbiAgICAgICAgdGhpcy5kcmF3QmFja2dyb3VuZCgpO1xuXG4gICAgICAgIEdhbWVDb250cm9sLl9pbnN0YW5jZSA9IHRoaXM7XG4gICAgfTtcbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9XG4gICAgc2V0IHN0YXRlKG5leHRTdGF0ZSkge1xuICAgICAgICBsZXQgbWVzc2FnZTtcbiAgICAgICAgc3dpdGNoIChuZXh0U3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0dhbWUgd2FzIHN0b3BlZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwbGF5JzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1BsYXknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYmVnaW4nOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU3RhcnQgZ2FtZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdnYW1lb3Zlcic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBZb3UgYXJlIGxvc2UuIFlvdXIgc2NvcmUgaXMgJHt0aGlzLnNjb3JlfWA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVW5kZWZpbmVkIHN0YXRlJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmRlZmluZWQgc3RhdGU6ICcsIHRoaXMuc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlTWVzc2FnZUVsZW1lbnQuaW5uZXJUZXh0ID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgfVxuICAgIGdldCBzY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3JlO1xuICAgIH1cbiAgICBzZXQgc2NvcmUobmV4dFNjb3JlKSB7XG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IG5leHRTY29yZTtcbiAgICAgICAgdGhpcy5fc2NvcmUgPSBuZXh0U2NvcmU7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE1hcFNpemUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWFwV2lkdGhQWCwgbWFwSGVpZ2h0UFgsIGNlbGxTaXplIH0gPSBHYW1lQ29udHJvbFxuICAgICAgICByZXR1cm4geyB3aWR0aDogTWF0aC5mbG9vcihtYXBXaWR0aFBYIC8gY2VsbFNpemUpLCBoZWlnaHQ6IE1hdGguZmxvb3IobWFwSGVpZ2h0UFggLyBjZWxsU2l6ZSkgfVxuICAgIH1cbiAgICBnZXRPYmplY3QoeyB4LCB5IH0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU1hcFt4XVt5XTtcbiAgICB9O1xuICAgIGRyYXdCYWNrZ3JvdW5kKCkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBHYW1lQ29udHJvbC5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KEdhbWVDb250cm9sLmxvd2VzdEluZGV4LCBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCwgR2FtZUNvbnRyb2wubWFwV2lkdGhQWCwgR2FtZUNvbnRyb2wubWFwSGVpZ2h0UFgpO1xuICAgIH1cbiAgICBkcmF3Q2VsbCh7IHgsIHkgfSwgY29sb3IsIG9iamVjdCkge1xuICAgICAgICBjb25zdCB7IGN0eCwgZ2FtZU1hcCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgeyBjZWxsU2l6ZSwgYmFja2dyb3VuZENvbG9yIH0gPSBHYW1lQ29udHJvbFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3IgfHwgYmFja2dyb3VuZENvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoeCAqIGNlbGxTaXplLCB5ICogY2VsbFNpemUsIGNlbGxTaXplIC0gMSwgY2VsbFNpemUgLSAxKVxuICAgICAgICBnYW1lTWFwW3hdW3ldID0gb2JqZWN0XG4gICAgfVxuICAgIGNsZWFyQ2VsbCh7IHgsIHkgfSwgbmV4dE9iamVjdCkge1xuICAgICAgICBjb25zdCB7IGNlbGxTaXplLCBiYWNrZ3JvdW5kQ29sb3IgfSA9IEdhbWVDb250cm9sXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmRDb2xvclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh4ICogY2VsbFNpemUsIHkgKiBjZWxsU2l6ZSwgY2VsbFNpemUsIGNlbGxTaXplKVxuICAgICAgICB0aGlzLmdhbWVNYXBbeF1beV0gPSBuZXh0T2JqZWN0IHx8IDBcbiAgICB9XG5cblxuICAgIGdldENvb3JkaW5hdGVzRnJvbVJhbmdlKHJhbmdlcyA9IHt9LCBjaGVja0NvbGxpc2lvbnMgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gR2FtZUNvbnRyb2wuZ2V0TWFwU2l6ZSgpXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIFhNaW4gPSBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCxcbiAgICAgICAgICAgIFhNYXggPSB3aWR0aCxcbiAgICAgICAgICAgIFlNaW4gPSBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCxcbiAgICAgICAgICAgIFlNYXggPSBoZWlnaHQsXG4gICAgICAgIH0gPSByYW5nZXM7XG4gICAgICAgIGxldCB4ID0gZ2V0UmFuZG9tRnJvbVJhbmdlKFhNaW4sIFhNYXgpLFxuICAgICAgICAgICAgeSA9IGdldFJhbmRvbUZyb21SYW5nZShZTWluLCBZTWF4KTtcblxuICAgICAgICB3aGlsZSAoY2hlY2tDb2xsaXNpb25zICYmIHRoaXMuZ2FtZU1hcFt4XVt5XSAhPT0gMCkge1xuICAgICAgICAgICAgeCA9IGdldFJhbmRvbUZyb21SYW5nZShYTWluLCBYTWF4KTtcbiAgICAgICAgICAgIHkgPSBnZXRSYW5kb21Gcm9tUmFuZ2UoWU1pbiwgWU1heCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB4LCB5IH1cbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIGhhc0NvbGlzaW9ucyxcbiAgICBHYW1lQ29udHJvbCxcbn0gZnJvbSAnLi9tYXBDb250cm9sJ1xuXG5jb25zdCBkZWZhdWx0U25ha2VXaWR0aCA9IDM7XG5cbmNvbnN0IEVNUFRZID0gMFxuY29uc3QgU05BS0VfSEVBRCA9IDFcbmNvbnN0IFNOQUtFX0JPRFkgPSAyXG5jb25zdCBNT1VTRSA9IDNcblxuY29uc3QgU05BS0VfSEVBRF9DT0xPUiA9ICdibGFjaydcbmNvbnN0IFNOQUtFX0JPRFlfQ09MT1IgPSAncmVkJ1xuY29uc3QgTU9VU0VfQ09MT1IgPSAnYmx1ZSdcblxuY29uc3QgZ2FtZUNvbnRyb2wgPSBuZXcgR2FtZUNvbnRyb2woKTtcbmV4cG9ydCBjbGFzcyBTbmFrZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIGdldCB4eSBmb3IgaGVhZFxuICAgICAgICBjb25zdCBoZWFkQ29vcmRpbmF0ZXMgPSBnYW1lQ29udHJvbC5nZXRDb29yZGluYXRlc0Zyb21SYW5nZSh7XG4gICAgICAgICAgICBYTWluOiBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCArIGRlZmF1bHRTbmFrZVdpZHRoLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gZ2VuZXJhdGUgY29vcmRpbmF0ZXMgZm9yIGJvZHkgb2Ygc25ha2VcbiAgICAgICAgY29uc3Qgc25ha2VCb2R5Q29vcmRpbmF0ZXMgPSBbXG4gICAgICAgICAgICB7IHg6IGhlYWRDb29yZGluYXRlcy54LCB5OiBoZWFkQ29vcmRpbmF0ZXMueSB9LFxuICAgICAgICAgICAgeyB4OiBoZWFkQ29vcmRpbmF0ZXMueCAtIDEsIHk6IGhlYWRDb29yZGluYXRlcy55IH0sXG4gICAgICAgICAgICB7IHg6IGhlYWRDb29yZGluYXRlcy54IC0gMiwgeTogaGVhZENvb3JkaW5hdGVzLnkgfSxcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLmJvZHlDb29yZGluYXRlcyA9IHNuYWtlQm9keUNvb3JkaW5hdGVzO1xuXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb25TdGFjayA9IFtdO1xuICAgIH1cbiAgICBnZXRCb2R5Q2VsbHMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLmJvZHlDb29yZGluYXRlcy5tYXAoY3JucyA9PiAoXG4gICAgICAgICAgICAgICAgZ2FtZUNvbnRyb2wuZ2V0Q2VsbChjcm5zKVxuICAgICAgICAgICAgKSlcbiAgICAgICAgKTtcblxuICAgIH1cbiAgICBjbGVhclNuYWtlKCkge1xuICAgICAgICB0aGlzLmJvZHlDb29yZGluYXRlcy5mb3JFYWNoKChjcm5zKSA9PiB7XG4gICAgICAgICAgICBnYW1lQ29udHJvbC5jbGVhckNlbGwoY3JucylcbiAgICAgICAgfSlcbiAgICB9XG4gICAgZHJhd1NuYWtlKCkge1xuICAgICAgICB0aGlzLmJvZHlDb29yZGluYXRlcy5mb3JFYWNoKChjcm5zLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkgZ2FtZUNvbnRyb2wuZHJhd0NlbGwoY3JucywgU05BS0VfSEVBRF9DT0xPUiwgU05BS0VfSEVBRClcbiAgICAgICAgICAgIGVsc2UgZ2FtZUNvbnRyb2wuZHJhd0NlbGwoY3JucywgU05BS0VfQk9EWV9DT0xPUiwgU05BS0VfQk9EWSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dEhlYWRDb29yZGluYXRlcygpIHtcbiAgICAgICAgY29uc3QgaGVhZCA9IHRoaXMuYm9keUNvb3JkaW5hdGVzWzBdO1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IEdhbWVDb250cm9sLmdldE1hcFNpemUoKVxuICAgICAgICBzd2l0Y2godGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIGlmIGN1cnJlbnQgaGVhZCBpcyBvbiBib3JkZXIgXG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogaGVhZC54ID09PSB3aWR0aCAtIDEgPyBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCA6IGhlYWQueCArIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IGhlYWQueSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogaGVhZC54ID09PSAwID8gd2lkdGggLSAxIDogaGVhZC54IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgeTogaGVhZC55LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogaGVhZC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBoZWFkLnkgPT09IDAgPyBoZWlnaHQgLSAxIDogaGVhZC55IC0gMSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogaGVhZC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBoZWFkLnkgPT09IGhlaWdodCAtIDEgPyBHYW1lQ29udHJvbC5sb3dlc3RJbmRleCA6IGhlYWQueSArIDEsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNoYW5nZURpcmVjdGlvbihldmVudCkge1xuICAgICAgICBjb25zdCB7IGNvZGUgfSA9IGV2ZW50O1xuICAgICAgICBsZXQgZGlyZWN0aW9uID0gJyc7XG4gICAgXG4gICAgICAgIGlmIChjb2RlID09PSAnQXJyb3dMZWZ0JyAmJiB0aGlzLmRpcmVjdGlvbiAhPT0gJ3JpZ2h0JykgZGlyZWN0aW9uID0gJ2xlZnQnXG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT09ICdBcnJvd1JpZ2h0JyAmJiB0aGlzLmRpcmVjdGlvbiAhPT0gJ2xlZnQnKSBkaXJlY3Rpb24gPSAncmlnaHQnXG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT09ICdBcnJvd1VwJyAmJiB0aGlzLmRpcmVjdGlvbiAhPT0gJ2Rvd24nKSBkaXJlY3Rpb24gPSAndXAnXG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT09ICdBcnJvd0Rvd24nICYmIHRoaXMuZGlyZWN0aW9uICE9PSAndXAnKSBkaXJlY3Rpb24gPSAnZG93bidcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlRGlyZWN0aW9uID0gZGlyZWN0aW9uICE9PSAnJ1xuICAgICAgICBpZiAoaXNDaGFuZ2VEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5hbGxvd0NoYW5nZURpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uU3RhY2sucHVzaCgoKSA9PiB0aGlzLmNoYW5nZURpcmVjdGlvbihldmVudCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5hbGxvd0NoYW5nZURpcmVjdGlvbiA9IGZhbHNlOyBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNDaGFuZ2VEaXJlY3Rpb247XG4gICAgfVxuICAgIG1vdmUobW91c2UpIHtcbiAgICAgICAgY29uc3QgeyBib2R5Q29vcmRpbmF0ZXMgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IG5leHRIZWFkQ29vcmRpbmF0ZXMgPSB0aGlzLmdldE5leHRIZWFkQ29vcmRpbmF0ZXMoKTtcbiAgICAgICAgY29uc3QgY3VycmVudEhlYWRDb29yZGluYXRlcyA9IGJvZHlDb29yZGluYXRlc1swXVxuICAgICAgICBjb25zdCB0YWlsQ29vcmRpbmF0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBib2R5Q29vcmRpbmF0ZXNbYm9keUNvb3JkaW5hdGVzLmxlbmd0aCAtIDFdKTtcblxuICAgICAgICBpZiAoZ2FtZUNvbnRyb2wuZ2V0T2JqZWN0KG5leHRIZWFkQ29vcmRpbmF0ZXMpID09PSBTTkFLRV9CT0RZKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgaXNDYW5FYXQgPSBoYXNDb2xpc2lvbnMoY3VycmVudEhlYWRDb29yZGluYXRlcywgbW91c2UuY29vcmRpbmF0ZXMpXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGJvZHlDb29yZGluYXRlcy5sZW5ndGggLSAxOyBpID49IDE7IGktLSkge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihib2R5Q29vcmRpbmF0ZXNbaV0sIGJvZHlDb29yZGluYXRlc1tpIC0gMV0pO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24oYm9keUNvb3JkaW5hdGVzWzBdLCBuZXh0SGVhZENvb3JkaW5hdGVzKVxuICAgICAgICBnYW1lQ29udHJvbC5jbGVhckNlbGwoY3VycmVudEhlYWRDb29yZGluYXRlcywgU05BS0VfQk9EWSlcblxuICAgICAgICBpZiAoIWlzQ2FuRWF0KSB7XG4gICAgICAgICAgICBnYW1lQ29udHJvbC5jbGVhckNlbGwodGFpbENvb3JkaW5hdGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0NhbkVhdCkge1xuICAgICAgICAgICAgYm9keUNvb3JkaW5hdGVzLnB1c2godGFpbENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIG1vdXNlLmNvb3JkaW5hdGVzID0gTW91c2Uuc3Bhd25Nb3VzZSgpO1xuICAgICAgICAgICAgZ2FtZUNvbnRyb2wuc2NvcmUgPSBnYW1lQ29udHJvbC5zY29yZSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW91c2Uge1xuICAgIHN0YXRpYyBzcGF3bk1vdXNlKCkge1xuICAgICAgICBsZXQgbW91c2VDb29yZGluYXRlcyA9IGdhbWVDb250cm9sLmdldENvb3JkaW5hdGVzRnJvbVJhbmdlKCk7XG4gICAgICAgIGdhbWVDb250cm9sLmRyYXdDZWxsKG1vdXNlQ29vcmRpbmF0ZXMsIE1PVVNFX0NPTE9SLCBNT1VTRSk7XG5cbiAgICAgICAgcmV0dXJuIG1vdXNlQ29vcmRpbmF0ZXNcbiAgICB9XG4gICAgY2xlYXJNb3VzZSgpIHtcbiAgICAgICAgZ2FtZUNvbnRyb2wuY2xlYXJDZWxsKHRoaXMuY29vcmRpbmF0ZXMpXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gTW91c2Uuc3Bhd25Nb3VzZSgpXG5cbiAgICAgICAgdGhpcy5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=