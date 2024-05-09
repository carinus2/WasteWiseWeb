import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CabDto } from '../../models/CabDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabService } from '../../services/CabService';

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
  displayEditModal: boolean = false;
  editCabForm!: FormGroup;
  selectedCabId!: number;

  constructor(
    private fb: FormBuilder,
    private cabService: CabService  // Serviciu pentru gestionarea datelor
  ) {}

  ngOnInit() {
    this.settingsItems = [
      {label: 'Cabs', icon: 'pi pi-fw pi-car', command: () => { this.activeTab = 'Cabs'; this.getCabs(); }},
      {label: 'Collectors', icon: 'pi pi-fw pi-users', command: () => { this.activeTab = 'Collectors'; }},
      {label: 'Orders', icon: 'pi pi-fw pi-shopping-cart', command: () => { this.activeTab = 'Orders'; }},
      {label: 'Recyclable Products', icon: 'pi pi-fw pi-globe', command: () => { this.activeTab = 'Recyclable Products'; }}
    ];
    this.activeItem = this.settingsItems[0];
    this.activeTab = 'Cabs';
    this.getCabs();
    
    this.editCabForm = this.fb.group({
      plateNumber: ['', Validators.required],
      collectorName: ['', Validators.required]
    });
  }

  getCabs() {
    this.cabService.getCabs().subscribe(
      (cabs: CabDto[]) => this.cabs = cabs,
      (error: any) => console.error('Error fetching cabs:', error)
    );
  }

  editCab(cab: CabDto): void {
    this.selectedCabId = cab.id;
    this.editCabForm.patchValue(cab);
    this.toggleModal();
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

  onSave() {
    const updatedCab: CabDto = this.editCabForm.value;
    this.cabService.editCab(this.selectedCabId, updatedCab).subscribe({
      next: () => {
        this.getCabs();
        this.toggleModal();
      },
      error: (error: any) => console.error('Error updating cab:', error)
    });
  }

  onCancel() {
    this.toggleModal();
  }

  toggleModal() {
    this.displayEditModal = !this.displayEditModal;
  }
}
