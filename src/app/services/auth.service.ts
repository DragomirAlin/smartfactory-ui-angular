import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient) {
    }


    retrieveToken(code): any {
        const params = new URLSearchParams();
        params.append('grant_type', environment.grantType);
        params.append('client_id', environment.clientId);
        params.append('client_secret', environment.clientSecret);
        params.append('redirect_uri', environment.redirectUri);
        params.append('code', code);
        console.log('retrive token');
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: 'Basic ' + btoa(environment.clientId + ':secret')
        });
        this.http.post(environment.openIdUrl, params.toString(), {headers})
            .subscribe(
                data => this.saveToken(data),
                err => alert('Invalid Credentials')
            );
    }

    saveToken(token): any {
        const expireDate = new Date().getTime() + (1000 * token.expires_in);
        Cookie.set('access_token', token.access_token, expireDate);
        console.log('Obtained Access token');
        window.location.href = environment.redirectUri;
    }

    checkCredentials(): any {
        return Cookie.check('access_token');
    }

    logout(): void {
        const token = Cookie.get('access_token');
        Cookie.delete('access_token');
        window.location.href = environment.logoutUrl + token + '&post_logout_redirect_uri=' + environment.redirectUri;
    }
}
