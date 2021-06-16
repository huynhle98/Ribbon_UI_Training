import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { RibbonLibComponent } from './ribbon-lib.component';
import { LoadingOverComponent } from './components/loading-over/loading-over.component';
import { HomeIcoComponent } from './components/icons/home-ico/home-ico.component';
import { ShoppingCartIcoComponent } from './components/icons/shopping-cart-ico/shopping-cart-ico.component';
import { ApiHelperService } from './service/api-helper/api-helper.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RibbonLibComponent,
    LoadingOverComponent,
    HomeIcoComponent,
    ShoppingCartIcoComponent
  ],
  imports: [
    HttpClientModule
    // ProgressSpinnerModule
  ],
  exports: [
    RibbonLibComponent,
    LoadingOverComponent,
    HomeIcoComponent,
    ShoppingCartIcoComponent
  ],
  providers: [
    ApiHelperService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RibbonLibModule {
  // static forRoot(): ModuleWithProviders<RibbonLibModule> {
  //   return {
  //     ngModule: RibbonLibModule,
  //     providers: [ApiHelperService]
  //   };
  // }
}
