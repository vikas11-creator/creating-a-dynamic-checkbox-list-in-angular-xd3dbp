import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;
  ordersData = [];
  searchValue: string = '';
  array: any;
  isSearchFirst: boolean = true;
  arrCopy: any;

  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      searchColumn: [this.searchValue ? this.searchValue : ''],
      orders: new FormArray([]),
    });
    this.getOrders();

    // async orders
    // of(this.getOrders()).subscribe(orders => {
    //   this.ordersData = orders;
    //   console.log(this.ordersData)
    this.addCheckboxes();
    // });

    console.log(this.ordersFormArray);
  }

  searchField(event: any) {
    this.searchValue = event.target.value;
    if (this.isSearchFirst) {
      this.arrCopy = this.array;
      this.isSearchFirst = false;
    }
    console.log(this.arrCopy);
    this.array = [];
    this.arrCopy.forEach((element: any) => {
      if (element.name.includes(this.searchValue)) {
        this.array.push(element);
      }
    });
    this.array.forEach((res: any) => {
      this.ordersFormArray.push(new FormControl(false));
    });
  }

  addCheckboxes() {
    this.array.forEach((res: any) => {
      this.ordersFormArray.push(new FormControl(false));
    });
  }

  getOrders() {
    this.array = [
      { id: 100, name: 'order' },
      { id: 200, name: 'sell' },
      { id: 300, name: 'buy' },
      { id: 400, name: 'rent' },
    ];
  }

  submit() {}
}
