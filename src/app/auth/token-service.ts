import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {environment} from '../../environments/environment';

const TOKEN_KEY = 'access_token';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {
    }

    public saveToken(token): any {
        const expireDate = new Date().getTime() + (1000 * token.expires_in);
        Cookie.set(TOKEN_KEY, token.access_token, expireDate);
        window.location.href = environment.redirectUri;
    }

    public getToken(): string {
        return Cookie.get(TOKEN_KEY);
    }

    public checkToken(): boolean {
        return Cookie.check(TOKEN_KEY);
    }

    public deleteToken(): void {
        Cookie.delete('access_token');
    }
}
