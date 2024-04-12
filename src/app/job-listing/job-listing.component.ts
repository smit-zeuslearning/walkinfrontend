import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobpostService } from '../services/JobpostServices/jobpost.service';
import { GetJobPostDto } from '../../_interfaces/getjobpostdto.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.scss',
  providers: [JobpostService]
})
export class JobListingComponent implements OnInit {
  jobPostData!: any

  constructor(
    private jobpostService: JobpostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jobpostService.getJobPostData().subscribe(
      (data: GetJobPostDto) => {
        this.jobPostData = data;
        console.log('data is as below');
        console.log(data)
      },
      (error: HttpErrorResponse) => {
        if (error.status == 0) {
          console.log('Network error occured. Please check network connectivity and try again!');
        } else if (error.status == 400) {
          console.log('You might not have proper rights to access this page!');
        } else if (error.status == 500) {
          console.log('Unexpected internal server error occured. Please try again after sometime!');
        } else {
          console.log('Unexpected error occur. Please try later!');
        }
      }
    );
  }

  onClickjumpToDetailedDescriptionPage(event: any){
    console.log('job id: ' + event.target.id)
    this.router.navigate(['jobapplication'], {queryParams: {jobid: event.target.id}})
  }

}
