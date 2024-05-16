import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-recycling-points',
  templateUrl: './recycling-points.component.html',
  styleUrls: ['./recycling-points.component.css']
})
export class RecyclingPointsComponent implements OnInit, AfterViewInit {
  display: any;
  center: google.maps.LatLngLiteral = { lat: 45.7537, lng: 21.2257 }; // Default values
  zoom = 18;
  userLocation: string = '';

  @ViewChild('autocompleteInput', { static: false }) autocompleteInput!: ElementRef;

  constructor(
    private zone: NgZone,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getUserLocation();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleMapsApi().then(() => {
        this.initAutocomplete();
      });
    }
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
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
    } else {
      console.log('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
      this.setDefaultLocation();
    }
  }

  setDefaultLocation(): void {
    this.center = {
      lat: 45.7537,
      lng: 21.2257
    };
    this.zoom = 18;
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

  initAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.nativeElement, {
      types: ['geocode']
    });

    autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          this.center = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          this.zoom = 18;
        } else {
          alert('No details available for input: ' + place.name);
        }
      });
    });
  }

  updateLocation(): void {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.userLocation)}&key=AIzaSyDzKjE6YGJmHyUxpO_v4fYcCRrKmKSUonA`;

    this.http.get(geocodeUrl).subscribe((data: any) => {
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        this.zone.run(() => {
          this.center = {
            lat: location.lat,
            lng: location.lng
          };
          this.zoom = 18;
        });
      } else {
        alert('Location not found!');
      }
    }, (error) => {
      console.error('Geocoding error:', error);
      alert('Error fetching location data');
    });
  }

  loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google === 'object' && typeof google.maps === 'object') {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzKjE6YGJmHyUxpO_v4fYcCRrKmKSUonA&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (error: any) => reject(error);
        document.head.appendChild(script);
      }
    });
  }
}
