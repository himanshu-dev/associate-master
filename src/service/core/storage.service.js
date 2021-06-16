export const StorageKeys = {
    token: 'access-token',
    user: 'user',
    isCookieAccepted: 'isCookieAccepted'
};

export class StorageService {
    static get(key) {
        return sessionStorage.getItem(key);
    }
    static set(key, value) {
        sessionStorage.setItem(key, value);
    }
    static getObj(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }
    static setObj(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    static getPerm(key) {
        let item = localStorage.getItem(key);
        try {
           return JSON.parse(item);
        } catch (e) {
            return item;
        }
    }
    static setPerm(key, value) {
        if (typeof value === 'string') {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
    static delete(key) {
        sessionStorage.removeItem(key);
    }
    static clearAll() {
        sessionStorage.clear();
    }
}

export class TempStorage {
    static loggedInUser = {};
    static authToken = '';
}
