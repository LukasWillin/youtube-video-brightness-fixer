interface IMessage
{
    command: string,
    args: Array<any>
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

export { IMessage, ISettings, IResponseMessage, SettingsResponseMessage };