import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  buttonLabelsOperands = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  buttonLabelsOperators = ['x', '÷', '+', '-', '.'];
  operatorsDisabled = true;
  calculation = '';

  constructor() { }

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

  // TODO - Query API with calculation and display result
  btnEquals() {
    throw new Error('Not Implemented');
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
