import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-statusbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup-statusbar.component.html',
  styleUrl: './signup-statusbar.component.scss'
})
export class SignupStatusbarComponent {
  @Input() currentActivePage: string = ''
}
