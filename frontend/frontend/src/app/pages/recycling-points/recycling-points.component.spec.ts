import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingPointsComponent } from './recycling-points.component';

describe('RecyclingPointsComponent', () => {
  let component: RecyclingPointsComponent;
  let fixture: ComponentFixture<RecyclingPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecyclingPointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecyclingPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
