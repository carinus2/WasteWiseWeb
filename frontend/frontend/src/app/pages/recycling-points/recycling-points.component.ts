import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recycling-points',
  templateUrl: './recycling-points.component.html',
  styleUrls: ['./recycling-points.component.css']
})
export class RecyclingPointsComponent implements OnInit {
  display: any;
  center: google.maps.LatLngLiteral = { lat: 45.7537, lng: 21.2257 }; // Default values
  zoom = 12;
  userLocation: string = '';

  constructor(private zone: NgZone, private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          this.getPosition();
        } else if (result.state === 'denied') {
          alert('Geolocation permission denied. Please allow location access.');
          this.setDefaultLocation();
        }
        result.onchange = () => {
          if (result.state === 'granted') {
            this.getPosition();
          } else {
            alert('Geolocation permission changed to ' + result.state);
            this.setDefaultLocation();
          }
        };
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
      this.setDefaultLocation();
    }
  }

  getPosition(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.zone.run(() => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.zoom = 18; // Closer zoom level
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        this.setDefaultLocation();
        alert('Error fetching location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  setDefaultLocation(): void {
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

  updateLocation(): void {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.userLocation)}&key="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzKjE6YGJmHyUxpO_v4fYcCRrKmKSUonA&callback=initMap"`;

    this.http.get(geocodeUrl).subscribe((data: any) => {
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        this.zone.run(() => {
          this.center = {
            lat: location.lat,
            lng: location.lng
          };
          this.zoom = 15;
        });
      } else {
        alert('Location not found!');
      }
    }, (error) => {
      console.error('Geocoding error:', error);
      alert('Error fetching location data');
    });
  }
}
