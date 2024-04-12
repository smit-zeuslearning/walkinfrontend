import { Injectable } from '@angular/core';
import { ConfigService } from '../ConfigService/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetJobPostDto } from '../../../_interfaces/getjobpostdto.interface';
import { JobApplicationRequestDto } from '../../../_interfaces/jobapplyrequest.interface';
import { IsUserAppliedReq, IsUserAppliedRes } from '../../../_interfaces/isuserapplied.interface';

@Injectable({
  providedIn: 'root'
})
export class JobpostService {
  config: any = undefined;

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router
  ) {
    this.configService.getConfig().subscribe((data: any) => {
      this.config = { ...data }
    })
  }

  // Method to get the job post data
  getJobPostData(){
    return this.http.post<GetJobPostDto>(`https://localhost:8000/api/getjobpost`, {})
  }

  // Method to get the particular job post data
  getJobPostById(jobid:string){
    return this.http.post<GetJobPostDto[]>(`https://localhost:8000/api/getjobpostbyid`, {
      jobId:jobid
    })
  }

  // Service to apply for the job
  applyForJob(applicationData: JobApplicationRequestDto){
    return this.http.post<any>(`https://localhost:8000/api/applyforjob`, applicationData)
  }

  // Service to check whether is user already applied to the job
  isUserAppliedForJob(data: IsUserAppliedReq){
    return this.http.post<IsUserAppliedRes>(`https://localhost:8000/api/isuserappliedJob`, data)
  }

}
