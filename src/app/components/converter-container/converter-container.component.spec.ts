import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterContainerComponent } from './converter-container.component';

describe('ConverterContainerComponent', () => {
  let component: ConverterContainerComponent;
  let fixture: ComponentFixture<ConverterContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterContainerComponent]
    });
    fixture = TestBed.createComponent(ConverterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
