import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public jwtHelper = new JwtHelperService();
    public clientId = 'jwtClient';
    public organization = 'none';
    public redirectUri = 'http://localhost:4200/home';

    constructor(
        private http: HttpClient) {
    }


    retrieveToken(code): any {
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.clientId);
        params.append('client_secret', 'jwtClientSecret');
        params.append('redirect_uri', this.redirectUri);
        params.append('code', code);

        // tslint:disable-next-line:max-line-length
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: 'Basic ' + btoa(this.clientId + ':secret')
        });
        this.http.post('http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/token', params.toString(), {headers})
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
        window.location.href = 'http://localhost:8084';
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
