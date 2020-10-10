export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


// https://programmingwithmosh.com/javascript/javascript-throttle-and-debounce-patterns/
export function throttle(callback, interval) { // permet d'éviter d'appeler une fonction plusieurs fois de suite trop rapidement
    let enableCall = true;

    return function (...args) {
        if (!enableCall) {
            return;
        }

        enableCall = false;
        callback.apply(this, args);
        setTimeout(() => enableCall = true, interval);
    }
}
