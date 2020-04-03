
(function() {

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

    // EnlightYT.setBrightness(10);
    // EnlightYT.setContrast(1);
    // EnlightYT.setSaturate(4);
    // EnlightYT.setHueRotate(0);
    // EnlightYT.setSepia(0);

    restoreFromStorage();

    console.log("Script ran to end");

})();