import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-setpassword',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './setpassword.component.html',
  styleUrl: './setpassword.component.scss'
})
export class SetpasswordComponent implements OnInit{
  constructor(
    private rootFormGroup: FormGroupDirective
  ){}

  ngOnInit(): void {
    this.userEmail = this.rootFormGroup.control.get('personalInfo.email')?.value;
    this.passworFormGroup = this.rootFormGroup.control.get('passwordFormGroup') as FormGroup;
    this.singupForm = this.rootFormGroup.control as FormGroup
  }

  userEmail!: string;
  passworFormGroup!: FormGroup;
  singupForm!: FormGroup

  // Event emitter to trigger form submit
  @Output() singupFormSubmit = new EventEmitter();

  // Method submit signup form
  onCreateAccountButtonClick(){
    if(this.singupForm.valid){
      this.singupFormSubmit.emit();
    }else{
      alert('Make sure all required data are filled up with valid value and try again!');
    }
  }
}
