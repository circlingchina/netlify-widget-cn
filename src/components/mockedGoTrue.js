const fetch = require("node-fetch");


function isObj(o) {
    return typeof o === 'object' && o !== null
}

function isStr(s) {
    return typeof s === 'string' || s instanceof String;
}

class MockedGoTrue {

    // acceptInvite(token: string, password: string, remember?: boolean): Promise<User>;
    // acceptInviteExternalUrl(provider: string, token: string): string;
    // confirm(token: string, remember?: boolean): Promise<User>;
    // createUser(tokenResponse: any, remember?: boolean): Promise<User>;

    // loginExternalUrl(provider: string): string;
    // recover(token: string, remember?: boolean): Promise<User>;
    // requestPasswordRecovery(email: string): Promise<void>;
    // settings(): Promise<Settings>;
    // signup(email: string, password: string, data: any): Promise<void>;
    // verify(type: string, token: string, remember?: boolean): Promise<User>;


    constructor(apiBase) {
        this.apiBase = apiBase;
        this._currentUser = null;
    }

    // currentUser(): User | null;
    currentUser() {
        return this._currentUser || null;
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
            credentials: 'same-origin',
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
            fetch(url, this._makeFetchOpts('POST', payload)).then(response => {
                if (response.ok) {
                    response.json().then(user => {
                        this.currentUser = user;
                        resolve(this.currentUser);
                    });
                } else {
                    console.log(new Error('Cannot get login token'));
                    resolve(null);
                }
            });
        });
    }
}

// let goture = new MockedGoTrue('http://localhost:4567');

// goture.login('ydatylmonv@gmail.com','password').then(
//    res => console.log(res)
// )

export default MockedGoTrue;
