import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {

  intervalID: any;

  images: string[] = [
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
  ];

  imageIndex = 0;

  next(): void {
    this.imageIndex++;

    if (this.imageIndex == this.images.length) {
      this.imageIndex = 0;
    }
  }

  previous(): void {
    this.imageIndex--;

    if (this.imageIndex < 0) {
      this.imageIndex = this.images.length - 1;
    }
  }

  browse(index: number): void {
    this.imageIndex = index;
  }

  slideShow(): void {
    this.intervalID = setInterval(() => {
      this.next();
    }, 1000);
  }

  stopSlideShow(): void {
    clearInterval(this.intervalID);
  }
}