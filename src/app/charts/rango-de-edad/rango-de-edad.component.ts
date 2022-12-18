import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Barrio} from "../barrio";
import {ChartOptions} from "chart.js";

@Component({
  selector: 'app-rango-de-edad',
  templateUrl: './rango-de-edad.component.html',
  styleUrls: ['./rango-de-edad.component.scss']
})
export class RangoDeEdadComponent implements OnChanges {
  @Input() data: Barrio[] = []
  title = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [
    'rango de 0 a 4',
    'rango de 5 a 9',
    'rango de 10 a 14',
    'rango de 15 a 19',
    'rango de 20 a 24',
    'rango de 25 a 29',
    'rango de 30 a 34',
    'rango de 35 a 39',
    'rango de 40 a 44',
    'rango de 45 a 49',
    'rango de 50 a 54',
    'rango de 55 a 59',
    'rango de 60 a 64',
    'rango de 65 a 69',
    'rango de 70 a 74',
    'rango de 75 a 79',
    'mas de 80',
  ];
  public pieChartDatasets = [ {
    data: []
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && changes['data'].previousValue != changes['data'].currentValue) {
      this.loadData()
    }
  }

  loadData() {
    let total: number[] = new Array(17).fill(0)
    this.data.forEach( barrio => {
      total[0] = total[0] + barrio.rango_edad_0_a_4_anios
      total[1] = total[1] + barrio.rango_edad_5_a_9_anios
      total[2] = total[2] + barrio.rango_edad_10_a_14_anios
      total[3] = total[3] + barrio.rango_edad_15_a_19_anios
      total[4] = total[4] + barrio.rango_edad_20_a_24_anios
      total[5] = total[5] + barrio.rango_edad_25_a_29_anios
      total[6] = total[6] + barrio.rango_edad_30_a_34_anios
      total[7] = total[7] + barrio.rango_edad_35_a_39_anios
      total[8] = total[8] + barrio.rango_edad_40_a_44_anios
      total[9] = total[9] + barrio.rango_edad_45_a_49_anios
      total[10] = total[10] + barrio.rango_edad_50_a_54_anios
      total[11] = total[11] + barrio.rango_edad_55_a_59_anios
      total[12] = total[12] + barrio.rango_edad_60_a_64_anios
      total[13] = total[13] + barrio.rango_edad_65_a_69_anios
      total[14] = total[14] + barrio.rango_edad_70_a_74_anios
      total[15] = total[15] + barrio.rango_edad_75_a_79_anios
      total[16] = total[16] + barrio.rango_edad_80_o_mas_anios
    })
    this.pieChartDatasets = [ {
      // @ts-ignore
      data: total
    } ];
  }
}
