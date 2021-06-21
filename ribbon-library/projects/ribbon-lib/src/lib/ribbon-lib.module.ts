import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { RibbonLibComponent } from './ribbon-lib.component';
import { LoadingOverComponent } from './components/loading-over/loading-over.component';
import { HomeIcoComponent } from './components/icons/home-ico/home-ico.component';
import { ShoppingCartIcoComponent } from './components/icons/shopping-cart-ico/shopping-cart-ico.component';
import { ApiHelperService } from './service/api-helper/api-helper.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './components/button/button.component';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './components/cart/cart.component';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    RibbonLibComponent,
    LoadingOverComponent,
    HomeIcoComponent,
    ShoppingCartIcoComponent,
    ButtonComponent,
    CartComponent,
    TestComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    // ProgressSpinnerModule
  ],
  exports: [
    RibbonLibComponent,
    LoadingOverComponent,
    HomeIcoComponent,
    ShoppingCartIcoComponent,
    ButtonComponent,
    CartComponent
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
