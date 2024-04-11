import { CommonModule } from '@angular/common';
import { Component, EventEmitter, ElementRef, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective, FormGroupName, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-qualification',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './qualification.component.html',
  styleUrl: './qualification.component.scss'
})
export class QualificationComponent implements OnInit {
  // Constructor
  constructor(
    private rootFormGroup: FormGroupDirective,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.signupForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.setZeusApplicationValidation();
    this.setOnNoticePerodValidation();
    this.setExpertisedTechnoloyOtherTextFieldValidation();
    this.setFamilierTeconologyOtherTextFieldValidation();
    this.setApplicationTypeValidations();
  }

  // Get the form group value from parent
  @Input() formGroupName!: string

  // event emitter to trigger active page
  @Output() changeActivePage = new EventEmitter();

  // Form group passed by the parent
  signupForm!: FormGroup;

  // Whether make applied zeus test text box make visible or not
  zeusAppliedTextVisible: boolean = true;

  // Whether make notice period end date visible or not
  noticePeriodEndDateVisible: boolean = true;

  // Whether make other text field of expertised technology visible or not
  expertistedOtherTextVisible: Boolean = false;

  // Whether make other text field of familier technology visible or not
  familierOtherTextVisible: Boolean = false

  // Hold application type
  appicationType = 'fresher'
  // Validation for EXPERIENCED or FRESHER
  setApplicationTypeValidations() {
    const yearofexperienceValidators = [Validators.required, Validators.pattern('[0-9]*')];
    const currentctcValidators = [Validators.required, Validators.pattern('[0-9]*')];
    const expectedctcValidators = [Validators.required, Validators.pattern('[0-9]*')];
    // const expertisedothertextValidators = [Validators.required];
    const noticelenghtValidators = [Validators.required, Validators.pattern('[0-9]*')];

    const yearofexperience = this.signupForm.get('yearofexperience');
    const currentctc = this.signupForm.get('currentctc');
    const expectedctc = this.signupForm.get('expectedctc');
    const expertisedothertext = this.signupForm.get('expertisedothertext');
    const noticelenght = this.signupForm.get('noticelenght');

    this.signupForm.get('applicationtype')?.valueChanges.subscribe(applicationType => {
      if (applicationType === 'fresher') {
        this.appicationType = 'fresher';
        yearofexperience?.setValidators(null);
        currentctc?.setValidators(null);
        expectedctc?.setValidators(null);
        // expertisedothertext?.setValidators(null)
        noticelenght?.setValidators(null);

      } else if (applicationType === 'experienced') {
        this.appicationType = 'experienced';
        yearofexperience?.setValidators(yearofexperienceValidators);
        currentctc?.setValidators(currentctcValidators);
        expectedctc?.setValidators(expectedctcValidators);
        // expertisedothertext?.setValidators(expertisedothertextValidators)
        noticelenght?.setValidators(noticelenghtValidators);
      }

      yearofexperience?.updateValueAndValidity();
      currentctc?.updateValueAndValidity();
      expectedctc?.updateValueAndValidity();
      noticelenght?.updateValueAndValidity();
    });
  }

  // Validator for whether applied in the zeus for past 12 months or not
  setZeusApplicationValidation() {
    const positionForAppliedValidatior = this.signupForm.get('whichpositionappeared');
    const whichpositionAppliedValidators = [Validators.pattern('[a-zA-Z0-9]')]

    this.signupForm.get('appliedinzeus')?.valueChanges.subscribe(appliedToZeus => {
      if (appliedToZeus === 'true') {
        positionForAppliedValidatior?.setValidators(whichpositionAppliedValidators.concat([Validators.required]));
        this.zeusAppliedTextVisible = true;
      } else if (appliedToZeus === 'false') {
        positionForAppliedValidatior?.setValidators(whichpositionAppliedValidators);
        this.zeusAppliedTextVisible = false;
      }

      positionForAppliedValidatior?.updateValueAndValidity();
    });
  }

  // Validation for whether user is on notice period or not
  setOnNoticePerodValidation() {
    const noticeperiodEndDate = this.signupForm.get('noticeenddate');
    const applicationType = this.signupForm.get('applicationtype')
    
    this.signupForm.get('noticeperiod')?.valueChanges.subscribe(onNoticePeriod => {
      console.log('application type' + applicationType)
      if (onNoticePeriod === 'true') {
        this.noticePeriodEndDateVisible = true;
        if(applicationType?.value == 'experienced'){
          noticeperiodEndDate?.setValidators(Validators.required);
        }
      } else if (onNoticePeriod === 'false') {
        this.noticePeriodEndDateVisible = false;
        noticeperiodEndDate?.setValidators(null);
      }

      noticeperiodEndDate?.updateValueAndValidity();
    });
  }
  // Validation for expertised technology other text field
  setExpertisedTechnoloyOtherTextFieldValidation() {
    const familierOtherTextField = this.signupForm.get('familierothertext');

    this.signupForm.get('familierother')?.valueChanges.subscribe(value => {
      if (value) {
        this.familierOtherTextVisible = true;
        familierOtherTextField?.setValidators([Validators.required, Validators.pattern('[a-zA-Z0-9]*')]);
      } else {
        this.familierOtherTextVisible = false;
        familierOtherTextField?.setValidators([]);
      }
      familierOtherTextField?.updateValueAndValidity();
    });
  }
  // Validation for familier technology other text field
  setFamilierTeconologyOtherTextFieldValidation() {
    const expertisedOtherTextField = this.signupForm.get('expertisedothertext');

    this.signupForm.get('expertisedother')?.valueChanges.subscribe(value => {
      if (value) {
        this.expertistedOtherTextVisible = true;
        expertisedOtherTextField?.setValidators([Validators.required, Validators.pattern('[a-zA-Z0-9]*')]);
      } else {
        this.expertistedOtherTextVisible = false;
        console.log('expertised technology other text field value set to false')
        expertisedOtherTextField?.setValidators([]);
      }
      expertisedOtherTextField?.updateValueAndValidity();
    });
  }

  // Method to handle on next button click event
  onNextClick() {
    const invalidInput = this.elementRef.nativeElement.querySelector('.ng-invalid');
    if (invalidInput) {
      alert('Please fillup all required field and/or enter valid values!');
      invalidInput.focus();
    } else {
      this.changeActivePage.emit(2);
    }
  }

  // Method to handle on previous button click event
  onPreviousClick() {
    this.changeActivePage.emit(0);
  }
}
