import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobroleDescriptionComponent } from './jobrole-description.component';

describe('JobroleDescriptionComponent', () => {
  let component: JobroleDescriptionComponent;
  let fixture: ComponentFixture<JobroleDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobroleDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobroleDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
