import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  buttonLabelsOperands = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  buttonLabelsOperators = ['*', '÷', '+', '-', '.'];
  buttonLabelsParens = ['(', ')'];
  operatorsDisabled = true;
  calculation = '';
  baseUrl = environment.apiUrl;
  // Listens for keypresses and triggers relevant button clicks for valid inputs.
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.buttonLabelsOperands.includes(parseInt(event.key, 10))
      || this.buttonLabelsOperators.includes(event.key)
      || this.buttonLabelsParens.includes(event.key)) {
      this.btnClick(event.key);
    } else if (event.key === '/') {
      this.btnClick('÷');
    } else if (event.key === 'Enter') {
      this.btnEquals();
    } else if (event.key === 'Backspace') {
      this.btnDel();
    } else if (event.key === 'Delete') {
      this.btnAc();
    }
  }

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
  }

  // Update calculation with button label, and display this.
  btnClick(label: string) {
    this.calculation = this.calculation.concat(label);
    document.getElementById('calculation').innerHTML = this.calculation;

    // Disable operator buttons when rightmost character in calculation is not numeric.
    if (!isNumeric(label) && label !== ')') {
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
      document.getElementById('calculation').innerHTML = response.toString();
      this.calculation = response.toString();
    }, error => {
      this.toastr.error(error.error);
      console.log(error.error);
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
