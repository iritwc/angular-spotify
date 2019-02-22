import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  stateKey = 'spotify_auth_state';
  CLIENT_ID = 'b48cb361fcbf4191a8ddc4a3f0361f87';
  REDIRECT_URI = 'http://localhost:4200'; // Your redirect uri

    constructor(private router: Router) { }
    generateRandomString = (length) => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

  ngOnInit() {}
  login() {
      const state = this.generateRandomString(16);
      localStorage.setItem(this.stateKey, state);
      const scope = 'user-read-private user-read-email';

      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(this.CLIENT_ID);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(this.REDIRECT_URI);
      url += '&state=' + encodeURIComponent(state);

      window.location = url;
  }

}
