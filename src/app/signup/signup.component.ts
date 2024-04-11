import { Component, OnInit } from '@angular/core';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { QualificationComponent } from '../qualification/qualification.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupStatusbarComponent } from '../signup-statusbar/signup-statusbar.component';
import { SignupTopbarComponent } from '../signup-topbar/signup-topbar.component';
import { SetpasswordComponent } from '../setpassword/setpassword.component';
import { AuthService } from '../services/AuthService/auth.service';
import { UserRegistration } from '../../_interfaces/userregistration.interface';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    PersonalInformationComponent,
    QualificationComponent,
    SetpasswordComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SignupTopbarComponent,
    SignupStatusbarComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [AuthService]
})

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  static readonly signupSubPageNames: string[] = [
    'personalInfo',
    'qualification',
    'review'
  ]

  currentActivePage: string = SignupComponent.signupSubPageNames[0];
  enableCreateButton: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      personalInfo: this.formbuilder.group({
        firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z\' \']*')]],
        lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z\' \']*')]],
        email: ['', [Validators.required, Validators.email]],
        countrycode: ['', [Validators.required, Validators.pattern('[0-9]{3}|[0-9]{2}')]],
        phonenumber: ['', [Validators.required, Validators.pattern('[0-9]{11}|[0-9]{10}')]],
        resume: ['', [Validators.required]],
        portfolio: ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        refrral: ['', [Validators.pattern('[0-9a-zA-Z\' \']*')]],
        getupdates: [''],
        profilepic: ['', [Validators.required]],

        //  Preferred job role check box
        instructionalDesigner: [''],
        softwareEngineer: [''],
        softwareQualityEngineer: ['']

      }),

      qualificationInfo: this.formbuilder.group({
        // User qualification section
        percentage: ['', [Validators.required, Validators.max(100)]],
        passingyear: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        qualification: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9\' \']*')]],
        stream: ['', [Validators.required, Validators.pattern('[a-zA-Z\' \']*')]],
        college: ['', [Validators.required, Validators.pattern('[a-zA-Z\' \']*')]],
        collegeLocation: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9\' \']*')]],

        // ***Professional qualifiacation***
        applicationtype: [''], // Radio button(fresher, experienced)
        yearofexperience: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        currentctc: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        expectedctc: ['', [Validators.required, Validators.pattern('[0-9]*')]],

        // Expertised technology checkboxes
        expertisedjavascript: [],
        expertisedangular: [],
        expertisedreact: [],
        expertisednode: [],
        expertisedother: [],
        // Expertised technology other technology textbox
        expertisedothertext: [],

        // Familier technology checkboxes
        familierjavascript: [],
        familierangular: [],
        familierreact: [],
        familiernode: [],
        familierother: [],
        // Familier technology other technology textbox
        familierothertext: [],

        // Noticeperiod information
        noticeperiod: ['true'], // Radio button(yes, no)
        noticeenddate: [], // Date
        noticelenght: [],

        // Applied for the zeus test before
        appliedinzeus: ['true'], // Radio button(yes, no)
        whichpositionappeared: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
      }),

      passwordFormGroup: this.formbuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
    });
  }

  // method to change active page
  changeActivePage(pageActivate: number): void {
    this.currentActivePage = SignupComponent.signupSubPageNames[pageActivate];
    window.scroll({top:0,left:0, behavior:'smooth'})
  }

  // Methdo to call the changeActivePage method via child component using event emitter
  callChangeActivePage(activePageNo: number) {
    this.changeActivePage(activePageNo)
  }

  // Method to handle form submit
  async onSignupFormSubmit() {
    const formDetailAPIForm: UserRegistration = {
      "UserName": this.signupForm.value['personalInfo']['firstname'],
      "PasswordHash": this.signupForm.value['passwordFormGroup']['password'],
      "Firstname": this.signupForm.value['personalInfo']['firstname'],
      "Lastname": this.signupForm.value['personalInfo']['lastname'],
      "Email": this.signupForm.value['personalInfo']['email'],
      "Resume": await this.uploadFileToBucket(this.signupForm.value['personalInfo']['resume'], 'resume'),
      "DisplayPicture": await this.uploadFileToBucket(this.signupForm.value['personalInfo']['profilepic'], 'image'),
      "PortfolioUrl": this.signupForm.value['personalInfo']['portfolio'],
      "GetJobUpdate": this.refineCheckboxValue(this.signupForm.value['personalInfo']['getupdates']),
      "ContactNumbers": [
        {
          "CountryCode": this.signupForm.value['personalInfo']['countrycode'],
          "PhoneNumber": this.signupForm.value['personalInfo']['phonenumber']
        }
      ],
      "Educations": [
        {
          "AggregatePercentage": this.signupForm.value['qualificationInfo']['percentage'],
          "PassingYear": this.signupForm.value['qualificationInfo']['passingyear'],
          "Qualification": this.signupForm.value['qualificationInfo']['qualification'],
          "EducationStream": this.signupForm.value['qualificationInfo']['stream'],
          "CollegeName": this.signupForm.value['qualificationInfo']['college'],
          "CollegeLocation": this.signupForm.value['qualificationInfo']['collegeLocation']
        }
      ],
      "PreferredJobRoles": [
        {
          "InstructionalDesigner": this.refineCheckboxValue(this.signupForm.value['personalInfo']['instructionalDesigner']),
          "SoftwareEnginner": this.refineCheckboxValue(this.signupForm.value['personalInfo']['softwareEngineer']),
          "SoftwareQualityEngineer": this.refineCheckboxValue(this.signupForm.value['personalInfo']['softwareQualityEngineer'])
        }
      ],
      "ProfessionalQualifications": [
        {
          "ApplicationType": this.signupForm.value['qualificationInfo']['applicationtype'],
          "TotalExperience": this.signupForm.value['qualificationInfo']['yearofexperience'],
          "OnOnticePeriod": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['noticeperiod']),
          "LastWorkingDate": this.signupForm.value['qualificationInfo']['noticeenddate'], // yyyy-mm-dd
          "TerminationNoticeMonths": this.signupForm.value['qualificationInfo']['noticelenght'],
          "ZeusTestLast12months": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['appliedinzeus']),
          "AppledRoldLast12months": this.signupForm.value['qualificationInfo']['whichpositionappeared'],
          "ExpertisedTechnologies": [
            {
              "Javascript": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['expertisedjavascript']),
              "Angularjs": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['expertisedangular']),
              "Reactjs": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['expertisedreact']),
              "Nodejs": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['expertisednode']),
              "Other": this.signupForm.value['qualificationInfo']['expertisedothertext']
            }
          ],
          "FamalierTechnologies": [
            {
              "Javascript": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['familierjavascript']),
              "Angularjs": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['familierangular']),
              "Reactjs": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['familierreact']),
              "Nodejs": this.refineCheckboxValue(this.signupForm.value['qualificationInfo']['familiernode']),
              "Other": this.signupForm.value['qualificationInfo']['familierothertext']
            }
          ]
        }
      ]
    }
    console.log(formDetailAPIForm)

    // Sumitting user data to the server
    this.authService.performSignup(formDetailAPIForm);
  }

  // Method to upload profile pic and resume to firebase bucket
  async uploadFileToBucket(fileString: string, type: string){
    console.log('file being uploaded')
    const storageRef = ref(this.storage, `${type}/${this.generateFileName(fileString)}`);
    const uploadTask = await uploadString(storageRef, fileString, 'data_url');
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    return downloadUrl
  }

  // generate unique file name with extension 
  generateFileName(fileBase64: string): string{
    const uuid = this.generateGuid();
    const extension = fileBase64.split(';')[0].split('/')[1];
    return uuid+extension;
  }

  // Method to generate unique UUID
  generateGuid() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Method to refine checkbox value
  refineCheckboxValue(val: any): boolean{
    if(val){
      return true
    }else{
      return false;
    }
  }
  
}
