import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as _moment from "moment";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  currentStartDate!: FormControl;
  currentEndDate!: FormControl;

  public formGroup = new FormGroup({
    startDate: new FormControl(_moment().utc().utcOffset(3).second(0).subtract(30, "minutes"), [Validators.required]),
    endDate: new FormControl(_moment().utc().utcOffset(3).second(0), [Validators.required]),
  })

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.setCurrentDates();
  }

  onSubmit(): void {
    this.submit.emit({
      startDate: _moment(this.formGroup.value.startDate).valueOf(),
      endDate: _moment(this.formGroup.value.endDate).valueOf()
    });
    this.setCurrentDates();
  }

  onCancel(): void {
    this.formGroup.setValue({
      startDate: this.currentStartDate,
      endDate: this.currentEndDate
    })
  }

  setCurrentDates(): void {
    this.currentStartDate = this.formGroup.value.startDate;
    this.currentEndDate = this.formGroup.value.endDate;
  }
}
