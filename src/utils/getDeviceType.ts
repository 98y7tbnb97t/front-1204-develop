

export const isDeviceMobile = ():boolean => {
    const ua = navigator.userAgent;
    const isIpad = /iPad/.test(ua);
    return (
        !isIpad &&
        (document.body.clientWidth < 600 || document.body.clientHeight < 600) &&
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua))
};

export const isAppleDevice = ():boolean => {
    const ua = navigator.userAgent;
    return /iPhone|iPad|iPod/.test(ua);
};