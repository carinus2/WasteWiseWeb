import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-recycling-points',
  templateUrl: './recycling-points.component.html',
  styleUrls: ['./recycling-points.component.css']
})
export class RecyclingPointsComponent implements OnInit {
  display: any;
  center: google.maps.LatLngLiteral = { lat: 45.7537, lng: 21.2257 }; // Default values
  zoom = 10;


  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.zoom = 15; // Closer zoom level
      }, (error) => {
        console.error('Geolocation error:', error);
        this.setDefaultLocation();
        alert('Error fetching location: ' + error.message); // UI feedback
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
      this.setDefaultLocation();
    }
  }


  setDefaultLocation(): void {
    // Default to Timisoara if geolocation fails or is not supported
    this.center = {
      lat: 45.7537,
      lng: 21.2257
    };
    this.zoom = 10;
  }

  moveMap(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }
}
