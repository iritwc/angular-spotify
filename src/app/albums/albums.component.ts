import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less']
})
export class AlbumsComponent implements OnInit {

  albums;
  selectedAlbum;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.getAlbums().subscribe(albums => {
      this.albums = albums.items;
    });
  }
}
