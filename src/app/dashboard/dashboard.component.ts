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

  siteUrls: string[] = [];

  selectedSiteUrl!: string;

  constructor(private analyticService: AnalyticService) {
  }

  ngOnInit(): void {
    this.loadAnalytics(null, null);
  }

  loadAnalytics(startDate: any, endDate: any): Subscription {
    this.analyticItems = [];
    return this.analyticService.getAnalytics(startDate, endDate).subscribe(data => {
      this.analyticItems = data;
      this.setSiteUrlOption();
      this.setChartData();
    })
  }

  setSiteUrlOption(): void {
    this.siteUrls = UtilService.distinct(this.analyticItems, 'siteUrl');
    this.selectedSiteUrl = this.siteUrls[0];
  }

  setChartData(): void {
    this.ttfbChartData = [];
    this.fcpChartData = [];
    this.domLoadChartData = [];
    this.windowLoadChartData = [];
    const selectedSiteAnalytics = this.analyticItems.filter(value => value.siteUrl === this.selectedSiteUrl);

    let ttfbData: LineChartData = this.initializeChartData(this.selectedSiteUrl);
    let fcpData: LineChartData = this.initializeChartData(this.selectedSiteUrl);
    let domLoadData: LineChartData = this.initializeChartData(this.selectedSiteUrl);
    let windowLoadData: LineChartData = this.initializeChartData(this.selectedSiteUrl);

    selectedSiteAnalytics.forEach((item: AnalyticItem) => {
      const time = UtilService.getHoursMinutes(item.createDate);
      this.addChartValueSeries(ttfbData.series, time, item.ttfb);
      this.addChartValueSeries(fcpData.series, time, item.fcp);
      this.addChartValueSeries(domLoadData.series, time, item.domLoad);
      this.addChartValueSeries(windowLoadData.series, time, item.windowLoad);
    })

    this.ttfbChartData.push(ttfbData);
    this.fcpChartData.push(fcpData);
    this.domLoadChartData.push(domLoadData);
    this.windowLoadChartData.push(windowLoadData);
  }

  initializeChartData(key: string): LineChartData {
    return {
      name: key,
      series: []
    };
  }

  addChartValueSeries(series: LineChartSeries[], name: string, value: number): void {
    if (value >= 0) {
      series.push({
        name: name,
        value: value
      });
    }
  }

  filterSubmit({startDate, endDate}: { startDate: number, endDate: number }) {
    if (typeof startDate !== 'undefined' || typeof endDate !== 'undefined') {
      this.loadAnalytics(startDate, endDate);
    }
  }

  siteUrlChange(value: any) {
    this.setChartData();
  }
}
