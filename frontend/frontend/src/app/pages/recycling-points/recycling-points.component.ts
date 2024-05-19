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

  recyclingPoints: { lat: number, lng: number, name: string, type: string, address: string }[] = getRandomPoints(500);

  currentMarkers: google.maps.Marker[] = [];
  map!: google.maps.Map;

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
        this.initMap();
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
          this.map.setCenter(this.center);
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
          this.map.setCenter(this.center);
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

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.center,
      zoom: this.zoom
    });
    this.addRecyclingPoints();
  }

  addRecyclingPoints(): void {
    const icons: { [key: string]: { url: string, scaledSize: google.maps.Size } } = {
      plastic: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      glass: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      metal: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      paper: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      all: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      big_trash: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) }
    };

    this.recyclingPoints.forEach(point => {
      const marker = new google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: this.map,
        title: point.name,
        icon: icons[point.type]
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${point.name}</h3><p>${point.address}</p>`
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.currentMarkers.push(marker);
    });
  }

  filterMarkers(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.clearMarkers();
    this.addFilteredMarkers(selectedCategory);

    // Redirect to the closest point of the selected category
    if (selectedCategory !== 'all') {
      const closestPoint = this.getClosestPoint(selectedCategory);
      if (closestPoint) {
        const userConfirmed = confirm(`Do you want to be redirected to this closest ${selectedCategory} point: ${closestPoint.name}, Address: ${closestPoint.address}`);
        if (userConfirmed) {
          this.map.setCenter({ lat: closestPoint.lat, lng: closestPoint.lng });
          this.map.setZoom(20); // Zoom in very closely
        }
      } else {
        alert('No points found for the selected category.');
      }
    }
  }

  clearMarkers(): void {
    this.currentMarkers.forEach(marker => marker.setMap(null));
    this.currentMarkers = [];
  }

  addFilteredMarkers(category: string): void {
    const icons: { [key: string]: { url: string, scaledSize: google.maps.Size } } = {
      plastic: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      glass: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      metal: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      paper: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      all: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) },
      big_trash: { url: '/assets/everything-icon.jpg', scaledSize: new google.maps.Size(30, 30) }
    };

    this.recyclingPoints.forEach(point => {
      if (category === 'all' || point.type === category) {
        const marker = new google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: this.map,
          title: point.name,
          icon: icons[point.type]
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<h3>${point.name}</h3><p>${point.address}</p>`
        });

        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });

        this.currentMarkers.push(marker);
      }
    });
  }

  getClosestPoint(category: string): { lat: number, lng: number, name: string, type: string, address: string } | null {
    let closestPoint = null;
    let closestDistance = Infinity;

    this.recyclingPoints.forEach(point => {
      if (point.type === category) {
        const distance = this.calculateDistance(this.center, { lat: point.lat, lng: point.lng });
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPoint = point;
        }
      }
    });

    return closestPoint;
  }

  calculateDistance(point1: { lat: number, lng: number }, point2: { lat: number, lng: number }): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(point2.lat - point1.lat);
    const dLng = this.deg2rad(point2.lng - point1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(point1.lat)) * Math.cos(this.deg2rad(point2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

// Generate random points with more focus on Timisoara, Giroc, and Dumbravita
function getRandomPoints(numPoints: number): { lat: number, lng: number, name: string, type: string, address: string }[] {
  const types = ['plastic', 'glass', 'metal', 'paper', 'all', 'big_trash'];
  const points = [];
  const minLat = 43.6;
  const maxLat = 48.3;
  const minLng = 20.3;
  const maxLng = 29.7;

  // Define bounding boxes for Timisoara, Giroc, and Dumbravita
  const timisoaraBox = { minLat: 45.7, maxLat: 45.8, minLng: 21.2, maxLng: 21.3 };
  const girocBox = { minLat: 45.7, maxLat: 45.75, minLng: 21.2, maxLng: 21.25 };
  const dumbravitaBox = { minLat: 45.8, maxLat: 45.85, minLng: 21.2, maxLng: 21.3 };

  // Generate more points in specific areas
  for (let i = 0; i < numPoints; i++) {
    let lat, lng;
    let address = "";
    let type = types[Math.floor(Math.random() * types.length)];
    if (i < numPoints * 0.4) { // 40% of points in Timisoara
      lat = Math.random() * (timisoaraBox.maxLat - timisoaraBox.minLat) + timisoaraBox.minLat;
      lng = Math.random() * (timisoaraBox.maxLng - timisoaraBox.minLng) + timisoaraBox.minLng;
      address = "Timisoara";
    } else if (i < numPoints * 0.6) { // 20% of points in Giroc
      lat = Math.random() * (girocBox.maxLat - girocBox.minLat) + girocBox.minLat;
      lng = Math.random() * (girocBox.maxLng - girocBox.minLng) + girocBox.minLng;
      address = "Giroc";
    } else if (i < numPoints * 0.8) { // 20% of points in Dumbravita
      lat = Math.random() * (dumbravitaBox.maxLat - dumbravitaBox.minLat) + dumbravitaBox.minLat;
      lng = Math.random() * (dumbravitaBox.maxLng - dumbravitaBox.minLng) + dumbravitaBox.minLng;
      address = "Dumbravita";
    } else { // 20% of points in other parts of Romania
      lat = Math.random() * (maxLat - minLat) + minLat;
      lng = Math.random() * (maxLng - minLng) + minLng;
      address = "Other parts of Romania";
    }
    points.push({
      lat: lat,
      lng: lng,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Recycling Point ${i + 1}`,
      type: type,
      address: address
    });
  }

  return points;
}
