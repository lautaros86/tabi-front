import {Component, OnInit} from '@angular/core';
import { BARRIOS } from './BarriosPuntos'
import { PUNTOS } from './Puntos'
import {latLng, tileLayer} from "leaflet";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  center: number[] = [];
  markers: number[][] = [];
  polygons: number[][][][] = [];
  barrios = BARRIOS
  puntos = PUNTOS
  ngOnInit() {
    this.center = [-34.92145, -57.95453]
    this.cargarPuntos()
    this.cargarBarrios()
  }
  cargarPuntos() {
    this.markers = this.puntos.puntos.map( p => [p.latitud, p.longitud])
  }

  cargarBarrios() {
    this.polygons = this.barrios.data.map( barrio => {
       try {
         return JSON.parse(barrio.geometry
           .replace('MULTIPOLYGON ', '')
           .replaceAll('(', '[')
           .replaceAll(')', ']')
           .replaceAll(', ', '],[')
           .replaceAll(' ', ', ')
           .replaceAll(']]],[[[', ']],[[')
         )
       } catch (e ) {
         console.log("fallo el mapeo de " + barrio)
       }
      }
    )

  }
}
