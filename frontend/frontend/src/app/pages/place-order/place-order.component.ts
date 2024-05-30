import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  categories: Category[];

  constructor(private router: Router) {
    // Safely access the navigation state with type assertion
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as NavigationState;
    this.categories = state?.categories;

    if (!this.categories || this.categories.length === 0) {
      console.error('No categories data available');
      this.router.navigate(['/']); // Redirect back if no data
    }
  }

  ngOnInit(): void {
    // Handle empty categories scenario if needed
  }

  calculateTotalPrice(): number {
    return this.categories.reduce((total, category) => total + category.items.reduce((subTotal, item) => subTotal + (item.quantity * item.price), 0), 0);
  }

  placeOrder(): void {
    this.router.navigate(['/payment-method'], { state: { amount: this.calculateTotalPrice() } }); // Redirect to payment method selection with state
  }

  goBack(): void {
    this.router.navigate(['/request-collector']); // Navigate back
  }
}
