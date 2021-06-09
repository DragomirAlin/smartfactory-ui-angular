import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {TokenService} from '../token/token-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private tokenService: TokenService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },

            });
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
