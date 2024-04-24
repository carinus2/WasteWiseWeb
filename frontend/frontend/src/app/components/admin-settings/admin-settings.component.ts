
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabService } from '../../services/CabService';
import { CabDto } from '../../models/CabDto';
import { CollectorDto } from '../../models/CollectorDto';
import { forkJoin } from 'rxjs';
import { Component } from '@angular/core';

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
  displayEditModal: boolean = false;
  editCabForm!: FormGroup;
  selectedCabId!: number;
  editUserForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private cabService: CabService
  ) {}

  ngOnInit() {
    this.loadCollectorsAndCabs();
    this.settingsItems = [
      {label: 'Cabs', icon: 'pi pi-fw pi-car', command: () => { this.activeTab = 'Cabs'; this.loadCollectorsAndCabs(); }},
      {label: 'Collectors', icon: 'pi pi-fw pi-users', command: () => { this.activeTab = 'Collectors'; }},
      {label: 'Orders', icon: 'pi pi-fw pi-shopping-cart', command: () => { this.activeTab = 'Orders'; }},
      {label: 'Recyclable Products', icon: 'pi pi-fw pi-globe', command: () => { this.activeTab = 'Recyclable Products'; }}
    ];
    this.activeItem = this.settingsItems[0];
    this.activeTab = 'Cabs';

    this.editCabForm = this.fb.group({
      plateNumber: ['', Validators.required],
      collectorName: ['', Validators.required]
    });
  }

  loadCollectors() {
    this.cabService.getCollectors().subscribe(
      collectors => this.collectors = collectors,
      error => console.error('Error fetching collectors:', error)
    );
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


  editCab(cab: any): void {
    this.selectedCabId = cab.id;
    this.editCabForm.patchValue({
      plateNumber: cab.plateNumber,
      collectorName: cab.collectorName
    });
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
        this.loadCollectorsAndCabs();
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
