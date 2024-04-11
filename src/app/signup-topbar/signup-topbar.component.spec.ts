import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTopbarComponent } from './signup-topbar.component';

describe('SignupTopbarComponent', () => {
  let component: SignupTopbarComponent;
  let fixture: ComponentFixture<SignupTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupTopbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
