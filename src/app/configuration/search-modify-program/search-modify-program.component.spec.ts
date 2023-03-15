import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchModifyProgramComponent } from './search-modify-program.component';

describe('SearchModifyProgramComponent', () => {
  let component: SearchModifyProgramComponent;
  let fixture: ComponentFixture<SearchModifyProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchModifyProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchModifyProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
