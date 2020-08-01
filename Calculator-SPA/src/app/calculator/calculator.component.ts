import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  buttonLabelsOperands = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  buttonLabelsOperators = ['*', '÷', '+', '-', '.'];
  operatorsDisabled = true;
  calculation = '';
  answer: any;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  // Update calculation with button label, and display this.
  btnClick(label: string) {
    this.calculation = this.calculation.concat(label);
    document.getElementById('calculation').innerHTML = this.calculation;

    // Disable operator buttons when rightmost character in calculation is not numeric.
    if (!isNumeric(label)) {
      this.operatorsDisabled = true;
    } else {
      this.operatorsDisabled = false;
    }
    // Simplified implementation of isNumeric from rxjs.
    function  isNumeric(val: any): boolean {
      return !(val instanceof Array) && (val - parseFloat(val) + 1) >= 0;
    }
  }

  // Queries API with calculation, displayes result, and updates calculation
  btnEquals() {

    this.http.get(this.baseUrl + 'calculate/' + this.calculation).subscribe(response => {
      this.answer = response;
      document.getElementById('calculation').innerHTML = this.answer;
      this.calculation = this.answer.toString();
    }, error => {
      console.log(error);
    });

  }

  // Remove rightmost character in calculation
  btnDel() {
    this.calculation = this.calculation.substr(0, this.calculation.length - 1);
    document.getElementById('calculation').innerHTML = this.calculation;
  }

  // Clear calculation
  btnAc() {
    this.calculation = '';
    document.getElementById('calculation').innerHTML = this.calculation;
  }

}
