import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {
  orderId: number;

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { orderId: number };
    this.orderId = state?.orderId;

    if (!this.orderId) {
      console.error('No order ID available');
      this.router.navigate(['/']); // Redirect back if no data
    }
  }

  selectPaymentMethod(method: string): void {
    const paymentDto = {
      orderId: this.orderId,
      paymentType: method,
      amount: parseFloat(localStorage.getItem('amount') || '0')
    };

    this.http.post('/api/payments', paymentDto).subscribe(
      (response: any) => {
        console.log('Payment recorded successfully:', response);
        this.router.navigate(['/confirmation']); // Adjust this route as necessary
      },
      (error) => {
        console.error('Error recording payment:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/place-order']); // Redirect to the place-order page
  }
}
