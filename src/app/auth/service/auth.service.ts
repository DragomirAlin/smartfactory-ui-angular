import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {TokenService} from '../token/token-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private tokenService: TokenService) {
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
                data => this.tokenService.saveToken(data),
                err => alert('Invalid Credentials')
            );
    }

    isAuthenticated(): boolean {
        return this.tokenService.checkToken();
    }

    logout(): void {
        const token = this.tokenService.getToken();
        this.tokenService.deleteToken();
        window.location.href = environment.logoutUrl + token + '&post_logout_redirect_uri=' + environment.redirectUri;
    }
}
