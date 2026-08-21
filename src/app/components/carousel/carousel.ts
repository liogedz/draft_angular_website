import {
  AfterViewInit,
  Component,
  computed,
  ContentChildren,
  DestroyRef,
  ElementRef,
  QueryList,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
  standalone: true,
})
export class Carousel implements AfterViewInit {
  @ContentChildren('slide', { read: ElementRef })
  slides!: QueryList<ElementRef>;

  slideCount = signal(0);
  currentIndex = signal(0);
  isDragging = signal(false);
  dragStartX = signal(0);
  dragOffset = signal(0);
  slideWidth = signal(300);

  translateX = computed(() => {
    return -this.currentIndex() * this.slideWidth() + this.dragOffset();
  });

  slideIndexes = computed(() => Array.from({ length: this.slideCount() }, (_, i) => i));

  constructor(private destroyRef: DestroyRef) {}

  ngAfterViewInit(): void {
    this.updateSlideWidth();
    this.slideCount.set(this.slides.length);
    const handler = () => this.updateSlideWidth();
    window.addEventListener('resize', handler);
    this.destroyRef.onDestroy(() => window.removeEventListener('resize', handler));
  }

  next() {
    if (this.currentIndex() < this.slides.length - 1) {
      this.currentIndex.update((i) => i + 1);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
    }
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }

  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging.set(true);
    this.dragStartX.set(this.getX(event));
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging()) return;
    event.preventDefault();
    const currentX = this.getX(event);
    const diff = currentX - this.dragStartX();
    this.dragOffset.set(diff);
  }

  endDrag() {
    if (!this.isDragging()) return;
    const threshold = this.slideWidth() / 6;
    if (this.dragOffset() < -threshold) this.next();
    else if (this.dragOffset() > threshold) this.prev();
    this.dragOffset.set(0);
    this.isDragging.set(false);
  }

  getX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent
      ? event.clientX
      : (event.touches[0]?.clientX ?? event.changedTouches[0].clientX);
  }

  updateSlideWidth() {
    const firstSlide = this.slides.first;
    if (firstSlide) {
      this.slideWidth.set(firstSlide.nativeElement.offsetWidth);
    }
  }
}
