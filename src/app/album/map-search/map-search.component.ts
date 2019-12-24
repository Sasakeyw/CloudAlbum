import { Component, OnInit, ViewChild } from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit {

  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  // center = {lat: 24, lng: 12};
  center = {lat: 35.707395555218, lng: 139.70330619235972};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  // zoom = 4;
  zoom = 16;
  display?: google.maps.LatLngLiteral;
  constructor() { }

  ngOnInit() {
  }

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }

}
