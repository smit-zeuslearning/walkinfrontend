import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../services/PasswordResetService/password-reset.service';
import { ResetForgotPasswordRequest } from '../../_interfaces/resetForgotPasswordRequest.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ResetForgotPasswordResponse } from '../../_interfaces/resetForgotPasswordResponse.interface';

@Component({
  selector: 'app-reset-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './reset-forgot-password.component.html',
  styleUrl: './reset-forgot-password.component.scss',
  providers: [PasswordResetService]
})
export class ResetForgotPasswordComponent {
  constructor(
    private formBuilder: FormBuilder,
    private actiatedRoute: ActivatedRoute,
    private passwordResetService: PasswordResetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetForgotPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]],
    },
      {
        validator: this.ConfirmValidator('newPassword', 'confirmNewPassword')
      }
    );

    // Getting password reset token from the url
    this.resetPasswordToken = this.actiatedRoute.snapshot.queryParams['token'];
    console.log(this.resetPasswordToken);

    // Make success message component hidden
    this.showSuccessMessage = false;
  }

  // Rest password form
  resetForgotPasswordForm!: FormGroup;

  // Reset password token
  resetPasswordToken!: any;

  // Show success message or not
  showSuccessMessage!: boolean;
  

  // Submit form
  onForgotPasswordResetFormSubmit(){
    const reqData: ResetForgotPasswordRequest = {
      Token: this.resetPasswordToken,
      Password: this.resetForgotPasswordForm.value['newPassword'],
      ConfirmPassword: this.resetForgotPasswordForm.value['confirmNewPassword']
    }

    this.passwordResetService.resetForgotPassword(reqData).subscribe(
      (data: ResetForgotPasswordResponse)=>{
        this.showSuccessMessage = true;
      },
      (error:HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }

  // On success message continue button click
  onContinueClick(){
    this.router.navigate(['login']);
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
