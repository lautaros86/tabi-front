import {AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';
import {LatLng, LatLngExpression} from "leaflet";
@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements AfterViewInit {
  private map: any;
  @Input() center: number[] = [-34.92145, -57.95453];
  @Input() markers: number[][] = []
  @Input() polygons: number[][][][] = []
  private initMap(): void {
    // inicializa el centro de mapa
    this.map = L.map('map', {
      center: new LatLng(this.center[0], this.center[1]),
      zoom: 12,
    });

    // renderiza los markers
    this.markers.forEach( (mark) => {
     // L.map(new LatLng(mark[0], mark[1])).addTo(this.map)
    })

    // renderiza los poligonos

    this.polygons.forEach( (part) => {
      if(!!part){
          part.forEach( polygon => {
            var latlngs = polygon.map( p => new LatLng(p[1], p[0]) )
            L.polygon(latlngs, {color: 'red'}).addTo(this.map);
          })
      }
    })

    // no se que hace pero es necesario
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
