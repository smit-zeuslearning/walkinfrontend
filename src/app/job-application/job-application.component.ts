import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [
    CommonModule,
    ScrollToTopComponent
  ],
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.scss'
})
export class JobApplicationComponent {

  // Whether to show or hide INSTRUCTIONAL DESIGNER
  showInstructionalDesigner = true;
  toggleInstructionalDesigner(){
    this.showInstructionalDesigner = !this.showInstructionalDesigner;
  }

  // Whether to show or hide INSTRUCTIONAL DESIGNER
  showSoftwareEngineer = true;
  toggleSoftwareEngineer(){
    this.showSoftwareEngineer = !this.showSoftwareEngineer;
  }

  // Whether to show or hide INSTRUCTIONAL DESIGNER
  showSoftwareQualityEngineer = true;
  toggleSoftwareQualityEngineer(){
    this.showSoftwareQualityEngineer = !this.showSoftwareQualityEngineer;
  }
}
