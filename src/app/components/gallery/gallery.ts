import { Component } from '@angular/core';
import { Carousel } from '@components/carousel/carousel';
import { skyGalleryImages } from '@common/sky-gallery-images';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
  imports: [Carousel],
})
export class Gallery {
  galleryImages = skyGalleryImages;
}
