
const ExpiryMargin = 60 * 1000;
const storageKey = 'circlingchina.user';

let currentUser = null;

const isBrowser = () => typeof window !== 'undefined';

export default class User {
    constructor(api, tokenResponse, audience) {
        this.api = api;
        this.url = api.apiURL;
        this.audience = audience;
        this._processTokenResponse(tokenResponse);
        currentUser = this;
      }

    _processTokenResponse(tokenResponse) {
        this.token = tokenResponse;
        let claims;
        try {
            claims = JSON.parse(urlBase64Decode(tokenResponse.access_token.split('.')[1]));
            this.token.expires_at = claims.exp * 1000;
        } catch (e) {
            console.error(
            new Error(
                `Gotrue-js: Failed to parse tokenResponse claims: ${JSON.stringify(tokenResponse)}`,
            ),
            );
    }
    }
}
