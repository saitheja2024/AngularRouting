import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewConfigPledgeStructureComponent } from './review-config-pledge-structure.component';

describe('ReviewConfigPledgeStructureComponent', () => {
  let component: ReviewConfigPledgeStructureComponent;
  let fixture: ComponentFixture<ReviewConfigPledgeStructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewConfigPledgeStructureComponent]
    });
    fixture = TestBed.createComponent(ReviewConfigPledgeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
