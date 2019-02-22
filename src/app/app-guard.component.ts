
import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import {SpotifyService} from './spotify.service';

@Injectable({
    providedIn: 'root'
})
export class AppGuardComponent implements CanActivate {

    stateKey = 'spotify_auth_state';
    constructor(private router: Router, private spotifyService: SpotifyService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const storedState = localStorage.getItem(this.stateKey);
        // extract access token
        if (route.fragment) {
            const fragment = route.fragment;
            const params: any = {};
            const r = /([^&;=]+)=?([^&;]*)/g;
            let e;
            while (e = r.exec(fragment)) {
                params[e[1]] = decodeURIComponent(e[2]);
            }
            console.log('params', params);
            const { access_token = '', state: paramsState } = params;
            if (access_token && (paramsState == null || paramsState !== storedState)) {
                alert('There was an error during the authentication');
            } else {
                localStorage.removeItem(this.stateKey);
                if (access_token) {
                    // alert(access_token);
                    this.spotifyService.setAccessToken(access_token);
                    return true;
                } else {
                    // alert('no token');
                    this.router.navigateByUrl('/login'); //this.router.createUrlTree(['/login']))
                    return false;
                }
            }
        }

        if (storedState) {
            return true;
        }


        const redirectUrl = route['_routerState']['url'];
        this.router.navigateByUrl(
            this.router.createUrlTree(
                ['/login'], {
                    queryParams: {
                        redirectUrl
                    }
                }
            )
        );

        return false;
    }
}
