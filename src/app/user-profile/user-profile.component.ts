import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  providers: [AuthService]
})
export class UserProfileComponent {
  constructor(
    private authService: AuthService
  ){}

  onClick(){
    console.log('calling Get Jwt from Auth Service');
    this.authService.logout();
  }
}
