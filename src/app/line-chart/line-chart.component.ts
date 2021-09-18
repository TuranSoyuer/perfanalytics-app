import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() data: any;

  constructor() {

  }

  ngOnInit(): void {
  }
}

export interface LineChartData {
  name: string,
  series: LineChartSeries[]
}

export interface LineChartSeries {
  name: string,
  value: number
}
