import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'smart-factory';

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
