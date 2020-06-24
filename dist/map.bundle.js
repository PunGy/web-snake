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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/mapControl.js");
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcENvbnRyb2wuanMiXSwibmFtZXMiOlsiZ2V0UmFuZG9tRnJvbVJhbmdlIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaGFzQ29saXNpb25zIiwiY29vcmRpbmF0ZXMxIiwiY29vcmRpbmF0ZXMyIiwieCIsInkiLCJHYW1lQ29udHJvbCIsIl9pbnN0YW5jZSIsImdhbWVNYXBFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNjb3JlRWxlbWVudCIsInJlc2V0QnV0dG9uRWxlbWVudCIsInBhdXNlQnV0dG9uRWxlbWVudCIsInN0YXJ0QnV0dG9uRWxlbWVudCIsImdhbWVTdGF0ZU1lc3NhZ2VFbGVtZW50Iiwid2lkdGgiLCJtYXBXaWR0aFBYIiwiaGVpZ2h0IiwibWFwSGVpZ2h0UFgiLCJnZXRNYXBTaXplIiwiZ2FtZU1hcCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJfc2NvcmUiLCJfc3RhdGUiLCJjdHgiLCJnZXRDb250ZXh0IiwiZHJhd0JhY2tncm91bmQiLCJmaWxsU3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJmaWxsUmVjdCIsImxvd2VzdEluZGV4IiwiY29sb3IiLCJvYmplY3QiLCJjZWxsU2l6ZSIsIm5leHRPYmplY3QiLCJyYW5nZXMiLCJjaGVja0NvbGxpc2lvbnMiLCJYTWluIiwiWE1heCIsIllNaW4iLCJZTWF4IiwibmV4dFN0YXRlIiwibWVzc2FnZSIsInNjb3JlIiwiY29uc29sZSIsImVycm9yIiwic3RhdGUiLCJpbm5lclRleHQiLCJuZXh0U2NvcmUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFD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QUNSVyxVQURRO0FBQUEsVUFDSUUsV0FESixHQUM4QmIsV0FEOUIsQ0FDSWEsV0FESjtBQUFBLFVBQ2lCa0IsUUFEakIsR0FDOEIvQixXQUQ5QixDQUNpQitCLFFBRGpCO0FBRWhCLGFBQU87QUFBRXJCLGFBQUssRUFBRWxCLElBQUksQ0FBQ0MsS0FBTCxDQUFXa0IsVUFBVSxHQUFHb0IsUUFBeEIsQ0FBVDtBQUE0Q25CLGNBQU0sRUFBRXBCLElBQUksQ0FBQ0MsS0FBTCxDQUFXb0IsV0FBVyxHQUFHa0IsUUFBekI7QUFBcEQsT0FBUDtBQUNIO0FBeEVMOztBQUFBO0FBQUE7O2dCQUFhL0IsVyxlQUNVLEk7O2dCQURWQSxXLGNBRVMsRTs7Z0JBRlRBLFcsaUJBR1ksQzs7Z0JBSFpBLFcseUJBSW9CLEc7O2dCQUpwQkEsVyxxQkFLZ0IsUzs7Z0JBTGhCQSxXLGdCQU1XLEc7O2dCQU5YQSxXLGlCQU9ZLEciLCJmaWxlIjoibWFwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21hcENvbnRyb2wuanNcIik7XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tRnJvbVJhbmdlKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NvbGlzaW9ucyhjb29yZGluYXRlczEsIGNvb3JkaW5hdGVzMikge1xuICAgIHJldHVybiAoXG4gICAgICAgIGNvb3JkaW5hdGVzMS54ID09PSBjb29yZGluYXRlczIueFxuICAgICAgICAmJiBjb29yZGluYXRlczEueSA9PT0gY29vcmRpbmF0ZXMyLnlcbiAgICApXG59XG5cbi8vIFNpbmdsZXRvbiBjbGFzcyBvZiBnYW1lIG1hcFxuZXhwb3J0IGNsYXNzIEdhbWVDb250cm9sIHtcbiAgICBzdGF0aWMgX2luc3RhbmNlID0gbnVsbDtcbiAgICBzdGF0aWMgY2VsbFNpemUgPSAyMDsgLy8gc2l6ZSBvZiBjZWxsIGluIHBpeGVsXG4gICAgc3RhdGljIGxvd2VzdEluZGV4ID0gMDtcbiAgICBzdGF0aWMgZ2FtZUxvb3BSZWZyZXNoUmF0ZSA9IDEwMDtcbiAgICBzdGF0aWMgYmFja2dyb3VuZENvbG9yID0gJyNlZWVlZWUnO1xuICAgIHN0YXRpYyBtYXBXaWR0aFBYID0gNTAwO1xuICAgIHN0YXRpYyBtYXBIZWlnaHRQWCA9IDUwMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZiAoR2FtZUNvbnRyb2wuX2luc3RhbmNlICE9IG51bGwpIHJldHVybiBHYW1lQ29udHJvbC5faW5zdGFuY2U7XG5cbiAgICAgICAgdGhpcy5nYW1lTWFwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lTWFwJyk7XG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlJyk7XG4gICAgICAgIHRoaXMucmVzZXRCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0QnV0dG9uJyk7XG4gICAgICAgIHRoaXMucGF1c2VCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhdXNlQnV0dG9uJyk7XG4gICAgICAgIHRoaXMuc3RhcnRCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0QnV0dG9uJyk7XG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlTWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVN0YXRlTWVzc2FnZScpO1xuXG4gICAgICAgIHRoaXMuZ2FtZU1hcEVsZW1lbnQud2lkdGggPSBHYW1lQ29udHJvbC5tYXBXaWR0aFBYXG4gICAgICAgIHRoaXMuZ2FtZU1hcEVsZW1lbnQuaGVpZ2h0ID0gR2FtZUNvbnRyb2wubWFwSGVpZ2h0UFhcblxuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IEdhbWVDb250cm9sLmdldE1hcFNpemUoKVxuICAgICAgICB0aGlzLmdhbWVNYXAgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB3aWR0aCB9LCAoKSA9PiBBcnJheShoZWlnaHQpLmZpbGwoMCkpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fc2NvcmUgPSAwO1xuICAgICAgICAvLyBzdGF0ZXM6IHBhdXNlfHBsYXl8YmVnaW58Z2FtZW92ZXJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAnYmVnaW4nO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmdhbWVNYXBFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgLy8gZmlsbCBnYW1lIG1hcFxuICAgICAgICB0aGlzLmRyYXdCYWNrZ3JvdW5kKCk7XG5cbiAgICAgICAgR2FtZUNvbnRyb2wuX2luc3RhbmNlID0gdGhpcztcbiAgICB9O1xuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgIH1cbiAgICBzZXQgc3RhdGUobmV4dFN0YXRlKSB7XG4gICAgICAgIGxldCBtZXNzYWdlO1xuICAgICAgICBzd2l0Y2ggKG5leHRTdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnR2FtZSB3YXMgc3RvcGVkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BsYXknOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnUGxheSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiZWdpbic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdTdGFydCBnYW1lJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2dhbWVvdmVyJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYFlvdSBhcmUgbG9zZS4gWW91ciBzY29yZSBpcyAke3RoaXMuc2NvcmV9YDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdVbmRlZmluZWQgc3RhdGUnO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuZGVmaW5lZCBzdGF0ZTogJywgdGhpcy5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lU3RhdGVNZXNzYWdlRWxlbWVudC5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICB9XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcmU7XG4gICAgfVxuICAgIHNldCBzY29yZShuZXh0U2NvcmUpIHtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gbmV4dFNjb3JlO1xuICAgICAgICB0aGlzLl9zY29yZSA9IG5leHRTY29yZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TWFwU2l6ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtYXBXaWR0aFBYLCBtYXBIZWlnaHRQWCwgY2VsbFNpemUgfSA9IEdhbWVDb250cm9sXG4gICAgICAgIHJldHVybiB7IHdpZHRoOiBNYXRoLmZsb29yKG1hcFdpZHRoUFggLyBjZWxsU2l6ZSksIGhlaWdodDogTWF0aC5mbG9vcihtYXBIZWlnaHRQWCAvIGNlbGxTaXplKSB9XG4gICAgfVxuICAgIGdldE9iamVjdCh7IHgsIHkgfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTWFwW3hdW3ldO1xuICAgIH07XG4gICAgZHJhd0JhY2tncm91bmQoKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IEdhbWVDb250cm9sLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoR2FtZUNvbnRyb2wubG93ZXN0SW5kZXgsIEdhbWVDb250cm9sLmxvd2VzdEluZGV4LCBHYW1lQ29udHJvbC5tYXBXaWR0aFBYLCBHYW1lQ29udHJvbC5tYXBIZWlnaHRQWCk7XG4gICAgfVxuICAgIGRyYXdDZWxsKHsgeCwgeSB9LCBjb2xvciwgb2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IHsgY3R4LCBnYW1lTWFwIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IGNlbGxTaXplLCBiYWNrZ3JvdW5kQ29sb3IgfSA9IEdhbWVDb250cm9sXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvciB8fCBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh4ICogY2VsbFNpemUsIHkgKiBjZWxsU2l6ZSwgY2VsbFNpemUgLSAxLCBjZWxsU2l6ZSAtIDEpXG4gICAgICAgIGdhbWVNYXBbeF1beV0gPSBvYmplY3RcbiAgICB9XG4gICAgY2xlYXJDZWxsKHsgeCwgeSB9LCBuZXh0T2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IHsgY2VsbFNpemUsIGJhY2tncm91bmRDb2xvciB9ID0gR2FtZUNvbnRyb2xcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZENvbG9yXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHggKiBjZWxsU2l6ZSwgeSAqIGNlbGxTaXplLCBjZWxsU2l6ZSwgY2VsbFNpemUpXG4gICAgICAgIHRoaXMuZ2FtZU1hcFt4XVt5XSA9IG5leHRPYmplY3QgfHwgMFxuICAgIH1cblxuXG4gICAgZ2V0Q29vcmRpbmF0ZXNGcm9tUmFuZ2UocmFuZ2VzID0ge30sIGNoZWNrQ29sbGlzaW9ucyA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBHYW1lQ29udHJvbC5nZXRNYXBTaXplKClcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgWE1pbiA9IEdhbWVDb250cm9sLmxvd2VzdEluZGV4LFxuICAgICAgICAgICAgWE1heCA9IHdpZHRoLFxuICAgICAgICAgICAgWU1pbiA9IEdhbWVDb250cm9sLmxvd2VzdEluZGV4LFxuICAgICAgICAgICAgWU1heCA9IGhlaWdodCxcbiAgICAgICAgfSA9IHJhbmdlcztcbiAgICAgICAgbGV0IHggPSBnZXRSYW5kb21Gcm9tUmFuZ2UoWE1pbiwgWE1heCksXG4gICAgICAgICAgICB5ID0gZ2V0UmFuZG9tRnJvbVJhbmdlKFlNaW4sIFlNYXgpO1xuXG4gICAgICAgIHdoaWxlIChjaGVja0NvbGxpc2lvbnMgJiYgdGhpcy5nYW1lTWFwW3hdW3ldICE9PSAwKSB7XG4gICAgICAgICAgICB4ID0gZ2V0UmFuZG9tRnJvbVJhbmdlKFhNaW4sIFhNYXgpO1xuICAgICAgICAgICAgeSA9IGdldFJhbmRvbUZyb21SYW5nZShZTWluLCBZTWF4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHgsIHkgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=