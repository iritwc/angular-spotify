import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

    token;
    artistId = '0du5cEVh5yTK9QJze8zA0C'; // Bruno mars' Id @ Spotify

    constructor(private http: HttpClient) {}

    setAccessToken(token: string) {
        this.token = token;
    }
    // getAccessToken() { return this.token; }
    getAlbums(): Observable<any> {

        const url = `https://api.spotify.com/v1/artists/${this.artistId}/albums`;
        const options = {headers: { 'Authorization': 'Bearer ' + this.token }};
        return this.http.get(url, options).pipe(
            catchError(this.handleError('get albums'))
        );
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
