import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/AuthService/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent, 
    FormsModule, 
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService]
})

export class LoginComponent {
  remembermeChecked: boolean = false;

  constructor(private authService: AuthService) { }

  changeRememberme() {
    this.remembermeChecked = !this.remembermeChecked;
  }

  login(loginForm: any): void {
    this.authService.performLogin(loginForm.value.email , loginForm.value.password);
  }
}
