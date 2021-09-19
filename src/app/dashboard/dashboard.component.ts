import {Component, OnInit} from '@angular/core';
import {AnalyticItem, AnalyticService} from "../service/analytic.service";
import {Subscription} from "rxjs";
import {LineChartData, LineChartSeries} from "../line-chart/line-chart.component";
import {UtilService} from "../util/util.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  analyticItems: AnalyticItem[] = [];
  ttfbChartData: LineChartData[] = [];
  fcpChartData: LineChartData[] = [];
  domLoadChartData: LineChartData[] = [];
  windowLoadChartData: LineChartData[] = [];

  constructor(private analyticService: AnalyticService) {
  }

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): Subscription {
    return this.analyticService.getAnalytics().subscribe(data => {
      this.analyticItems = data;
      this.setChartData();
    })
  }

  setChartData(): void {
    const siteAnalytics = UtilService.groupBy(this.analyticItems, 'siteUrl');

    for (const key in siteAnalytics) {
      let ttfbData: LineChartData = this.initializeChartData(key);
      let fcpData: LineChartData = this.initializeChartData(key);
      let domLoadData: LineChartData = this.initializeChartData(key);
      let windowLoadData: LineChartData = this.initializeChartData(key);

      siteAnalytics[key].forEach((item: AnalyticItem) => {
        const time = UtilService.getHoursMinutes(item.createDate);
        let ttfbSeries: LineChartSeries = this.getChartValueSeries(time, item.ttfb);
        let fcpSeries: LineChartSeries = this.getChartValueSeries(time, item.fcp);
        let domLoadbSeries: LineChartSeries = this.getChartValueSeries(time, item.domLoad);
        let windowLoadSeries: LineChartSeries = this.getChartValueSeries(time, item.windowLoad);

        ttfbData.series.push(ttfbSeries);
        fcpData.series.push(fcpSeries);
        domLoadData.series.push(domLoadbSeries);
        windowLoadData.series.push(windowLoadSeries);
      })
      this.ttfbChartData.push(ttfbData);
      this.fcpChartData.push(fcpData);
      this.domLoadChartData.push(domLoadData);
      this.windowLoadChartData.push(windowLoadData);

    }
    this.ttfbChartData = [...this.ttfbChartData];
    this.fcpChartData = [...this.fcpChartData];
    this.domLoadChartData = [...this.domLoadChartData];
    this.windowLoadChartData = [...this.windowLoadChartData];
  }

  initializeChartData(key: string): LineChartData {
    return {
      name: key,
      series: []
    };
  }

  getChartValueSeries(name: string, value: number): LineChartSeries {
    return {
      name: name,
      value: value
    };
  }
}
