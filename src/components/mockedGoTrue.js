const fetch = require("node-fetch");


function isObj(o) {
    return typeof o === 'object' && o !== null
}

function isStr(s) {
    return typeof s === 'string' || s instanceof String;
}

const key = 'circlingchina.user';

class MockedGoTrue {

    // acceptInvite(token: string, password: string, remember?: boolean): Promise<User>;
    // acceptInviteExternalUrl(provider: string, token: string): string;
    // confirm(token: string, remember?: boolean): Promise<User>;
    // createUser(tokenResponse: any, remember?: boolean): Promise<User>;

    // loginExternalUrl(provider: string): string;
    // recover(token: string, remember?: boolean): Promise<User>;

    // settings(): Promise<Settings>;

    // verify(type: string, token: string, remember?: boolean): Promise<User>;


    constructor(apiBase) {
        this.apiBase = apiBase;
        this._currentUser = null;
    }

    // currentUser(): User | null;
    currentUser() {
        const storedUser = localStorage.getItem(key);
        if (storedUser === null) {
            return null;
        }
        return JSON.parse(storedUser);
    }

    _makeFetchOpts(method, payload) {
        let body;

        if (isStr(payload)) {
            body = payload;
        }
        else if (isObj(payload)) {
            body = JSON.stringify(payload);
        }
        else {
            body = '';
        }

        return {
            method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body
        };
    }

    // login(email: string, password: string, remember?: boolean): Promise<User>;
    login(email, password, remember) {
        return new Promise((resolve, reject) => {
            const url = `${this.apiBase}/auth/token`;
            const payload = { email, password };

            const requestOpts = this._makeFetchOpts('POST', payload);
            requestOpts.headers["X-JWT-AUD"] = "https://www.circlingquanquan.com";

            fetch(url, requestOpts).then(response => {
                if (response.ok) {
                    response.json().then(user => {
                        console.log('user', user);
                        this.currentUser = user;
                        this._saveUser(user);
                        resolve(user);
                    });
                } else {
                    response.json().then(res => {
                        reject(res.message);
                    }
                )}
            });
        });
    }
     // signup(email: string, password: string, data: any): Promise<void>;
    signup(email, password, data) {
        return new Promise((resolve, reject) => {
            const url = `${this.apiBase}/auth/signup`;
            const payload = { email, password, data };

            const requestOpts = this._makeFetchOpts('POST', payload);
            fetch(url, requestOpts).then(response => {
                resolve();
            });
        })
    }

    // requestPasswordRecovery(email: string): Promise<void>;
    requestPasswordRecovery(email) {
        return new Promise((resolve, reject) => {
            const url = `${this.apiBase}/auth/passwordRecovery`;
            const payload = { email };

            const requestOpts = this._makeFetchOpts('POST', payload);
            fetch(url, requestOpts).then(response => {
                resolve();
            });
        })
    }

    // recover(token: string, remember?: boolean): Promise<User>;
    recover(token) {
        return new Promise((resolve, reject) => {
            const url = `${this.apiBase}/auth/passwordRecoveryConfirm`;
            const payload = {token };

            const requestOpts = this._makeFetchOpts('POST', payload);
            fetch(url, requestOpts).then(response => {
                if (response.ok) {
                    response.json().then(user => {
                        console.log('user', user);
                        this.currentUser = user;
                        this._saveUser(user);
                        resolve(user);
                    });
                } else {
                    response.json().then(res => {
                        reject(res.message);
                    }
                )}
            });
        })
    }
    // updatePassword(userId: string, password: string): Promise<User>;
    updatePassword(userId, password) {
        return new Promise((resolve, reject) => {
            const url = `${this.apiBase}/auth/passwordRecoveryPerform`;
            const payload = {userId, password };

            const requestOpts = this._makeFetchOpts('POST', payload);
            fetch(url, requestOpts).then(response => {
                if (response.ok) {
                    response.json().then(user => {
                        console.log('user', user);
                        this.currentUser = user;
                        this._saveUser(user);
                        resolve(user);
                    });
                } else {
                    response.json().then(res => {
                        reject(res.message);
                    }
                )}
            });
        })
    }

    _saveUser(user) {
        localStorage.setItem(key, JSON.stringify(user));
    }

    // verify(type: string, token: string, remember?: boolean): Promise<User>;

    // confirm(token: string, remember?: boolean): Promise<User>;
    confirm(token, remember) {
        return new Promise((resolve, reject) => {
            const url = `${this.apiBase}/auth/confirm`;
            const payload = { token };
            const requestOpts = this._makeFetchOpts('POST', payload);
            fetch(url, requestOpts).then(response => {
                if (response.ok) {
                    response.json().then(user => {
                        console.log('user', user);
                        this.currentUser = user;
                        this._saveUser(user);
                        resolve(user);
                    });
                } else {
                    response.json().then(res => {
                        reject(res.message);
                    }
                )}
            });
        });
    }

}


export default MockedGoTrue;
