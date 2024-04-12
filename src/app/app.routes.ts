import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Error404Component } from './error404/error404.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetForgotPasswordComponent } from './reset-forgot-password/reset-forgot-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { loginGuard } from './guards/login.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostJobsComponent } from './post-jobs/post-jobs.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'signup', component: SignupComponent, title:'Signup'},
    {path: 'receipt', component: ReceiptComponent, title: 'receipt', canActivate: [loginGuard]},
    {path: 'jobapplication', component: JobApplicationComponent, title: 'apply', canActivate: [loginGuard]},
    {path: 'resetpassword', component: ResetPasswordComponent, title: 'reset password', canActivate: [loginGuard]},
    {path: 'forgotpassword', component: ForgotPasswordComponent, title: 'forgot password'},
    {path: 'resetforgotpassword', component: ResetForgotPasswordComponent, title: 'reset forgot password'},
    {path: 'profile', component: UserProfileComponent, title: 'user profile', canActivate: [loginGuard]},
    {path: 'dashboard', component: DashboardComponent, title: 'dashboard'},
    {path: 'postjobs', component: PostJobsComponent, title: 'post jobs'},
    {path: '', component: JobListingComponent, title: 'jobs', pathMatch:'full'},
    {path: '**', title: 'error', component: Error404Component}
];
