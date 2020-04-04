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
function handleError(error)
{
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    document.querySelector("#error-content-exception").innerHTML = JSON.stringify(error);
    console.error(`Error in Enlight-YT: ${error.message}`);
}

function sendMessage(tab, message) : Promise<object>
{
    return browser.tabs.sendMessage(tab.id, message)
        .catch(handleError);
}

function loadSettings(tab)
{
    return browser.tabs.sendMessage(tab.id, { 'command': 'get-settings' })
        .then(response =>
        {
            console.log("Response from the content script:");
            console.log(response);
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

const fieldBrightness = document.querySelector('input#field-brightness');
const fieldContrast = document.querySelector('input#field-contrast');
const fieldSaturate = document.querySelector('input#field-saturate');
const fieldHueRotate = document.querySelector('input#field-hue-rotate');
const fieldSepia = document.querySelector('input#field-sepia');

fieldBrightness.addEventListener('change', e =>
{
    console.debug("event-change-brightness:", e);

    const eventTarget : any = e.currentTarget;

    sendMessageToActive({
        command: "set-brightness",
        args: [eventTarget.valueAsNumber]
    });
});

fieldContrast.addEventListener('change', e =>
{
    console.debug("event-change-contrast:", e);

    const eventTarget : any = e.currentTarget;

    sendMessageToActive({
        command: "set-contrast",
        args: [eventTarget.valueAsNumber]
    });
});

fieldSaturate.addEventListener('change', e =>
{
    console.debug("event-change-saturate:", e);

    const eventTarget : any = e.currentTarget;

    sendMessageToActive({
        command: "set-saturate",
        args: [eventTarget.valueAsNumber]
    });
});

fieldHueRotate.addEventListener('change', e =>
{
    console.debug("event-change-hue-rotate:", e);

    const eventTarget : any = e.currentTarget;

    sendMessageToActive({
        command: "set-hue-rotate",
        args: [eventTarget.valueAsNumber]
    });
});

fieldSepia.addEventListener('change', e =>
{
    console.debug("event-change-sepia:", e);

    const eventTarget : any = e.currentTarget;

    sendMessageToActive({
        command: "console-log",
        args: [eventTarget.valueAsNumber]
    });
});

console.log("enlight-yt-popup.js loaded");