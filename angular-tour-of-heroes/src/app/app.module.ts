import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import { ButtonModule } from 'primeng/button';

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
    SkinsComponent
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
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
