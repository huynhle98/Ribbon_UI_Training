import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RbnCommonLibModule } from 'rbn-common-lib';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { ChartModule, SharedModule, MessageService } from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts';


import { TopheaderComponent } from './components/topheader/topheader.component';
import { LeftnavService } from './services/leftnav.service';
import { HeaderalertService } from './services/headeralert.service';
import { HeaderuserService } from './services/headeruser.service';
import { AuthModule } from './auth/auth.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';


import { HttpClientModule } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NodeComponent } from './components/node/node.component';
import { ClusterComponent } from './components/cluster/cluster.component';
import { FmModule } from 'fm';
import { FmComponent } from './fm/fm.component';

// I18N
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/', suffix: '.json' },
    { prefix: './assets/i18n/rbn_', suffix: '.json' },
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    TopheaderComponent,
    DashboardComponent,
    NodeComponent,
    ClusterComponent,
    FmComponent,
  ],
  imports: [
    FmModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RbnCommonLibModule,
    BrowserAnimationsModule,
    ButtonModule,
    AccordionModule,
    DialogModule,
    ChartModule,
    SharedModule,
    ChartsModule,
    SplitPaneModule,
    AuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    MessageService,
    { provide: 'LeftnavInterfaceService', useClass: LeftnavService },
    { provide: 'HeaderalertInterfaceService', useClass: HeaderalertService },
    { provide: 'HeaderuserInterfaceService', useClass: HeaderuserService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
