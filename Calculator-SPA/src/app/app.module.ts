import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
   declarations: [
      AppComponent,
      CalculatorComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      CommonModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
