import {Component, OnInit} from '@angular/core';
import {AnalyticItem, AnalyticService} from './service/analytic.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'perfanalytics-app';
  analyticItems: AnalyticItem[] = [];


  constructor(private analyticService: AnalyticService) {
  }

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): Subscription {
    console.log("load analytics");
    return this.analyticService.getAnalytics().subscribe(data => {
      console.log(JSON.stringify(data));
      this.analyticItems = data;
    })
  }

}
