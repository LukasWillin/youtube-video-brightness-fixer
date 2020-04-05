
import CSS_KEYS from '../shared/CSSKeys';

interface IMessage
{
    command: string,
    args: Array<any>
}

let inititalised = false;

(function() {

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

    function setLocalStorage(key, value)
    {
        localStorage.setItem(STORAGE_KEY + key, JSON.stringify(value));
    }

    function getLocalStorage(key : string = null)
    {
        return key ? JSON.parse(localStorage.getItem(STORAGE_KEY + key)) :
            {
                [CSS_KEYS.BRIGHTNESS]: getLocalStorage(CSS_KEYS.BRIGHTNESS),
                [CSS_KEYS.CONTRAST]: getLocalStorage(CSS_KEYS.CONTRAST),
                [CSS_KEYS.SATURATE]: getLocalStorage(CSS_KEYS.SATURATE),
                [CSS_KEYS.HUE_ROTATE]: getLocalStorage(CSS_KEYS.HUE_ROTATE),
                [CSS_KEYS.SEPIA]: getLocalStorage(CSS_KEYS.SEPIA)
            };
    }

    function restoreFromStorage()
    {
        setBrightness(getLocalStorage(CSS_KEYS.BRIGHTNESS));
        setContrast(getLocalStorage(CSS_KEYS.CONTRAST));
        setSaturate(getLocalStorage(CSS_KEYS.SATURATE));
        setHueRotate(getLocalStorage(CSS_KEYS.HUE_ROTATE));
        setSepia(getLocalStorage(CSS_KEYS.SEPIA));
    }

    //#endregion

    //#region CSS Injection

    let root = document.documentElement;

    function setCSSVar(key : string, value : any, type : string = '')
    {
        console.log(`set css variable > ${key}: ${value}${type};`);
        setLocalStorage(key, value);
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

    console.log("Script ran to end");

})();