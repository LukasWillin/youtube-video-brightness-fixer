
import { CSS_KEYS, CSS_CACHE_MAP } from '../shared/cssKeys';

// eslint-disable-next-line no-unused-vars
import { IMessage, ISettings, MessageCommandEnum } from '../shared/types';

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
        const defaultSettings = { invert: 0, brightness: 1, contrast: 1, saturate: 1, hueRotate: 0, sepia: 0 };

        try
        {
            const settings = JSON.parse(localStorage.getItem(STORAGE_KEY)) as ISettings;

            return settings ? settings : defaultSettings;
        }
        catch(e)
        {
            console.error(e);
        }

        return defaultSettings;
    }

    function restoreFromStorage()
    {
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

    function setCSSVar(key : string, value : any, type : string = '')
    {
        setLocalStorage(CSS_CACHE_MAP[key], value);
        
        root.style.setProperty(key, `${value}${type}`);
    }

    function setInvert(vFloat)
    {
        setCSSVar(CSS_KEYS.INVERT, vFloat);
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
            case MessageCommandEnum.SetInvert:
                applyMessage(setInvert, message);
                break;
            case MessageCommandEnum.SetBrightness:
                applyMessage(setBrightness, message);
                break;
            case MessageCommandEnum.SetContrast:
                applyMessage(setContrast, message);
                break;
            case MessageCommandEnum.SetSaturate:
                applyMessage(setSaturate, message);
                break;
            case MessageCommandEnum.SetHueRotate:
                applyMessage(setHueRotate, message);
                break;
            case MessageCommandEnum.SetSepia:
                applyMessage(setSepia, message);
                break;
            case MessageCommandEnum.GetTabSettings:
                return Promise.resolve({ response: getLocalStorage() });

            case MessageCommandEnum.ConsoleLog:
                console.log(...message.args);
                break;
            default:
                console.warn(message);
                break;
        }
    });

    console.log('>> content-script loaded');

})();

export {};