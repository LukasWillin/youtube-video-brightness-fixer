
const CSS_KEYS = {
    BRIGHTNESS: '--brf-vfloat-brightness',
    CONTRAST: '--brf-vfloat-contrast',
    SATURATE: '--brf-vfloat-saturate',
    HUE_ROTATE: '--brf-vdeg-hue-rotate',
    SEPIA: '--brf-vfloat-sepia'
};

const CSS_CACHE_MAP = {
    [CSS_KEYS.BRIGHTNESS]: 'brightness',
    [CSS_KEYS.CONTRAST]: 'contrast',
    [CSS_KEYS.SATURATE]: 'saturate',
    [CSS_KEYS.HUE_ROTATE]: 'hueRotate',
    [CSS_KEYS.SEPIA]: 'sepia'
}

export { CSS_KEYS, CSS_CACHE_MAP }

