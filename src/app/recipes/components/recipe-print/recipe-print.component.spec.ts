import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePrintComponent } from './recipe-print.component';

describe('RecipePrintComponent', () => {
  let component: RecipePrintComponent;
  let fixture: ComponentFixture<RecipePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
