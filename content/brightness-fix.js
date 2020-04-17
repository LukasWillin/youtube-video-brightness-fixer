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
/******/ 	return __webpack_require__(__webpack_require__.s = "./content/brightness-fix.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./content/brightness-fix.ts":
/*!***********************************!*\
  !*** ./content/brightness-fix.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cssKeys_1 = __webpack_require__(/*! ../shared/cssKeys */ "./shared/cssKeys.ts");
// eslint-disable-next-line no-unused-vars
const types_1 = __webpack_require__(/*! ../shared/types */ "./shared/types.ts");
let inititalised = false;
(function () {
    let cache = {};
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (inititalised)
        return;
    inititalised = true;
    const STORAGE_KEY = 'enlight-yt';
    //#region Local Storage
    function setLocalStorage(cacheKey, value) {
        cache[cacheKey] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    }
    function getLocalStorage() {
        const defaultSettings = { invert: 0, brightness: 1, contrast: 1, saturate: 1, hueRotate: 0, sepia: 0 };
        try {
            const settings = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return settings ? settings : defaultSettings;
        }
        catch (e) {
            console.error(e);
        }
        return defaultSettings;
    }
    function restoreFromStorage() {
        cache = getLocalStorage();
        setInvert(cache.invert);
        setBrightness(cache.brightness);
        setContrast(cache.contrast);
        setSaturate(cache.saturate);
        setHueRotate(cache.hueRotate);
        setSepia(cache.sepia);
    }
    //#endregion
    //#region CSS Injection
    let root = document.documentElement;
    function setCSSVar(key, value, type = '') {
        setLocalStorage(cssKeys_1.CSS_CACHE_MAP[key], value);
        root.style.setProperty(key, `${value}${type}`);
    }
    function setInvert(vFloat) {
        setCSSVar(cssKeys_1.CSS_KEYS.INVERT, vFloat);
    }
    function setBrightness(vFloat) {
        setCSSVar(cssKeys_1.CSS_KEYS.BRIGHTNESS, vFloat);
    }
    function setContrast(vFloat) {
        setCSSVar(cssKeys_1.CSS_KEYS.CONTRAST, vFloat);
    }
    function setSaturate(vFloat) {
        setCSSVar(cssKeys_1.CSS_KEYS.SATURATE, vFloat);
    }
    function setHueRotate(vFloat) {
        setCSSVar(cssKeys_1.CSS_KEYS.HUE_ROTATE, vFloat, 'deg');
    }
    function setSepia(vFloat) {
        setCSSVar(cssKeys_1.CSS_KEYS.SEPIA, vFloat);
    }
    //#endregion
    restoreFromStorage();
    function applyMessage(fn, message) {
        return fn.apply(null, message.args);
    }
    /**
     * Listen for messages from the popup script.
     */
    browser.runtime.onMessage.addListener((message) => {
        switch (message.command) {
            case types_1.MessageCommandEnum.SetInvert:
                applyMessage(setInvert, message);
                break;
            case types_1.MessageCommandEnum.SetBrightness:
                applyMessage(setBrightness, message);
                break;
            case types_1.MessageCommandEnum.SetContrast:
                applyMessage(setContrast, message);
                break;
            case types_1.MessageCommandEnum.SetSaturate:
                applyMessage(setSaturate, message);
                break;
            case types_1.MessageCommandEnum.SetHueRotate:
                applyMessage(setHueRotate, message);
                break;
            case types_1.MessageCommandEnum.SetSepia:
                applyMessage(setSepia, message);
                break;
            case types_1.MessageCommandEnum.GetTabSettings:
                return Promise.resolve({ response: getLocalStorage() });
            case types_1.MessageCommandEnum.ConsoleLog:
                console.log(...message.args);
                break;
            default:
                console.warn(message);
                break;
        }
    });
    console.log('>> content-script loaded');
})();


/***/ }),

/***/ "./shared/cssKeys.ts":
/*!***************************!*\
  !*** ./shared/cssKeys.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CSS_KEYS = {
    INVERT: '--brf-vfloat-invert',
    BRIGHTNESS: '--brf-vfloat-brightness',
    CONTRAST: '--brf-vfloat-contrast',
    SATURATE: '--brf-vfloat-saturate',
    HUE_ROTATE: '--brf-vdeg-hue-rotate',
    SEPIA: '--brf-vfloat-sepia'
};
exports.CSS_KEYS = CSS_KEYS;
const CSS_CACHE_MAP = {
    [CSS_KEYS.INVERT]: 'invert',
    [CSS_KEYS.BRIGHTNESS]: 'brightness',
    [CSS_KEYS.CONTRAST]: 'contrast',
    [CSS_KEYS.SATURATE]: 'saturate',
    [CSS_KEYS.HUE_ROTATE]: 'hueRotate',
    [CSS_KEYS.SEPIA]: 'sepia'
};
exports.CSS_CACHE_MAP = CSS_CACHE_MAP;


/***/ }),

/***/ "./shared/types.ts":
/*!*************************!*\
  !*** ./shared/types.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MessageCommandEnum;
(function (MessageCommandEnum) {
    // eslint-disable-next-line no-unused-vars
    MessageCommandEnum["SetInvert"] = "set-invert";
    // eslint-disable-next-line no-unused-vars
    MessageCommandEnum["SetBrightness"] = "set-brightness";
    // eslint-disable-next-line no-unused-vars
    MessageCommandEnum["SetContrast"] = "set-contrast";
    // eslint-disable-next-line no-unused-vars
    MessageCommandEnum["SetSaturate"] = "set-saturate";
    // eslint-disable-next-line no-unused-vars
    MessageCommandEnum["SetHueRotate"] = "set-hue-rotate";
    // eslint-disable-next-line no-unused-vars
    MessageCommandEnum["SetSepia"] = "set-sepia";
    // eslint-disable-next-line no-unused-vars
    MessageCommandEnum["GetTabSettings"] = "get-tab-settings";
    // eslint-disable-next-line no-unused-vars
    MessageCommandEnum["ConsoleLog"] = "console-log";
})(MessageCommandEnum || (MessageCommandEnum = {}));
exports.MessageCommandEnum = MessageCommandEnum;
class SettingsResponseMessage {
}
exports.SettingsResponseMessage = SettingsResponseMessage;


/***/ })

/******/ });