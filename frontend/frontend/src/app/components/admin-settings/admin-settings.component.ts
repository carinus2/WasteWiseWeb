import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabService } from '../../services/CabService';
import { OrderService } from '../../services/OrderService';
import { CabDto } from '../../models/CabDto';
import { CollectorDto } from '../../models/CollectorDto';
import { OrderDto } from '../../models/OrderDto';
import { StatusType, getStatusDisplayName } from '../../enums/StatusType';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  settingsItems!: MenuItem[];
  activeItem!: MenuItem;
  activeTab: string = '';
  cabs: CabDto[] = [];
  collectors: CollectorDto[] = [];
  orders: OrderDto[] = [];
  displayEditModal: boolean = false;
  displayEditOrderModal: boolean = false;
  editCabForm!: FormGroup;
  editOrderForm!: FormGroup;
  selectedCabId!: number;
  selectedOrderId!: number;
  statusTypes = Object.values(StatusType); // Array of status types

  constructor(
    private fb: FormBuilder,
    private cabService: CabService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.loadCollectorsAndCabs();
    this.settingsItems = [
      {label: 'Cabs', icon: 'pi pi-fw pi-car', command: () => { this.activeTab = 'Cabs'; this.loadCollectorsAndCabs(); }},
      {label: 'Collectors', icon: 'pi pi-fw pi-users', command: () => { this.activeTab = 'Collectors'; }},
      {label: 'Orders', icon: 'pi pi-fw pi-shopping-cart', command: () => { this.activeTab = 'Orders'; this.loadOrders(); }},
      {label: 'Recyclable Products', icon: 'pi pi-fw pi-globe', command: () => { this.activeTab = 'Recyclable Products'; }}
    ];
    this.activeItem = this.settingsItems[0];
    this.activeTab = 'Cabs';

    this.editCabForm = this.fb.group({
      plateNumber: ['', Validators.required],
      collectorName: ['', Validators.required]
    });

    this.editOrderForm = this.fb.group({
      type: ['', Validators.required],
      regularUserId: ['', Validators.required],
      collectorId: ['', Validators.required],
      paymentId: ['', Validators.required]
    });

    this.loadOrders();
    this.loadCollectorsAndCabs();
  }

  loadCollectorsAndCabs() {
    forkJoin({
      collectors: this.cabService.getCollectors(),
      cabs: this.cabService.getCabs()
    }).subscribe(({ collectors, cabs }) => {
      this.collectors = collectors;
      this.cabs = cabs.map(cab => {
        const collector = collectors.find(col => col.id === cab.collectorId);
        return {
          ...cab,
          collectorName: collector ? `${collector.firstName} ${collector.lastName}` : 'Unknown'
        };
      });
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  loadOrders() {
    console.log('loadOrders called');
    this.orderService.getOrders().subscribe(
      orders => {
        this.orders = orders;
        console.log('Orders loaded:', this.orders);
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  getStatusDisplayName(type: string): string {
    return getStatusDisplayName(type as StatusType);
  }

  editOrder(order: OrderDto): void {
    this.selectedOrderId = order.id;
    this.editOrderForm.patchValue({
      type: order.type,
      regularUserId: order.regularUserId,
      collectorId: order.collectorId,
      paymentId: order.paymentId
    });
    this.toggleOrderModal();
  }

  deleteOrder(order: OrderDto): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(order.id).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== order.id);
          alert('Order deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting order:', error);
          alert('Failed to delete order');
        }
      });
    }
  }

  onSaveOrder() {
    const updatedOrder: OrderDto = this.editOrderForm.value;

    // Debugging log to ensure form values are captured
    console.log('Form Values:', this.editOrderForm.value);
    console.log('Updated Order:', updatedOrder);

    if (!this.editOrderForm.controls['type'].value) {
      alert('Order type is required');
      return;
    }

    this.orderService.editOrder(this.selectedOrderId, updatedOrder).subscribe({
      next: () => {
        this.loadOrders();
        this.toggleOrderModal();
      },
      error: (error: any) => console.error('Error updating order:', error)
    });
  }

  onCancelOrder() {
    this.toggleOrderModal();
  }

  toggleOrderModal() {
    this.displayEditOrderModal = !this.displayEditOrderModal;
  }

  editCab(cab: any): void {
    this.selectedCabId = cab.id;
    this.editCabForm.patchValue({
      plateNumber: cab.plateNumber,
      collectorName: cab.collectorName
    });
    this.toggleCabModal();
  }

  deleteCab(cab: CabDto): void {
    if (confirm('Are you sure you want to delete this cab?')) {
      this.cabService.deleteCab(cab.id).subscribe({
        next: () => {
          this.cabs = this.cabs.filter(c => c.id !== cab.id);
          alert('Cab deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting cab:', error);
          alert('Failed to delete cab');
        }
      });
    }
  }

  onSaveCab() {
    const updatedCab: CabDto = this.editCabForm.value;
    this.cabService.editCab(this.selectedCabId, updatedCab).subscribe({
      next: () => {
        this.loadCollectorsAndCabs();
        this.toggleCabModal();
      },
      error: (error: any) => console.error('Error updating cab:', error)
    });
  }

  onCancelCab() {
    this.toggleCabModal();
  }

  toggleCabModal() {
    this.displayEditModal = !this.displayEditModal;
  }
}

