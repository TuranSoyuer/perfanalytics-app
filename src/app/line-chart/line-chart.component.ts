import {Component, Input, OnInit} from '@angular/core';
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() data!: LineChartData[];
  @Input() yAxisLabel!: string;

  legendPosition: LegendPosition = LegendPosition.Right;
  legendTitle: string = "Site Url";

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
