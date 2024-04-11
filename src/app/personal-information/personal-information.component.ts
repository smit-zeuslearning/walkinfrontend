import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Storage, getDownloadURL, ref, uploadBytes, uploadString } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperModule, LoadedImage } from 'ngx-image-cropper';
@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ImageCropperModule
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})

export class PersonalInformationComponent implements OnInit {
  // Constructor
  constructor(
    private rootFormGroup: FormGroupDirective,
    private elementRef: ElementRef,
    private storage: Storage,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.signupForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup
  }

  // Form group value from the parent component
  @Input() formGroupName!: string

  // event emitter to trigger active page
  @Output() changeActivePage = new EventEmitter();

  // uploaded profile pic file name
  profilePicFileName: string = '';
  // Uploaded profile pic file as base 64 string
  profilePicAsBase64!: string;
  // Uploaded resume file name
  resumeFileName: string = '';
  // Uploaded resume file
  resumeFileAsBase64!: string;

  // Change event for image cropper
  imageChangedEvent: any = '';
  croppedImage: any = '';

  // Form group passed by the parent
  signupForm!: FormGroup;

  // File change event for image cropper
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if(event.objectUrl){
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event!.objectUrl);
    }
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  // Method to handle profile pic upload process
  onProfilePicSelected(event: any) {
    console.log('profile picture is selected!');
    if ((event.target.files[0].size / 10 ** 6) > 5) {
      this.imageChangedEvent = event;
      alert('Image size must be less than 5MB!');
      event.target.value = null;
    } else {
      this.profilePicFileName = event.target.files[0].name;

      // Reading file as base64
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = () => {
        this.profilePicAsBase64 = `${reader.result}`;
        this.signupForm.controls['profilepic'].setValue(reader.result);
      }
    }
  }

  // Method to handle resume upload process
  onResumeSelect(event: any) {
    this.resumeFileName = event.target.files[0].name;

    // Reading file as base64
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
      this.resumeFileAsBase64 = `${reader.result}`;
      this.signupForm.controls['resume'].setValue(reader.result);
    }
  }

  // Method to handle on next button click event
  onNextClick() {
    console.log('Next button pressed')
    console.log('is signup form valid: ' + this.signupForm.valid)
    const invalidInput = this.elementRef.nativeElement.querySelector('.ng-invalid');
    if (invalidInput) {
      alert('Please fillup all required field and/or enter valid values!');
      invalidInput.focus();
    } else {
      this.changeActivePage.emit(1);
    }
  }
}
