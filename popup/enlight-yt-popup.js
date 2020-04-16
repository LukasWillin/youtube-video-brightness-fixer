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
const URL_YT = '*://*.youtube.com/*';
// browser.tabs.create({url: "/my-page.html"}).then(() => {
//     browser.tabs.executeScript({
//       code: `console.log('location:', window.location.href);`
//     });
//   });
// // tabs.query doc - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/query
// return browser.tabs.query({ url: "*://*.youtube.com/*" })
// .then(tabs =>
// {
//     if (tabs)
//     {
//         tabs.forEach(t => browser.tabs.sendMessage(tab.id, message));
//     }
// })
// .catch(handleError);
// /**
//          * Insert the page-hiding CSS into the active tab,
//          * then get the beast URL and
//          * send a "beastify" message to the content script in the active tab.
//          */
//         function beastify(tabs)
//         {
//             browser.tabs.insertCSS({code: hidePage}).then(() =>
//             {
//                 let url = beastNameToURL(e.target.textContent);
//                 browser.tabs.sendMessage(tabs[0].id, {
//                     command: "beastify",
//                     beastURL: url
//                 });
//             });
//         }
//   browser.tabs.removeCSS({code: hidePage}).then(() =>
//   {
//       browser.tabs.sendMessage(tabs[0].id, {
//           command: "reset",
//       });
//   });
// /**
//  * Get the active tab,
//  * then call "beastify()" or "reset()" as appropriate.
//  */
// if (e.target.classList.contains("beast"))
// {
//     browser.tabs.query({active: true, currentWindow: true})
//         .then(beastify)
//         .catch(reportError);
// }
// /**
//  * When the popup loads, inject a content script into the active tab,
//  * and add a click handler.
//  * If we couldn't inject the script, handle the error.
//  */
// browser.tabs.executeScript({file: "/content_scripts/beastify.js"})
//     .then((e) => {  })
//     .catch(reportExecuteScriptError);
/**
 * Show error in popup and console.
 */
function handleError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    document.querySelector("#error-content-exception").innerHTML = JSON.stringify(error);
    console.error(`Error in Enlight-YT: ${error.message}`);
}
function sendMessage(tab, message) {
    return browser.tabs.sendMessage(tab.id, message)
        .catch(handleError);
}
function loadSettings(tab) {
    return browser.tabs.sendMessage(tab.id, { 'command': 'get-settings' })
        .then((message) => {
        fieldBrightness.value = JSON.stringify(message.response.brightness);
        fieldContrast.value = JSON.stringify(message.response.contrast);
        fieldSaturate.value = JSON.stringify(message.response.saturate);
        fieldHueRotate.value = JSON.stringify(message.response.hueRotate);
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
const fieldBrightness = document.querySelector('input#field-brightness');
const fieldContrast = document.querySelector('input#field-contrast');
const fieldSaturate = document.querySelector('input#field-saturate');
const fieldHueRotate = document.querySelector('input#field-hue-rotate');
const fieldSepia = document.querySelector('input#field-sepia');
fieldBrightness.addEventListener('change', e => {
    console.debug("event-change-brightness:", e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: "set-brightness",
        args: [eventTarget.valueAsNumber]
    });
});
fieldContrast.addEventListener('change', e => {
    console.debug("event-change-contrast:", e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: "set-contrast",
        args: [eventTarget.valueAsNumber]
    });
});
fieldSaturate.addEventListener('change', e => {
    console.debug("event-change-saturate:", e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: "set-saturate",
        args: [eventTarget.valueAsNumber]
    });
});
fieldHueRotate.addEventListener('change', e => {
    console.debug("event-change-hue-rotate:", e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: "set-hue-rotate",
        args: [eventTarget.valueAsNumber]
    });
});
fieldSepia.addEventListener('change', e => {
    console.debug("event-change-sepia:", e);
    const eventTarget = e.currentTarget;
    sendMessageToActive({
        command: "console-log",
        args: [eventTarget.valueAsNumber]
    });
});
browser.tabs.query({ active: true, currentWindow: true, url: URL_YT })
    .then(tabs => {
    return tabs[0] ? loadSettings(tabs[0]) : Promise.reject('No tab found');
})
    .catch(handleError);
console.log("enlight-yt-popup.js loaded");


/***/ })

/******/ });