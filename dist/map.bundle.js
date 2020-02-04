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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcENvbnRyb2wuanMiXSwibmFtZXMiOlsiZ2V0UmFuZG9tRnJvbVJhbmdlIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0Q29vcmRpbmF0ZXNGcm9tUmFuZ2UiLCJyYW5nZXMiLCJYTWluIiwiR2FtZUNvbnRyb2wiLCJsb3dlc3RJbmRleCIsIlhNYXgiLCJtYXBTaXplIiwiWU1pbiIsIllNYXgiLCJ4IiwieSIsImhhc0NvbGlzaW9ucyIsImNvb3JkaW5hdGVzMSIsImNvb3JkaW5hdGVzMiIsIl9pbnN0YW5jZSIsImdhbWVNYXBFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNjb3JlRWxlbWVudCIsInJlc2V0QnV0dG9uRWxlbWVudCIsInBhdXNlQnV0dG9uRWxlbWVudCIsInN0YXJ0QnV0dG9uRWxlbWVudCIsImdhbWVTdGF0ZU1lc3NhZ2VFbGVtZW50IiwiX3Njb3JlIiwiX3N0YXRlIiwiZ2FtZU1hcCIsImVsZW1zQ291bnQiLCJpIiwiY2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInB1c2giLCJjb29yZGluYXRlcyIsIm5leHRTdGF0ZSIsIm1lc3NhZ2UiLCJzY29yZSIsImNvbnNvbGUiLCJlcnJvciIsInN0YXRlIiwiaW5uZXJUZXh0IiwibmV4dFNjb3JlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtR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QTZEeUI7QUFDakIsV0FBS3hCLFlBQUwsQ0FBa0J1QixTQUFsQixHQUE4QkMsU0FBOUI7QUFDQSxXQUFLbkIsTUFBTCxHQUFjbUIsU0FBZDtBQUNIO0FBaEVMOztBQUFBO0FBQUE7O2dCQUFhdkMsVyxlQUNVLEk7O2dCQURWQSxXLGFBRVEsRTs7Z0JBRlJBLFcsaUJBR1ksQzs7Z0JBSFpBLFcseUJBSW9CLEciLCJmaWxlIjoibWFwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21hcENvbnRyb2wuanNcIik7XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tRnJvbVJhbmdlKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzRnJvbVJhbmdlKHJhbmdlcyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgICBYTWluID0gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXgsXG4gICAgICAgIFhNYXggPSBHYW1lQ29udHJvbC5tYXBTaXplLFxuICAgICAgICBZTWluID0gR2FtZUNvbnRyb2wubG93ZXN0SW5kZXgsXG4gICAgICAgIFlNYXggPSBHYW1lQ29udHJvbC5tYXBTaXplLFxuICAgIH0gPSByYW5nZXM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogZ2V0UmFuZG9tRnJvbVJhbmdlKFhNaW4sIFhNYXgpLFxuICAgICAgICB5OiBnZXRSYW5kb21Gcm9tUmFuZ2UoWU1pbiwgWU1heClcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaGFzQ29saXNpb25zKGNvb3JkaW5hdGVzMSwgY29vcmRpbmF0ZXMyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgY29vcmRpbmF0ZXMxLnggPT09IGNvb3JkaW5hdGVzMi54XG4gICAgICAgICYmIGNvb3JkaW5hdGVzMS55ID09PSBjb29yZGluYXRlczIueVxuICAgIClcbn1cblxuLy8gU2luZ2xldG9uIGNsYXNzIG9mIGdhbWUgbWFwXG5leHBvcnQgY2xhc3MgR2FtZUNvbnRyb2wge1xuICAgIHN0YXRpYyBfaW5zdGFuY2UgPSBudWxsO1xuICAgIHN0YXRpYyBtYXBTaXplID0gMjU7XG4gICAgc3RhdGljIGxvd2VzdEluZGV4ID0gMDtcbiAgICBzdGF0aWMgZ2FtZUxvb3BSZWZyZXNoUmF0ZSA9IDEwMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZiAoR2FtZUNvbnRyb2wuX2luc3RhbmNlICE9IG51bGwpIHJldHVybiBHYW1lQ29udHJvbC5faW5zdGFuY2VcblxuICAgICAgICB0aGlzLmdhbWVNYXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVNYXAnKTtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKTtcbiAgICAgICAgdGhpcy5yZXNldEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRCdXR0b24nKTtcbiAgICAgICAgdGhpcy5wYXVzZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF1c2VCdXR0b24nKTtcbiAgICAgICAgdGhpcy5zdGFydEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRCdXR0b24nKTtcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVNZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lU3RhdGVNZXNzYWdlJyk7XG5cbiAgICAgICAgdGhpcy5fc2NvcmUgPSAwO1xuICAgICAgICAvLyBzdGF0ZXM6IHBhdXNlfHBsYXl8YmVnaW58Z2FtZW92ZXJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAnYmVnaW4nO1xuICAgICAgICB0aGlzLmdhbWVNYXAgPSBbXTtcblxuICAgICAgICBjb25zdCBlbGVtc0NvdW50ID0gR2FtZUNvbnRyb2wubWFwU2l6ZSAqKiAyO1xuICAgICAgICAvLyBQYWludCBjZWxscyBvbiBtYXBcbiAgICAgICAgZm9yIChsZXQgaSA9IEdhbWVDb250cm9sLmxvd2VzdEluZGV4OyBpIDwgZWxlbXNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICAgICAgICB0aGlzLmdhbWVNYXBFbGVtZW50LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICAgICAgdGhpcy5nYW1lTWFwLnB1c2goY2VsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBHYW1lQ29udHJvbC5faW5zdGFuY2UgPSB0aGlzXG4gICAgfTtcbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9XG4gICAgc2V0IHN0YXRlKG5leHRTdGF0ZSkge1xuICAgICAgICBsZXQgbWVzc2FnZTtcbiAgICAgICAgc3dpdGNoIChuZXh0U3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0dhbWUgd2FzIHN0b3BlZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwbGF5JzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1BsYXknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYmVnaW4nOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU3RhcnQgZ2FtZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdnYW1lb3Zlcic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBZb3UgYXJlIGxvc2UuIFlvdXIgc2NvcmUgaXMgJHt0aGlzLnNjb3JlfWA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVW5kZWZpbmVkIHN0YXRlJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmRlZmluZWQgc3RhdGU6ICcsIHRoaXMuc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlTWVzc2FnZUVsZW1lbnQuaW5uZXJUZXh0ID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgfVxuICAgIGdldCBzY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3JlO1xuICAgIH1cbiAgICBzZXQgc2NvcmUobmV4dFNjb3JlKSB7XG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IG5leHRTY29yZTtcbiAgICAgICAgdGhpcy5fc2NvcmUgPSBuZXh0U2NvcmU7XG4gICAgfVxuXG4gICAgZ2V0Q2VsbChjb29yZGluYXRlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lTWFwW2Nvb3JkaW5hdGVzLnkgKiBHYW1lQ29udHJvbC5tYXBTaXplICsgY29vcmRpbmF0ZXMueF07XG4gICAgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=