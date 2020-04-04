
(function() {

    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.enlightYTInitialised) 
        return;
    
    window.enlightYTInitialised = true;

    const STORAGE_KEY = 'enlight-yt';

    const VAR_KEY_BRIGHTNESS = '--brf-vfloat-brightness';
    const VAR_KEY_CONTRAST = '--brf-vfloat-contrast';
    const VAR_KEY_SATURATE = '--brf-vfloat-saturate';
    const VAR_KEY_HUE_ROTATE = '--brf-vdeg-hue-rotate';
    const VAR_KEY_SEPIA = '--brf-vfloat-sepia';

    //#region Local Storage

    function setLocalStorage(key, value)
    {
        localStorage.setItem(STORAGE_KEY + key, JSON.stringify(value));
    }

    function getLocalStorage(key)
    {
        return JSON.parse(localStorage.getItem(STORAGE_KEY + key));
    }

    function restoreFromStorage()
    {
        setBrightness(getLocalStorage(VAR_KEY_BRIGHTNESS));
        setContrast(getLocalStorage(VAR_KEY_CONTRAST));
        setSaturate(getLocalStorage(VAR_KEY_SATURATE));
        setHueRotate(getLocalStorage(VAR_KEY_HUE_ROTATE));
        setSepia(getLocalStorage(VAR_KEY_SEPIA));

        // console.log(getLocalStorage(VAR_KEY_BRIGHTNESS));
    }

    //#endregion

    //#region CSS Injection

    let root = document.documentElement;

    function setCSSVar(key, value, type = '')
    {
        console.log(`set css variable > ${key}: ${value}${type};`);
        setLocalStorage(key, value);
        root.style.setProperty(key, `${value}${type}`);
        console.log("done");
    }

    function setBrightness(vFloat)
    {
        setCSSVar(VAR_KEY_BRIGHTNESS, vFloat);
    }

    function setContrast(vFloat)
    {
        setCSSVar(VAR_KEY_CONTRAST, vFloat);
    }

    function setSaturate(vFloat)
    {
        setCSSVar(VAR_KEY_SATURATE, vFloat);
    }

    function setHueRotate(vFloat)
    {
        setCSSVar(VAR_KEY_HUE_ROTATE, vFloat, 'deg');
    }

    function setSepia(vFloat)
    {
        setCSSVar(VAR_KEY_SEPIA, vFloat);
    }

    //#endregion
    
    const EnlightYT = {
        setBrightness: setBrightness,
        setHueRotate: setHueRotate,
        setContrast: setContrast,
        setSepia: setSepia,
        setSaturate: setSaturate
    };

    // EnlightYT.setBrightness(0.9);
    // EnlightYT.setContrast(1);
    // EnlightYT.setSaturate(1);
    // EnlightYT.setHueRotate(0);
    // EnlightYT.setSepia(0);

    restoreFromStorage();

    function applyMessage(fn, message)
    {
        return fn.apply(null, message.args);
    }

    /**
     * Listen for messages from the background script.
     * Call "beastify()" or "reset()".
     */
    browser.runtime.onMessage.addListener((message) =>
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