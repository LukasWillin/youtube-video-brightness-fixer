interface IMessage
{
    command: string,
    args: Array<any>
}

enum MessageCommandEnum
{
    // eslint-disable-next-line no-unused-vars
    SetInvert = 'set-invert',
    // eslint-disable-next-line no-unused-vars
    SetBrightness = 'set-brightness',
    // eslint-disable-next-line no-unused-vars
    SetContrast = 'set-contrast',
    // eslint-disable-next-line no-unused-vars
    SetSaturate = 'set-saturate',
    // eslint-disable-next-line no-unused-vars
    SetHueRotate = 'set-hue-rotate',
    // eslint-disable-next-line no-unused-vars
    SetSepia = 'set-sepia',
    // eslint-disable-next-line no-unused-vars
    GetTabSettings = 'get-tab-settings',
    // eslint-disable-next-line no-unused-vars
    ConsoleLog = 'console-log'
}

interface IResponseMessage 
{
    response: any
}

class SettingsResponseMessage
{
    response : ISettings
}

interface ISettings
{
    invert: number,
    brightness: number,
    contrast: number,
    saturate: number,
    hueRotate: number,
    sepia: number
}

interface NumberEventTarget extends EventTarget
{
    valueAsNumber: number,
    value: string
}

export { IMessage, ISettings, IResponseMessage, SettingsResponseMessage, MessageCommandEnum, NumberEventTarget };