import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfigService } from './services/ConfigService/config.service';
import { ImageCropperModule } from 'ngx-image-cropper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    ImageCropperModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    ConfigService
  ]
})
export class AppComponent {
  title = 'walkin-portal';
}
