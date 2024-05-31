import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

interface Item {
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

interface Category {
  name: string;
  expanded?: boolean;
  items: Item[];
}

interface NavigationState {
  categories: Category[];
}

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  categories: Category[] = [];

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as NavigationState;
    if (state?.categories) {
      this.categories = state.categories;
    } else {
      const storedCategories = localStorage.getItem('categories');
      if (storedCategories) {
        this.categories = JSON.parse(storedCategories);
      } else {
        console.error('No categories data available');
        this.router.navigate(['/']); // Redirect back if no data
      }
    }
  }

  ngOnInit(): void {
    // Handle empty categories scenario if needed
  }

  calculateTotalPrice(): number {
    return this.categories.reduce((total: number, category) => {
      return total + category.items.reduce((subTotal: number, item) => subTotal + item.price * item.quantity, 0);
    }, 0);
  }


placeOrder(): void {
  const amount = parseFloat(localStorage.getItem('amount') || '0');

  const orderDto = {
    // Include other necessary order details here
    amount: amount
  };

  this.http.post('/api/orders', orderDto).subscribe(
    (response: any) => {
      console.log('Order placed successfully:', response);
      this.router.navigate(['/payment-method'], { state: { orderId: response.id } }); // Pass order ID to the next page
    },
    (error: HttpErrorResponse) => {
      console.error('Error placing order:', error);
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        console.error('Client-side error:', error.error.message);
      } else {
        // Backend error
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`
        );
      }
    }
  );
}

  goBack(): void {
    this.router.navigate(['/request-collector']); // Navigate back
  }
}
