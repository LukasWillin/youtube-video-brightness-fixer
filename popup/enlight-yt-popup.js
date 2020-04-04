// browser.tabs.create({url: "/my-page.html"}).then(() => {
//     browser.tabs.executeScript({
//       code: `console.log('location:', window.location.href);`
//     });
//   });

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
function reportError(error)
{
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    document.querySelector("#error-content-exception").innerHTML = JSON.stringify(error);
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

function sendMessageToTabs(message)
{
    // tabs.query doc - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/query
    return browser.tabs.query({ url: "*://*.youtube.com/*" })
        .then(tabs =>
        {
            if (tabs)
            {
                tabs.forEach(t => browser.tabs.sendMessage(t.id, message));
            }
        })
        .catch(reportError);
}

const fieldBrightness = document.querySelector('input#field-brightness');
const fieldContrast = document.querySelector('input#field-contrast');
const fieldSaturate = document.querySelector('input#field-saturate');
const fieldHueRotate = document.querySelector('input#field-hue-rotate');
const fieldSepia = document.querySelector('input#field-sepia');

fieldBrightness.addEventListener('change', e =>
{
    console.debug("event-change-brightness:", e);

    sendMessageToTabs({
        command: "set-brightness",
        args: [e.target.valueAsNumber]
    });
});

fieldContrast.addEventListener('change', e =>
{
    console.debug("event-change-contrast:", e);

    sendMessageToTabs({
        command: "set-contrast",
        args: [e.target.valueAsNumber]
    });
});

fieldSaturate.addEventListener('change', e =>
{
    console.debug("event-change-saturate:", e);

    sendMessageToTabs({
        command: "set-saturate",
        args: [e.target.valueAsNumber]
    });
});

fieldHueRotate.addEventListener('change', e =>
{
    console.debug("event-change-hue-rotate:", e);

    sendMessageToTabs({
        command: "set-hue-rotate",
        args: [e.target.valueAsNumber]
    });
});

fieldSepia.addEventListener('change', e =>
{
    console.debug("event-change-sepia:", e);

    sendMessageToTabs({
        command: "console-log",
        args: [e.target.valueAsNumber]
    });
});

console.log("enlight-yt-popup.js loaded");