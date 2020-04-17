// eslint-disable-next-line no-unused-vars
import { IMessage, ISettings, SettingsResponseMessage, MessageCommandEnum, NumberEventTarget } from '../shared/types';

const URL_YT = '*://*.youtube.com/*';

/**
 * Show error in popup and console.
 */
function handleError(error)
{
    document.querySelector('#popup-content').classList.add('hidden');
    document.querySelector('#error-content').classList.remove('hidden');
    document.querySelector('#error-content-exception').innerHTML = JSON.stringify(error);
    console.error(`Error in Enlight-YT: ${error.message}`);
}

function sendMessage(tab, message) : Promise<object>
{
    return browser.tabs.sendMessage(tab.id, message)
        .catch(handleError);
}

function loadTabSettings(tab)
{
    return browser.tabs.sendMessage(tab.id, { 'command': MessageCommandEnum.GetTabSettings })
        .then((message : SettingsResponseMessage) =>
        {
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

function sendMessageToActive(message)
{
    return browser.tabs.query({active: true, currentWindow: true})
        .then(tabs => 
        {
            if (tabs[0]) 
                return sendMessage(tabs[0], message);

            return Promise.resolve(null);
        });
}

const sliderInvert : HTMLInputElement = document.querySelector('input#slider-invert');
const fieldInvert : HTMLInputElement = document.querySelector('input#field-invert');

const sliderBrightness : HTMLInputElement = document.querySelector('input#slider-brightness');
const fieldBrightness : HTMLInputElement = document.querySelector('input#field-brightness');

const sliderContrast : HTMLInputElement = document.querySelector('input#slider-contrast');
const fieldContrast : HTMLInputElement  = document.querySelector('input#field-contrast');

const sliderSaturate : HTMLInputElement = document.querySelector('input#slider-saturate');
const fieldSaturate : HTMLInputElement  = document.querySelector('input#field-saturate');

const sliderHueRotate : HTMLInputElement = document.querySelector('input#slider-hue-rotate');
const fieldHueRotate : HTMLInputElement  = document.querySelector('input#field-hue-rotate');

const sliderSepia : HTMLInputElement = document.querySelector('input#slider-sepia');
const fieldSepia : HTMLInputElement  = document.querySelector('input#field-sepia');

function bindFieldAndSlider(fieldInput: HTMLInputElement, sliderInput: HTMLInputElement)
{
    fieldInput.addEventListener('input', e =>
    {
        const eventTarget = e.currentTarget as NumberEventTarget;

        sliderInput.value = eventTarget.value;
    });
    sliderInput.addEventListener('input', e =>
    {
        const eventTarget = e.currentTarget as NumberEventTarget;

        fieldInput.value = eventTarget.value;
    });
}

bindFieldAndSlider(fieldInvert, sliderInvert);
bindFieldAndSlider(fieldBrightness, sliderBrightness);
bindFieldAndSlider(fieldContrast, sliderContrast);
bindFieldAndSlider(fieldSaturate, sliderSaturate);
bindFieldAndSlider(fieldHueRotate, sliderHueRotate);
bindFieldAndSlider(fieldSepia, sliderSepia);

function addNumberInputEventListener(eventListener, ...numberInputs: HTMLInputElement[])
{
    for (let i in numberInputs)
    {
        numberInputs[i].addEventListener('input', eventListener);
    }
}

addNumberInputEventListener(e =>
{
    // console.debug('event-change-invert:', e);

    const eventTarget = e.currentTarget as NumberEventTarget;

    sendMessageToActive({
        command: MessageCommandEnum.SetInvert,
        args: [eventTarget.valueAsNumber]
    });
}, fieldInvert, sliderInvert);

addNumberInputEventListener(e =>
{
    // console.debug('event-change-brightness:', e);

    const eventTarget = e.currentTarget as NumberEventTarget;

    sendMessageToActive({
        command: MessageCommandEnum.SetBrightness,
        args: [eventTarget.valueAsNumber]
    });
}, fieldBrightness, sliderBrightness);

addNumberInputEventListener(e =>
{
    // console.debug('event-change-contrast:', e);

    const eventTarget = e.currentTarget as NumberEventTarget;

    sendMessageToActive({
        command: MessageCommandEnum.SetContrast,
        args: [eventTarget.valueAsNumber]
    });
}, fieldContrast, sliderContrast);

addNumberInputEventListener(e =>
{
    // console.debug('event-change-saturate:', e);

    const eventTarget = e.currentTarget as NumberEventTarget;

    sendMessageToActive({
        command: MessageCommandEnum.SetSaturate,
        args: [eventTarget.valueAsNumber]
    });
}, fieldSaturate, sliderSaturate);

addNumberInputEventListener(e =>
{
    // console.debug('event-change-hue-rotate:', e);

    const eventTarget = e.currentTarget as NumberEventTarget;
    
    sendMessageToActive({
        command: MessageCommandEnum.SetHueRotate,
        args: [eventTarget.valueAsNumber]
    });
}, fieldHueRotate, sliderHueRotate);

addNumberInputEventListener(e =>
{
    // console.debug('event-change-sepia:', e);

    const eventTarget = e.currentTarget as NumberEventTarget;
    
    sendMessageToActive({
        command: MessageCommandEnum.SetSepia,
        args: [eventTarget.valueAsNumber]
    });
}, fieldSepia, sliderSepia);

browser.tabs.query({ active: true, currentWindow: true, url: URL_YT })
    .then(tabs => tabs[0] ? loadTabSettings(tabs[0]) : Promise.reject('No tab found'))
    .catch(handleError);

console.log('enlight-yt-popup.js loaded');

export {};