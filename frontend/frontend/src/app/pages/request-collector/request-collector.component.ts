import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

interface Item {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

interface Category {
  name: string;
  expanded: boolean;
  items: Item[];
}

@Component({
  selector: 'app-request-collector',
  templateUrl: './request-collector.component.html',
  styleUrls: ['./request-collector.component.css']
})
export class RequestCollectorComponent {
  userLocation: string = '';
  geolocationAvailable: boolean = navigator.geolocation ? true : false;
  categories: Category[] = [
    {
      name: 'Paper',
      expanded: false,
      items: [
        { name: 'Mixed Paper', price: 0.5, quantity: 0, description: 'Includes newspapers, magazines, office paper, and junk mail.' },
        { name: 'Cardboard', price: 0.7, quantity: 0, description: 'Corrugated cardboard boxes, not contaminated by food.' },
        { name: 'Newspapers', price: 0.5, quantity: 0, description: 'Only newspapers without inserts or other materials.' },
        { name: 'Magazines', price: 0.5, quantity: 0, description: 'Glossy magazines and catalogs.' }
      ]
    },
    {
      name: 'Carton',
      expanded: false,
      items: [
        { name: 'Cereal Boxes', price: 0.5, quantity: 0, description: 'Clean, dry, and flattened cereal boxes.' },
        { name: 'Shoe Boxes', price: 0.6, quantity: 0, description: 'Shoe boxes without any plastic or metal parts.' },
        { name: 'Toilet/Kitchen Paper Rolls', price: 0.1, quantity: 0, description: 'Empty toilet paper and paper towel rolls.' },
        { name: 'Packaging Cartons', price: 0.3, quantity: 0, description: 'Cartons used for packaging that are clean and dry.' }
      ]
    },
    {
      name: 'Plastic',
      expanded: false,
      items: [
        { name: 'Plastic Bottles (PET)', price: 1.50, quantity: 0, description: 'Commonly used for beverages like water and soda.' },
        { name: 'Plastic Containers (HDPE)', price: 0.30, quantity: 0, description: 'Includes milk jugs, detergent bottles, and some food containers.' },
        { name: 'Plastic Bags', price: 0.05, quantity: 0, description: 'Supermarket shopping bags and other thin plastic bags.' },
        { name: 'Plastic Wrappings', price: 0.15, quantity: 0, description: 'Plastic film and wrapping materials.' }
      ]
    },
    {
      name: 'Metal',
      expanded: false,
      items: [
        { name: 'Aluminum Cans', price: 1.30, quantity: 0, description: 'Beverage cans, primarily soda and beer.' },
        { name: 'Steel Cans', price: 1.30, quantity: 0, description: 'Includes cans for soup, vegetables, and other food products.' },
        { name: 'Metal Lids', price: 1.20, quantity: 0, description: 'Lids from jars and bottles made of metal.' },
        { name: 'Scrap Metal', price: 1.00, quantity: 0, description: 'Various scrap metal pieces and items.' }
      ]
    },
    {
      name: 'Glass',
      expanded: false,
      items: [
        { name: 'Glass Bottles', price: 1.0, quantity: 0, description: 'All colors, typically used for beverages and food.' },
        { name: 'Glass Jars', price: 1.5, quantity: 0, description: 'Jars for food and condiments.' },
        { name: 'Broken Glass', price: 0.25, quantity: 0, description: 'Must be safely packaged to prevent handling injuries.' }
      ]
    },
    {
      name: 'Electronics',
      expanded: false,
      items: [
        { name: 'Small Electronics', price: 5.00, quantity: 0, description: 'Includes cell phones, handheld electronics.' },
        { name: 'Computer Parts', price: 4.00, quantity: 0, description: 'Components like RAM, hard drives, and motherboards.' },
        { name: 'Batteries', price: 2.50, quantity: 0, description: 'Household batteries.' },
        { name: 'Printers and Scanners', price: 7.00, quantity: 0, description: 'Office electronics.' }
      ]
    }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  calculateTotalPrice(): number {
    return this.categories.reduce((total: number, category) => {
      return total + category.items.reduce((subTotal: number, item) => subTotal + item.price * item.quantity, 0);
    }, 0);
  }

  submitRequest(): void {
    // Navigate to the place-order page with the current selected items
    this.router.navigate(['/place-order'], { state: { categories: this.categories } });
  }

}
