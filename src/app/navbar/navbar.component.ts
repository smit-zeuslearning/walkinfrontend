import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showComponent: boolean = true;

  constructor(private router: Router){
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        if(val.url.includes('login') || val.url.includes('/signup')){
          this.showComponent = false;
        }else{
          this.showComponent = true;
        }
      }
    });
  }
}
