import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {
  private apiUrl: string = "https://performanceanalytics-api.herokuapp.com/api";

  constructor(private http: HttpClient) {
  }

  getAnalytics(startDate: number, endDate: number): Observable<AnalyticItem[]> {
    let url = this.apiUrl + "/analytics";
    if (startDate !== null && endDate !== null) {
      url = this.apiUrl + "/analytics?" + "startDate=" + startDate + "&endDate=" + endDate;
    }

    return this.http.get<AnalyticItem[]>(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

export interface AnalyticItem {
  siteUrl: string,
  ttfb: number,
  fcp: number,
  domLoad: number,
  windowLoad: number,
  resourceMetrics: ResourceMetric[],
  createDate: string
}

export interface ResourceMetric {
  name: string,
  duration: number,
  initiatorType: string,
  transferSize: number
}
