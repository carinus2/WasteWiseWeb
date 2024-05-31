import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CollectorMapComponent } from '../collector-map/collector-map.component';

@Component({
  selector: 'app-cash-payment-confirmation',
  templateUrl: './cash-payment-confirmation.component.html',
  styleUrls: ['./cash-payment-confirmation.component.css']
})
export class CashPaymentConfirmationComponent implements OnInit, OnDestroy {
  @ViewChild(CollectorMapComponent) collectorMapComponent!: CollectorMapComponent;

  price: number = 0; // Initialize with a default value
  plateNumber: string;
  driverName: string;
  driverPhoneNumber: string;
  arrivalTime: number;
  remainingTime: number;
  timerInterval: any;
  timerStarted: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { amount: number };
    if (state && state.amount) {
      this.price = state.amount;
    } else {
      console.error('No amount provided in navigation state');
      // Handle missing amount (e.g., navigate back or show an error)
      this.router.navigate(['/place-order']);
    }
    this.plateNumber = this.generatePlateNumber();
    this.driverName = this.generateDriverName();
    this.driverPhoneNumber = this.generatePhoneNumber();
    this.arrivalTime = this.generateRandomTime();
    this.remainingTime = this.arrivalTime * 60; // convert minutes to seconds
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  generatePlateNumber(): string {
    const countyCodes = [
      'AB', 'AR', 'AG', 'BC', 'BH', 'BN', 'BR', 'BT', 'BV', 'BZ',
      'CS', 'CL', 'CJ', 'CT', 'CV', 'DB', 'DJ', 'GL', 'GR', 'GJ',
      'HR', 'HD', 'IL', 'IS', 'IF', 'MM', 'MH', 'MS', 'NT', 'OT',
      'PH', 'SM', 'SJ', 'SB', 'SV', 'TR', 'TM', 'TL', 'VS', 'VL',
      'VN', 'B'
    ];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let plate = '';

    plate += countyCodes[Math.floor(Math.random() * countyCodes.length)];
    plate += ' ';
    plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
    plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
    plate += ' ';
    plate += letters.charAt(Math.floor(Math.random() * letters.length));
    plate += letters.charAt(Math.floor(Math.random() * letters.length));
    plate += letters.charAt(Math.floor(Math.random() * letters.length));

    return plate;
  }

  generateDriverName(): string {
    const firstNames = ['Andrei', 'Maria', 'Ion', 'Elena', 'Cristian', 'Ioana', 'Mihai', 'Gabriela'];
    const lastNames = ['Popescu', 'Ionescu', 'Georgescu', 'Marinescu', 'Dumitrescu', 'Stan', 'Preda', 'Radu'];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${firstName} ${lastName}`;
  }

  generatePhoneNumber(): string {
    const numbers = '0123456789';
    let phoneNumber = '+40';

    for (let i = 0; i < 9; i++) {
      phoneNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return phoneNumber;
  }

  generateRandomTime(): number {
    return Math.floor(Math.random() * 11) + 5; // Random time between 5 and 15 minutes
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  confirmReadiness(): void {
    this.timerStarted = true;
    this.startTimer();
    this.collectorMapComponent.startCollectorMovement(this.remainingTime);
    alert('Thank you for confirming. Please have the exact amount ready.');
  }

  goBack(): void {
    this.router.navigate(['/payment-method']); // Navigate back to payment method selection
  }
}