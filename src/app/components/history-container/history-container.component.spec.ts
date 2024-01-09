import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryContainerComponent } from './history-container.component';

describe('HistoryContainerComponent', () => {
  let component: HistoryContainerComponent;
  let fixture: ComponentFixture<HistoryContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryContainerComponent]
    });
    fixture = TestBed.createComponent(HistoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
