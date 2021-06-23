import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { CustomelementComponent } from './customelement/customelement.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsComponent } from './notifications/notifications.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewsComponent } from './views/views.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomelementComponent,
    NotificationsComponent,
    DashboardComponent,
    
    ViewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [
    AppComponent,
    CustomelementComponent
  ]
})

export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(CustomelementComponent, { injector });
    customElements.define('rbn-fm', el);
  }
  ngDoBootstrap() {}
}

/*export class AppModule {

  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {

    // See if already exists, since ngDoBootStrap is called multiple times, bug??
    const fmElement = document.createElement('rbn-fm');

    console.log('ngDoBootsrap CALLED!!: ' + fmElement.children.length);


    const { injector } = this;

    // create custom elements from angular components
    const ngCustomElement = createCustomElement(CustomelementComponent, { injector });

    // define in browser registry
    customElements.define('rbn-fm', ngCustomElement);

  }*/



