import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;


    constructor(private keycloakService: KeycloakService) {
    }

    public async ngOnInit(): Promise<void> {
        this.isLoggedIn = await this.keycloakService.isLoggedIn();

        if (this.isLoggedIn) {
            this.userProfile = await this.keycloakService.loadUserProfile();
        }
    }

    public logout(): void {
        this.keycloakService.logout();
    }

}
