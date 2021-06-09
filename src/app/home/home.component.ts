import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/service/auth.service';
import {KeycloakService} from 'keycloak-angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public isAuthenticated = false;


    constructor(private keycloakService: KeycloakService) {
    }

    ngOnInit(): void {
    }
    logout(): void {
        this.keycloakService.logout();
    }

}
