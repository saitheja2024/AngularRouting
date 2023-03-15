import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMemberComponent } from './family-member.component';

describe('FamilyMemberComponent', () => {
  let component: FamilyMemberComponent;
  let fixture: ComponentFixture<FamilyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
