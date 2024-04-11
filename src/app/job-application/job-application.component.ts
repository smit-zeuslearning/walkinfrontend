import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [
    CommonModule,
    ScrollToTopComponent,
    ReactiveFormsModule
  ],
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.scss'
})
export class JobApplicationComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.jobApplicationForm = this.formBuilder.group({
      timeSlot: ['', [Validators.required]],
      updatedResume: [''],
      instructionalDesigner: [''],
      softwareEngineer: [''],
      softwareQualityEngineer: [''],
    });
  }

  // Job roles
  jobRoles = ['instructionalDesigner', 'softwareEngineer', 'softwareQualityEngineer']

  // Job Application form
  jobApplicationForm!: FormGroup

  // Preferred job role group
  preferredRoleForm!: FormGroup

   // Check whether atleast one role is selected
   checkRoleSelected(): boolean{
    var flag = false
     this.jobRoles.forEach(jobRole => {
       if(this.jobApplicationForm.value[jobRole] === true){
        flag = true;
       }
      });
      if(flag){
        return true;
      }
      return false
   }

  //  On form submit
  submitJobApplicationForm(){
    if(this.jobApplicationForm.valid){
      if(this.checkRoleSelected()){
        // ### Write form submission Logic ###
      }else{
        alert('Please select atleast one job role!');
      }
    }
  }

  // Whether to show or hide INSTRUCTIONAL DESIGNER
  showInstructionalDesigner = true;
  toggleInstructionalDesigner() {
    this.showInstructionalDesigner = !this.showInstructionalDesigner;
  }

  // Whether to show or hide INSTRUCTIONAL DESIGNER
  showSoftwareEngineer = true;
  toggleSoftwareEngineer() {
    this.showSoftwareEngineer = !this.showSoftwareEngineer;
  }

  // Whether to show or hide INSTRUCTIONAL DESIGNER
  showSoftwareQualityEngineer = true;
  toggleSoftwareQualityEngineer() {
    this.showSoftwareQualityEngineer = !this.showSoftwareQualityEngineer;
  }

  // Whether to show or hide INSTRUCTIONAL DESIGNER
  showApplication = true;
  toggleApplication() {
    this.showApplication = !this.showApplication;
  }

  // Upload updated resume logic
  resumeFileName!: string
  onResumeSelect(event: any) {
    this.resumeFileName = event.target.files[0].name
  }
}
