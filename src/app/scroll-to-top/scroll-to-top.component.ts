import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {
  // Whether make componen visible
  makeVisible: boolean = false;

  @HostListener('window:scroll', [])
  onScrollMakeElementVisible(){
    if (window.scrollY > 100) {
      this.makeVisible = true;
    } else {
      this.makeVisible = false;
    }
  }

  // Onclick scroll to the top
  scrollToTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
}
