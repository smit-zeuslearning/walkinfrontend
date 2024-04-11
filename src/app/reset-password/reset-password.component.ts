import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ValidatorFn, ValidationErrors, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPasswordRequest } from '../../_interfaces/resetPasswordRequest.interface';
import { AuthService } from '../services/AuthService/auth.service';
import { PasswordResetService } from '../services/PasswordResetService/password-reset.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]],
    },
      {
        validator: this.ConfirmValidator('newPassword', 'confirmNewPassword')
      });

      this.showSuccessMessage = false
  }

  // Rest password form
  resetPasswordForm!: FormGroup;

  // Whether to show success message or not
  showSuccessMessage!: boolean

  // Reset password form submit
  onResetPasswordFormSubmit() {
    if (this.resetPasswordForm.valid) {
      // Generate typeface from the form data for reset password request
      const resetPasswordDto: ResetPasswordRequest = {
        oldPassword: this.resetPasswordForm.value['oldPassword'],
        newPassword: this.resetPasswordForm.value['newPassword'],
        confirmNewPassword: this.resetPasswordForm.value['confirmNewPassword']
      };

      // Making request to reset password
      this.passwordResetService.resetPassword(resetPasswordDto).subscribe(
        (data: any) => {
          this.showSuccessMessage = true;
          setTimeout(()=>{
            this.router.navigate(['profile']);
          }, 4000);
        },
        (error: HttpErrorResponse) => {
          if (error.status == 0) {
            alert('Network error occured. Please check network connectivity and try again!');
          } else if (error.status == 400) {
            alert('Bad request! Please try again later with valid values!');
          } else if (error.status == 500) {
            alert('Unexpected internal server error occured. Please try again after sometime!');
          } else {
            alert('Unexpected error occur. Please try later!');
          }
        }
      );
    } else {
      alert('Please enter valid values!');
    }
  }

  // Validators for check whether password and confirm password is same or not
  ConfirmValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]
      const matchingcontrol = formGroup.controls[matchingControlName]

      if (matchingcontrol.errors && !matchingcontrol.errors['confirmedValidator']) {
        return;
      }

      if (control.value !== matchingcontrol.value) {
        matchingcontrol.setErrors({ confirmedValidator: true });
      }
      else {
        matchingcontrol.setErrors(null);
      }
    }
  }

}
