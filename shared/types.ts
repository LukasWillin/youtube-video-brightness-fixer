interface IMessage
{
    command: string,
    args: Array<any>
}

enum MessageCommandEnum
{
    SetBrightness = 'set-brightness',
    SetContrast = 'set-contrast',
    SetSaturate = 'set-saturate',
    SetHueRotate = 'set-hue-rotate',
    SetSepia = 'set-sepia',
    GetTabSettings = 'get-tab-settings',
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
    brightness: number,
    contrast: number,
    saturate: number,
    hueRotate: number,
    sepia: number
}

export { IMessage, ISettings, IResponseMessage, SettingsResponseMessage, MessageCommandEnum };