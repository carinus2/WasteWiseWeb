import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {
  totalAmount: number;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { amount: number };
    this.totalAmount = state.amount;
  }

  selectPaymentMethod(method: string): void {
    console.log('Payment Method:', method);
    if (method === 'cash') {
      this.router.navigate(['/cash-confirmation'], { state: { amount: this.totalAmount } });
    } else if (method === 'card') {
      this.router.navigate(['/confirmation'], { state: { amount: this.totalAmount } }); // Adjust this route as necessary
    }
  }

  goBack(): void {
    this.router.navigate(['/place-order']); // Redirect to the place-order page
  }
}