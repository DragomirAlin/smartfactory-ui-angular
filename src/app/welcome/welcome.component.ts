import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    login(): void {
        window.location.href = environment.loginUrl + environment.clientId;
    }

}
