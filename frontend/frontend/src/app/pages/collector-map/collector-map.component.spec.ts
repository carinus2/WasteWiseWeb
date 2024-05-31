import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorMapComponent } from './collector-map.component';

describe('CollectorMapComponent', () => {
  let component: CollectorMapComponent;
  let fixture: ComponentFixture<CollectorMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectorMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
