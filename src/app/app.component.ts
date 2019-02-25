import { Component, OnInit } from '@angular/core';
// import {SpotifyService} from './spotify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyService} from './spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'angular-vdoo-spotify';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private spotifyService: SpotifyService) {
    // this.init();
  }
  init() {
      this.activatedRoute.fragment.subscribe( fragment => {

          const params: any = {};
          const r = /([^&;=]+)=?([^&;]*)/g;
          let e;
          while (e = r.exec(fragment)) {
              params[e[1]] = decodeURIComponent(e[2]);
          }
          console.log('params', params);
          const { access_token, state } = params;
          const stateKey = 'spotify_auth_state';
          const storedState = localStorage.getItem(stateKey);
          if (access_token && (state == null)) { // || state !== storedState)) {
              alert('There was an error during the authentication');
          } else {
              localStorage.removeItem(stateKey);
              if (access_token) {
                  alert(access_token);
                  this.spotifyService.setAccessToken(access_token);
              } else {
                  alert('no token');
                  this.router.navigateByUrl('/login'); //this.router.createUrlTree(['/login']))
              }
          }
      });
  }
}
