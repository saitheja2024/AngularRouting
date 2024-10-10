import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Erros404Component } from './erros404.component';

describe('Erros404Component', () => {
  let component: Erros404Component;
  let fixture: ComponentFixture<Erros404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Erros404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Erros404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
