import {Component, OnInit} from '@angular/core';
import {AnalyticItem, AnalyticService} from "../service/analytic.service";
import {Subscription} from "rxjs";
import {LineChartData, LineChartSeries} from "../line-chart/line-chart.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  analyticItems: AnalyticItem[] = [];
  ttfbChartData: LineChartData[] = [];

  constructor(private analyticService: AnalyticService) {
  }

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): Subscription {
    console.log("load analytics");
    return this.analyticService.getAnalytics().subscribe(data => {
      console.log("data length:" + data.length);
      this.analyticItems = data;
      this.setChartData();
      // console.log(this.ttfbChartData);
    })
  }

  setChartData(): void {
    const siteAnalytics = this.groupBy(this.analyticItems, 'siteUrl');

    for (const key in siteAnalytics) {
      let data: LineChartData = {
        name: key,
        series: []
      };

      siteAnalytics[key].forEach((item: AnalyticItem) => {
        let series: LineChartSeries = {
          name: item.createDate,
          value: item.ttfb
        };
        data.series.push(series);
      })
      this.ttfbChartData.push(data);
      this.ttfbChartData = [...this.ttfbChartData];
    }
  }

  groupBy(arr: any, key: any) {
    return arr.reduce(function (map: any, currentValue: any) {
      (map[currentValue[key]] = map[currentValue[key]] || []).push(currentValue);
      return map;
    }, {});
  };


}
