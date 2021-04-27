import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public jwtHelper = new JwtHelperService();
    public organization = 'none';

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
        this.getOrganization();
        window.location.href = environment.redirectUri;
    }

    getResource(resourceUrl): Observable<any> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: 'Bearer ' + Cookie.get('access_token')
        });
        return this.http.get(resourceUrl, {headers});
    }

    checkCredentials(): any {
        return Cookie.check('access_token');
    }

    logout(): void {
        Cookie.delete('access_token');
        window.location.reload();
    }

    getOrganization(): any {
        const token = Cookie.get('access_token');

        const payload = this.jwtHelper.decodeToken(token);
        console.log(payload);
        this.organization = payload.organization;
        return this.organization;
    }
}
