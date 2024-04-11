import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-topbar',
  standalone: true,
  imports: [],
  templateUrl: './signup-topbar.component.html',
  styleUrl: './signup-topbar.component.scss'
})
export class SignupTopbarComponent {
  constructor(private router: Router) { }

  // Method to cancel form creation
  cencelSignup() {
    if (confirm('Are you sure want to discard sign up?')) {
      this.router.navigate(['']);
    }
  }
  // Get the active page name from parent component
  @Input() currentActivePage!: string

  // Event emitter to make back button working
  @Output() changeActivePage = new EventEmitter();

  // Event emitter to make CREATE button working
  @Output() submitForm = new EventEmitter();

  // Method to handle click on back button
  onBackClick() {
    if (this.currentActivePage === 'qualification') {
      this.changeActivePage.emit(0);
    } else if (this.currentActivePage === 'review') {
      this.changeActivePage.emit(1);
    }
  }

  // Handle create button click
  onCreateClick(){
    console.log('create button clicked')
    this.submitForm.emit();
  }
}
