import {
  AfterViewInit,
  Component,
  computed, DestroyRef,
  ElementRef,
  input,
  QueryList,
  signal,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-carousel-component',
  imports: [],
  templateUrl: './carousel-component.html',
  styleUrl: './carousel-component.css',
  standalone: true
})
export class CarouselComponent implements AfterViewInit {
  @ViewChildren('slide') slides!: QueryList<ElementRef>;

  items = input<string[]>([]);

  currentIndex = signal(0);
  isDragging = signal(false);
  dragStartX = signal(0);
  dragOffset = signal(0);
  slideWidth = signal(300);

  translateX = computed(() => {
    return -this.currentIndex() * this.slideWidth() + this.dragOffset();
  });

  constructor(private destroyRef: DestroyRef) {
  }

  ngAfterViewInit(): void {
    this.updateSlideWidth();
    const handler = () => this.updateSlideWidth();
    window.addEventListener('resize', handler);
    this.destroyRef.onDestroy(() => window.removeEventListener('resize', handler));
  }

  next() {
    if (this.currentIndex() < this.items().length - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
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
    const threshold = this.slideWidth() / 4;
    if (this.dragOffset() < -threshold) this.next();
    else if (this.dragOffset() > threshold) this.prev();
    this.dragOffset.set(0);
    this.isDragging.set(false);
  }

  getX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent
      ? event.clientX
      : event.touches[0]?.clientX ?? event.changedTouches[0].clientX;
  }

  updateSlideWidth() {
    const firstSlide = this.slides.first;
    if (firstSlide) {
      this.slideWidth.set(firstSlide.nativeElement.offsetWidth);
    }
  }
}
