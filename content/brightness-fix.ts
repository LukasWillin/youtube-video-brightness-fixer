
import { CSS_KEYS, CSS_CACHE_MAP } from '../shared/cssKeys';

import { IMessage, ISettings } from '../shared/types';

let inititalised = false;

(function() {

    let cache : ISettings = {} as ISettings;

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

    function setLocalStorage(cacheKey, value)
    {
        cache[cacheKey] = value;
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    }

    function getLocalStorage() : ISettings
    {
        const settings = JSON.parse(localStorage.getItem(STORAGE_KEY)) as ISettings;

        return settings ? settings : { brightness: 1, contrast: 1, saturate: 1, hueRotate: 0, sepia: 0 };
    }

    function restoreFromStorage()
    {
        cache = getLocalStorage();

        setBrightness(cache.brightness);
        setContrast(cache.contrast);
        setSaturate(cache.saturate);
        setHueRotate(cache.hueRotate);
        setSepia(cache.sepia);
    }

    //#endregion

    //#region CSS Injection

    let root = document.documentElement;

    function setCSSVar(key : string, value : any, type : string = '')
    {
        console.log(`set css variable > ${key}: ${value}${type};`);
        
        setLocalStorage(CSS_CACHE_MAP[key], value);
        
        root.style.setProperty(key, `${value}${type}`);

        console.log("done");
    }

    function setBrightness(vFloat)
    {
        setCSSVar(CSS_KEYS.BRIGHTNESS, vFloat);
    }

    function setContrast(vFloat)
    {
        setCSSVar(CSS_KEYS.CONTRAST, vFloat);
    }

    function setSaturate(vFloat)
    {
        setCSSVar(CSS_KEYS.SATURATE, vFloat);
    }

    function setHueRotate(vFloat)
    {
        setCSSVar(CSS_KEYS.HUE_ROTATE, vFloat, 'deg');
    }

    function setSepia(vFloat)
    {
        setCSSVar(CSS_KEYS.SEPIA, vFloat);
    }

    //#endregion
    
    // setBrightness(0.9);
    // setContrast(1);
    // setSaturate(1);
    // setHueRotate(0);
    // setSepia(0);

    restoreFromStorage();

    function applyMessage(fn : Function, message: IMessage)
    {
        return fn.apply(null, message.args);
    }

    /**
     * Listen for messages from the popup script.
     */
    browser.runtime.onMessage.addListener((message: IMessage) =>
    {
        switch (message.command)
        {
            case 'set-brightness':
                applyMessage(setBrightness, message);
                break;
            case 'set-contrast':
                applyMessage(setContrast, message);
                break;
            case 'set-saturate':
                applyMessage(setSaturate, message);
                break;
            case 'set-hue-rotate':
                applyMessage(setHueRotate, message);
                break;
            case 'set-sepia':
                applyMessage(setSepia, message);
                break;
            case 'get-settings':
                return Promise.resolve({ response: getLocalStorage() });
            case 'console-log':
                console.log.apply(console, message.args);
                break;
            default:
                console.debug(message);
                break;
        }
    });

    console.log("Script content ran to end");

})();

export {};