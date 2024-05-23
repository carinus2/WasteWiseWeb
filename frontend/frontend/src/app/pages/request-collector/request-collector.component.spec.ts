import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCollectorComponent } from './request-collector.component';

describe('RequestCollectorComponent', () => {
  let component: RequestCollectorComponent;
  let fixture: ComponentFixture<RequestCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestCollectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
