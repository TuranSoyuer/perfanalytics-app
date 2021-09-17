import { Component } from '@angular/core';
import { AnalyticService } from './service/analytic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'perfanalytics-app';

  constructor(private analyticService: AnalyticService) {}
}
