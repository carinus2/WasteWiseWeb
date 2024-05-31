import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-collector-map',
  templateUrl: './collector-map.component.html',
  styleUrls: ['./collector-map.component.css']
})
export class CollectorMapComponent implements OnInit, OnDestroy {
  map: any;
  directionsService: any;
  directionsRenderer: any;
  collectorMarker: any;
  userMarker: any;
  userLocation!: { lat: number, lng: number };
  collectorLocation!: { lat: number, lng: number };
  collectorPath: any[] = [];
  moveInterval: any;

  constructor(private zone: NgZone, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGoogleMapsApi().then(() => {
      this.getUserLocation();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.moveInterval);
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

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.zone.run(() => {
            this.userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.collectorLocation = this.generateRandomLocationWithin10Km(this.userLocation);
            this.loadMap();
            this.calculateRoute();
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Geolocation service failed. Using default location.');
          this.setDefaultLocation();
        }
      );
    } else {
      alert('Your browser doesn\'t support geolocation.');
      this.setDefaultLocation();
    }
  }

  setDefaultLocation(): void {
    this.userLocation = { lat: 45.7537, lng: 21.2257 }; // Default location (Timisoara)
    this.collectorLocation = this.generateRandomLocationWithin10Km(this.userLocation);
    this.loadMap();
    this.calculateRoute();
  }

  generateRandomLocationWithin10Km(origin: { lat: number, lng: number }): { lat: number, lng: number } {
    const radius = 10; // Radius in km
    const earthRadius = 6371; // Earth radius in km

    const randomDistance = Math.random() * radius;
    const randomAngle = Math.random() * 2 * Math.PI;

    const deltaLat = randomDistance * Math.cos(randomAngle) / earthRadius;
    const deltaLng = randomDistance * Math.sin(randomAngle) / (earthRadius * Math.cos(origin.lat * Math.PI / 180));

    const randomLat = origin.lat + deltaLat * (180 / Math.PI);
    const randomLng = origin.lng + deltaLng * (180 / Math.PI);

    return { lat: randomLat, lng: randomLng };
  }

  loadMap(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.userLocation,
      zoom: 14
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);

    this.collectorMarker = new google.maps.Marker({
      position: this.collectorLocation,
      map: this.map,
      title: 'Collector'
    });

    this.userMarker = new google.maps.Marker({
      position: this.userLocation,
      map: this.map,
      title: 'Your Location'
    });
  }

  calculateRoute(): void {
    this.directionsService.route(
      {
        origin: this.collectorLocation,
        destination: this.userLocation,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response: any, status: any) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response);
          this.collectorPath = response.routes[0].overview_path;
        } else {
          alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  public startCollectorMovement(remainingTime: number): void {
    let step = 0;
    const totalSteps = this.collectorPath.length;
    const interval = (remainingTime * 1000) / totalSteps; // Calculate interval in milliseconds

    this.moveInterval = setInterval(() => {
      if (step < totalSteps) {
        this.collectorMarker.setPosition(this.collectorPath[step]);
        this.map.setCenter(this.collectorPath[step]);
        step++;
      } else {
        clearInterval(this.moveInterval);
      }
    }, interval);
  }
}
