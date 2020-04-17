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
/******/ 	return __webpack_require__(__webpack_require__.s = "./popup/enlight-yt-popup.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./popup/enlight-yt-popup.ts":
/*!***********************************!*\
  !*** ./popup/enlight-yt-popup.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-unused-vars
const types_1 = __webpack_require__(/*! ../shared/types */ "./shared/types.ts");
const URL_YT = '*://*.youtube.com/*';
/**
 * Show error in popup and console.
 */
function handleError(error) {
    document.querySelector('#popup-content').classList.add('hidden');
    document.querySelector('#error-content').classList.remove('hidden');
    document.querySelector('#error-content-exception').innerHTML = JSON.stringify(error);
    console.error(`Error in Enlight-YT: ${error.message}`);
}
function sendMessage(tab, message) {
    return browser.tabs.sendMessage(tab.id, message)
        .catch(handleError);
}
function loadTabSettings(tab) {
    return browser.tabs.sendMessage(tab.id, { 'command': types_1.MessageCommandEnum.GetTabSettings })
        .then((message) => {
        sliderInvert.value = JSON.stringify(message.response.invert);
        fieldInvert.value = JSON.stringify(message.response.invert);
        sliderBrightness.value = JSON.stringify(message.response.brightness);
        fieldBrightness.value = JSON.stringify(message.response.brightness);
        sliderContrast.value = JSON.stringify(message.response.contrast);
        fieldContrast.value = JSON.stringify(message.response.contrast);
        sliderSaturate.value = JSON.stringify(message.response.saturate);
        fieldSaturate.value = JSON.stringify(message.response.saturate);
        sliderHueRotate.value = JSON.stringify(message.response.hueRotate);
        fieldHueRotate.value = JSON.stringify(message.response.hueRotate);
        sliderSepia.value = JSON.stringify(message.response.sepia);
        fieldSepia.value = JSON.stringify(message.response.sepia);
    }).catch(handleError);
}
function sendMessageToActive(message) {
    return browser.tabs.query({ active: true, currentWindow: true })
        .then(tabs => {
        if (tabs[0])
            return sendMessage(tabs[0], message);
        return Promise.resolve(null);
    });
}
const sliderInvert = document.querySelector('input#slider-invert');
const fieldInvert = document.querySelector('input#field-invert');
const sliderBrightness = document.querySelector('input#slider-brightness');
const fieldBrightness = document.querySelector('input#field-brightness');
const sliderContrast = document.querySelector('input#slider-contrast');
const fieldContrast = document.querySelector('input#field-contrast');
const sliderSaturate = document.querySelector('input#slider-saturate');
const fieldSaturate = document.querySelector('input#field-saturate');
const sliderHueRotate = document.querySelector('input#slider-hue-rotate');
const fieldHueRotate = document.querySelector('input#field-hue-rotate');
const sliderSepia = document.querySelector('input#slider-sepia');
const fieldSepia = document.querySelector('input#field-sepia');
function bindFieldAndSlider(fieldInput, sliderInput) {
    fieldInput.addEventListener('input', e => {
        const eventTarget = e.currentTarget;
        sliderInput.value = eventTarget.value;
    });
    sliderInput.addEventListener('input', e => {
        const eventTarget = e.currentTarget;
        fieldInput.value = eventTarget.value;
    });
}
bindFieldAndSlider(fieldInvert, sliderInvert);
bindFieldAndSlider(fieldBrightness, sliderBrightness);
bindFieldAndSlider(fieldContrast, sliderContrast);
bindFieldAndSlider(fieldSaturate, sliderSaturate);
bindFieldAndSlider(fieldHueRotate, sliderHueRotate);
bindFieldAndSlider(fieldSepia, sliderSepia);
function addNumberInputEventListener(eventListener, ...numberInputs) {
    for (let i in numberInputs) {
        numberInputs[i].addEventListener('input', eventListener);
    }
}
addNumberInputEventListener(e => {
    // console.debug('event-change-invert:', e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: types_1.MessageCommandEnum.SetInvert,
        args: [eventTarget.valueAsNumber]
    });
}, fieldInvert, sliderInvert);
addNumberInputEventListener(e => {
    // console.debug('event-change-brightness:', e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: types_1.MessageCommandEnum.SetBrightness,
        args: [eventTarget.valueAsNumber]
    });
}, fieldBrightness, sliderBrightness);
addNumberInputEventListener(e => {
    // console.debug('event-change-contrast:', e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: types_1.MessageCommandEnum.SetContrast,
        args: [eventTarget.valueAsNumber]
    });
}, fieldContrast, sliderContrast);
addNumberInputEventListener(e => {
    // console.debug('event-change-saturate:', e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: types_1.MessageCommandEnum.SetSaturate,
        args: [eventTarget.valueAsNumber]
    });
}, fieldSaturate, sliderSaturate);
addNumberInputEventListener(e => {
    // console.debug('event-change-hue-rotate:', e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: types_1.MessageCommandEnum.SetHueRotate,
        args: [eventTarget.valueAsNumber]
    });
}, fieldHueRotate, sliderHueRotate);
addNumberInputEventListener(e => {
    // console.debug('event-change-sepia:', e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: types_1.MessageCommandEnum.SetSepia,
        args: [eventTarget.valueAsNumber]
    });
}, fieldSepia, sliderSepia);
browser.tabs.query({ active: true, currentWindow: true, url: URL_YT })
    .then(tabs => tabs[0] ? loadTabSettings(tabs[0]) : Promise.reject('No tab found'))
    .catch(handleError);
console.log('enlight-yt-popup.js loaded');


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