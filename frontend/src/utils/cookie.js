export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

export function setCookie(name, value) {
    const cookieValue = encodeURIComponent(value);
    document.cookie = `${name}=${cookieValue};`;
}