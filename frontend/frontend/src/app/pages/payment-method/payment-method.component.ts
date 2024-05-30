// payment-method.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {

  constructor(private router: Router) { }

  selectPaymentMethod(method: string): void {
    console.log('Payment Method:', method);
    // Handle the selection and navigate to a confirmation page or payment processing
    this.router.navigate(['/confirmation']); // Adjust this route as necessary
  }

  goBack(): void {
    this.router.navigate(['/place-order']); // Redirect to the place-order page
  }
}
