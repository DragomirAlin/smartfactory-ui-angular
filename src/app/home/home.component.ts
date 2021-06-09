import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/service/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public isAuthenticated = false;


    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated();
        const i = window.location.href.indexOf('code');
        if (!this.isAuthenticated && i !== -1) {
            this.authService.retrieveToken(window.location.href.substring(i + 5));
        }
    }

    logout(): void {
        this.authService.logout();
    }

}
