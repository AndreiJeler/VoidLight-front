import { Component, OnInit } from '@angular/core';
import {Gallery, GalleryRef} from 'ng-gallery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  galleryId = 'posts';


  constructor(private gallery: Gallery ) { }

  ngOnInit(): void {
      // CHECK BELOW FOR USAGE
      // TODO: https://github.com/MurhafSousli/ngx-gallery/wiki/Mixed-Content-Usage
      const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
      galleryRef.addImage({
        src: '../../../assets/1.jpg',
        thumb: '../../../assets/1.jpg'
      });
      galleryRef.addImage({
        src: '../../../assets/1.jpg',
        thumb: '../../../assets/1.jpg'
      });
      // galleryRef.addVideo({
      //   src: 'VIDEO_URL',
      //   thumb: '(OPTIONAL)VIDEO_THUMBNAIL_URL',
      //   poster: '(OPTIONAL)VIDEO_POSTER_URL'
      // });
      galleryRef.addYoutube ({
        src: 'BGnEicQOfdE'
      });
  }
}
