import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.scss'
})
export class JobListingComponent {
  jobDetails = [
    {
      title: 'Walk In for Designer Job Role',
      datetime: '03-Jul-2021 to 04-Jul-2021',
      location: 'Mumbai',
      Instructional_Designer: true,
      software_engineer: false,
      software_quality_engineer: false,
      expires: true
    },
    {
      title: 'Walk In for Designer Job Role',
      datetime: '03-Jul-2021 to 04-Jul-2021',
      location: 'Mumbai',
      Instructional_Designer: true,
      software_engineer: true,
      software_quality_engineer: true,
      special_opportunity: 'Internship Opportunity for MCA Students'
    },
    {
      title: 'Walk In for Designer Job Role',
      datetime: '03-Jul-2021 to 04-Jul-2021',
      location: 'Mumbai',
      Instructional_Designer: true,
      software_engineer: true,
      software_quality_engineer: false,
    }
  ]
}
