import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RibbonLibComponent } from './ribbon-lib.component';
import { LoadingOverComponent } from './components/loading-over/loading-over.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HomeIcoComponent } from './components/icons/home-ico/home-ico.component';
import { ShoppingCartIcoComponent } from './components/icons/shopping-cart-ico/shopping-cart-ico.component';

@NgModule({
  declarations: [
    RibbonLibComponent,
    LoadingOverComponent,
    HomeIcoComponent,
    ShoppingCartIcoComponent
  ],
  imports: [
    // ProgressSpinnerModule
  ],
  exports: [
    RibbonLibComponent,
    LoadingOverComponent,
    HomeIcoComponent,
    ShoppingCartIcoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RibbonLibModule { }
