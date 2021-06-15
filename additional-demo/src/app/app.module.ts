import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AppRoutingModule } from './router/app-routing.module';
import { HighlightDirective } from './directive/highlight.directive';
import { ActiveDirective } from './directive/active/active.directive';

import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HighlightDirective,
    ActiveDirective
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
