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
      // this.router.events.subscribe(e => {
      //     console.log('events' ,e);
      // });
      //
      // this.activatedRoute.data.subscribe(data => {
      //     console.log('data', data);
      // });
      console.log('url', this.router.url);
      console.log('snapshot url' , this.activatedRoute.snapshot.url);
      this.activatedRoute.fragment.subscribe( fragment => {

          const params = {},
              r = /([^&;=]+)=?([^&;]*)/g;
          let e;
          while (e = r.exec(fragment)) {
              params[e[1]] = decodeURIComponent(e[2]);
          }
          console.log('params', params);
          const { access_token, state } = params;
          const stateKey = 'spotify_auth_state';
          const storedState = localStorage.getItem(stateKey);
          // console.log(storedState, state, access_token);
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
