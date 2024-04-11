import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PasswordResetService } from '../services/PasswordResetService/password-reset.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  providers: [PasswordResetService]
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordResetService: PasswordResetService
  ){}

  ngOnInit(){
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // hiding success message
    this.showSuccessMessage = false;
  }

  // Forgot password form
  forgotPasswordForm!: FormGroup

  // variable to decide whether display page or success message
  showSuccessMessage!: boolean;

  // Submit forgot passwor request
  onForgotPasswordFormSubmit(){
    if(this.forgotPasswordForm.valid){
      this.passwordResetService.forgotPassword(this.forgotPasswordForm.value['email']).subscribe(
        () => {
          this.showSuccessMessage = true;
        },
        (error: HttpErrorResponse) => {
          if (error.status == 0) {
            alert('Network error occured. Please check network connectivity and try again!');
          }else if (error.status == 500) {
            alert('Unexpected internal server error occured. Please try again after sometime!');
          } else {
            alert('Unexpected error occur. Please try later!');
          }
        }
      );
    }else{
      alert('Please enter valid values!');
    }
  }

  // On success message coninue button click
  onContinueClick(){
    this.router.navigate(['']);
  }
}
