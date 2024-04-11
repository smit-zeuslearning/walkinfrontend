import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStatusbarComponent } from './signup-statusbar.component';

describe('SignupStatusbarComponent', () => {
  let component: SignupStatusbarComponent;
  let fixture: ComponentFixture<SignupStatusbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupStatusbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupStatusbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
