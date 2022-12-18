import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

export interface Barrio {
  personas_genero_fem: number
  id_renabap: number
  cantidad_familias_aproximada: number
  nombre_barrio: string
  cantidad_viviendas_aproximadas: number
  personas_genero_masc: number
  geometry: string
  personas_genero_otrx: number
  poligono: number[][][]
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  center: number[] = [];
  markers: number[][] = [];
  polygons: number[][][][] = [];
  zonas: Barrio[] = []

  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    this.center = [-34.92145, -57.95453]
    this.cargarPuntos()
    this.cargarBarrios()
  }

  cargarPuntos() {
    this.dataService.getPuntos().subscribe(
      (data: any) => this.markers = data.data.map((p: any) => [p.latitud, p.longitud])
    )
  }

  cargarBarrios() {
    this.dataService.getBarriosPuntos().subscribe(
      (data: any) => {
        this.zonas = data.data.map((barrio: any) => {
          var poligono = []
          if(barrio.id_renabap == 273) {
            console.log("frena")
          }
          try {
            poligono = JSON.parse(barrio.geometry
              .replace('MULTIPOLYGON ', '')
              .replaceAll('(', '[')
              .replaceAll(')', ']')
              .replaceAll(', ', '],[')
              .replaceAll(' ', ', ')
              .replaceAll(']]],[[[', ']],[[')
            )
          } catch (e) {
            console.log("fallo el mapeo de " + barrio)
          }
          return {...barrio, poligono}
        })
      }
    )

  }
}
