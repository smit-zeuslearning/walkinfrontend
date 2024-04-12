import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobpostService } from '../services/JobpostServices/jobpost.service';
import { Router } from 'express';
import { ActivatedRoute, Route } from '@angular/router';
import { GetJobPostDto } from '../../_interfaces/getjobpostdto.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { JobApplicationRequestDto } from '../../_interfaces/jobapplyrequest.interface';
import { LoaderComponent } from '../loader/loader.component';
import { IsUserAppliedReq, IsUserAppliedRes } from '../../_interfaces/isuserapplied.interface';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [
    CommonModule,
    ScrollToTopComponent,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.scss'
})
export class JobApplicationComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private jobpostService: JobpostService,
    private route: ActivatedRoute,
    private storage: Storage
  ) {

    this.jobpostid = this.route.snapshot.queryParamMap.get('jobid');
    const dt: IsUserAppliedReq = {
      jobId: this.jobpostid
    }
    
    // Getting job post data
    this.jobpostService.getJobPostById(this.jobpostid).subscribe(
      (data: GetJobPostDto[]) => {
        this.jobpostData = data[0];
        console.log(this.jobpostData)
      },
      (error: HttpErrorResponse) => {
      }
    );

    // Check whether user is applied for this job or not
    this.jobpostService.isUserAppliedForJob(dt).subscribe(
      (data: IsUserAppliedRes) => {
        console.log('user is checked')
        this.isUserApplied = data.IsUserApplied;
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

  ngOnInit(): void {
    this.loading = true;
    this.jobApplicationForm = this.formBuilder.group({
      timeSlot: ['', [Validators.required]],
      updatedResume: [''],
      preferredJobRole: ['', Validators.required]
    });

    // this.jobpostid = this.route.snapshot.queryParamMap.get('jobid');
    // const dt: IsUserAppliedReq = {
    //   jobId: this.jobpostid
    // }

    // // Getting job post data
    // this.jobpostService.getJobPostById(this.jobpostid).subscribe(
    //   (data: GetJobPostDto[]) => {
    //     this.jobpostData = data[0];
    //     console.log(this.jobpostData)
    //   },
    //   (error: HttpErrorResponse) => {
    //   }
    // );

    // // Check whether user is applied for this job or not
    // this.jobpostService.isUserAppliedForJob(dt).subscribe(
    //   (data: IsUserAppliedRes) => {
    //     console.log('user is checked')
    //     this.isUserApplied = data.IsUserApplied;
    //   },
    //   (error: HttpErrorResponse) => {
    //   }
    // );

    this.loading = false
  }

  // Job post id (from parameters)
  jobpostid!: any;

  jobpostData !: GetJobPostDto

  // Job Application form
  jobApplicationForm!: FormGroup

  // Preferred job role group
  preferredRoleForm!: FormGroup

  // Check whether user is applied for this job or not
  isUserApplied: boolean = false

  // Method to format date
  formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  //  On form submit
  async submitJobApplicationForm() {
    this.loading = true;
    if (this.jobApplicationForm.valid) {
      var resumeUrl = null
      if (this.resumeFileName != null) {
        resumeUrl = await this.uploadFileToBucket()
      }
      const applyToJobDto: JobApplicationRequestDto = {
        JobPostId: this.jobpostid,
        SelectedTimeSlotId: this.jobApplicationForm.value['timeSlot'],
        PreferredJobRole: this.jobApplicationForm.value['preferredJobRole'],
        UpdatedResume: resumeUrl,
        UsersId: null
      }

      this.jobpostService.applyForJob(applyToJobDto).subscribe(
        (data: any) => {
          this.loading = false;
          alert('You are successfully applied for this job!');
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
          if (error.status == 0) {
            alert('Network error occured. Please check network connectivity and try again!');
          } else if (error.status == 400) {
            alert('Bad request! Please try again later!');
          } else if (error.status == 401) {
            alert('You don\'t have proper right to access this route!');
          } else if (error.status == 500) {
            alert('Unexpected internal server error occured. Please try again after sometime!');
          } else {
            alert('Unexpected error occur. Please try later!');
          }
          this.loading = false;
        }
      );
    }
  }

  // Method to upload file
  async uploadFileToBucket() {
    console.log('file being uploaded')
    const storageRef = ref(this.storage, `resume/${this.generateFileName(this.jobApplicationForm.value['updatedResume'])}`);
    const uploadTask = await uploadString(storageRef, this.jobApplicationForm.value['updatedResume'], 'data_url');
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    return downloadUrl;
  }

  // generate unique file name with extension 
  generateFileName(fileBase64: string): string {
    const uuid = this.generateGuid();
    const extension = fileBase64.split(';')[0].split('/')[1];
    return uuid + extension;
  }

  // Method to generate unique UUID
  generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Upload updated resume logic
  resumeFileName: string | null = null;
  onResumeSelect(event: any) {
    this.resumeFileName = event.target.files[0].name

    // Reading file as base64
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onloadend = () => {
      this.jobApplicationForm.controls['updatedResume'].setValue(reader.result);
    }
  }
}
