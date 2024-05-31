import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPaymentConfirmationComponent } from './cash-payment-confirmation.component';

describe('CashPaymentConfirmationComponent', () => {
  let component: CashPaymentConfirmationComponent;
  let fixture: ComponentFixture<CashPaymentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashPaymentConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashPaymentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
