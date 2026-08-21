import { Component, signal } from '@angular/core';
import { Carousel } from '@components/carousel/carousel';
import { skyGalleryImages } from '@common/sky-gallery-images';
import { NgClass } from '@angular/common';
import { macroGalleryImages } from '@common/macroGalleryImages';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
  imports: [Carousel, NgClass],
})
export class Gallery {
  skyGalleryImages = skyGalleryImages;
  macroGalleryImages = macroGalleryImages;

  showCards1 = signal(false);
  showCards2 = signal(false);

  protected openCards1() {
    this.showCards1.update((v) => !v);
  }

  protected openCards2() {
    this.showCards2.update((v) => !v);
  }
}
