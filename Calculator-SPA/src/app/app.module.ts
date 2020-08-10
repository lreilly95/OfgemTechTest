import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalculatorMdbootstrapComponent } from './calculator-mdbootstrap/calculator-mdbootstrap.component';

@NgModule({
   declarations: [
      AppComponent,
      CalculatorComponent,
      CalculatorMdbootstrapComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
