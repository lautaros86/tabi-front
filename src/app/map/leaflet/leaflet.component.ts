import {Component, Input, OnInit} from '@angular/core';
import {LatLng, latLng, marker, polygon, tileLayer} from "leaflet";


@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements OnInit {
  @Input() center: number[] = [-34.92145, -57.95453];
  @Input() markers: number[][] = []
  @Input() polygons: number[][][][] = []
  options = {}
  layers: any  = []
  puntos: any = []
  ngOnInit(): void {

    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 12,
      center: latLng(-34.92145, -57.95453)
    };

    this.polygons.forEach( (part) => {
          part.forEach( polygonData => {
            var latlngs = polygonData.map( p => new LatLng(p[1], p[0]) )
            this.layers.push(polygon(latlngs, {color: 'red'}))
          })
    })

    this.markers.forEach((m) => this.layers.push(marker(new LatLng(m[0], m[1]))))

  }
}
