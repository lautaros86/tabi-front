import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LatLng, marker, polygon} from "leaflet";

import * as L from 'leaflet';
import 'leaflet.markercluster';
import {Control} from 'leaflet';
import LayersOptions = Control.LayersOptions;
import {Barrio} from "../map.component";


@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements OnInit, OnChanges {
  @Input() center: number[] = [-34.92145, -57.95453];
  @Input() markers: number[][] = []
  @Input() polygons: number[][][][] = []
  @Input() zonas: Barrio[] = []
  areas: any = []

  // Open Street Map Definition
  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Open Street Map'
    })
  };

  // Values to bind to Leaflet Directive
  layersControlOptions: LayersOptions = {position: 'bottomright'};
  baseLayers = {
    'Open Street Map': this.LAYER_OSM.layer
  };
  options = {
    zoom: 12,
    center: L.latLng(-34.92145, -57.95453)
  };

  // Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup | undefined;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions = {};

  ngOnInit(): void {
    this.refreshData();
    this.renderAreas()
  }

  ngOnChanges(changes: SimpleChanges) {
      this.refreshData()
  }

  markerClusterReady(group: L.MarkerClusterGroup) {

    this.markerClusterGroup = group;

  }

  refreshData(): void {
    this.markerClusterData = this.renderPutnos();
    this.renderAreas()
  }

  renderPutnos(): L.Marker[] {

    const data: L.Marker[] = []
    this.markers.forEach((m) => {
      var esta = data.find(e => e.getLatLng().lat == m[0] && e.getLatLng().lng == m[1])
      if (!esta)
        data.push(marker(new LatLng(m[0], m[1])))
    });
    return data;

  }

  renderAreas() {
    this.zonas.forEach((barrio) => {
      var cantPersonas = barrio.personas_genero_fem + barrio.personas_genero_masc + barrio.personas_genero_otrx
      if (barrio.id_renabap == 273 || barrio.nombre_barrio=='Santa Catalina') {
        console.log("chequea")
      }
      var color = ''
      switch (true) {
        case (cantPersonas <= 3300):
          color = '#fb6a4a'
          break;
        case (3301 <= cantPersonas && cantPersonas <= 6600):
          color = '#ef3b2c'
          break;
        case (6601 <= cantPersonas && cantPersonas <= 9900):
          color = '#cb181d'
          break;
        case (9901 <= cantPersonas && cantPersonas <= 13200):
          color = '#a50f15'
          break;
        default:
          color = '#67000d'
          break;
      }
      var popup = L.popup()
        .setContent(`
        <p><b><u>${barrio.nombre_barrio}</u></b></p>
        <p><b>Población: </b>${cantPersonas}</p>
        <p><b>Viviendas: </b>${barrio.cantidad_viviendas_aproximadas}</p>
        <p><b>Familias: </b>${barrio.cantidad_familias_aproximada}</p>
        `)
      barrio.poligono.forEach(polygonData => {
        var latlngs = polygonData.map(p => new LatLng(p[1], p[0]))
        this.areas.push(polygon(latlngs, {color: color, fillOpacity: 0.6}).bindPopup(popup))
      })
    })

  }
}
