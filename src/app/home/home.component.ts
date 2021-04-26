import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.checkCredentials();
    const i = window.location.href.indexOf('code');
    if (!this.isLoggedIn && i !== -1) {
      this.authService.retrieveToken(window.location.href.substring(i + 5));
    }

  }

}
