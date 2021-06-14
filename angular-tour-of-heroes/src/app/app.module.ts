import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './router/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { HeroComponent } from './components/hero/hero.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeroTypeListComponent } from './components/hero-type-list/hero-type-list.component';
import { HeroFormAddComponent } from './components/hero-form-add/hero-form-add.component';
import { SkinsComponent } from './components/skins/skins.component'
import { SkinDialogComponent } from './components/skin-dialog/skin-dialog.component';
import { ChartComponent } from './components/chart/chart.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';
import { LazyLoadingComponent } from './components/lazy-loading/lazy-loading.component';

//my library
import { RibbonLibModule } from 'ribbon-lib';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroComponent,
    NotFoundPageComponent,
    LayoutComponent,
    HeroTypeListComponent,
    HeroFormAddComponent,
    SkinsComponent,
    SkinDialogComponent,
    ChartComponent,
    LazyLoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false, delay: 500 }
    ),
    ButtonModule,
    TableModule,
    ProgressSpinnerModule,
    ToastModule,
    ToolbarModule,
    CardModule,
    FileUploadModule,
    InputTextModule,
    CheckboxModule,
    PaginatorModule,
    ConfirmDialogModule,
    DropdownModule,
    DialogModule,
    InputNumberModule,
    ChartModule,
    RibbonLibModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
