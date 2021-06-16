import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AppRoutingModule } from './router/app-routing.module';
import { HighlightDirective } from './directive/highlight.directive';
import { ActiveDirective } from './directive/active/active.directive';
import { FormComponent } from './components/form/form.component';

import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import { DirectiveComponent } from './components/directive/directive.component';
import { LibraryComponent } from './components/library/library.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { RibbonLibModule } from 'ribbon-lib';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HighlightDirective,
    ActiveDirective,
    DirectiveComponent,
    LibraryComponent,
    FormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    RibbonLibModule,
    InputTextModule,
    DropdownModule,
    CascadeSelectModule,
    ButtonModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
