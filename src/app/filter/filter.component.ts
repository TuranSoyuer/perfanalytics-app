import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as _moment from "moment";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public formGroup = new FormGroup({
    startDate: new FormControl(_moment().utc().utcOffset(3).second(0).subtract(30, "minutes"), [Validators.required]),
    endDate: new FormControl(_moment().utc().utcOffset(3).second(0), [Validators.required]),
  })

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submit.emit({
      startDate: _moment(this.formGroup.value.startDate).valueOf(),
      endDate: _moment(this.formGroup.value.endDate).valueOf()
    });
  }
}
