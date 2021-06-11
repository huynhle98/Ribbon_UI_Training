import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RibbonLibComponent } from './ribbon-lib.component';
import { LoadingOverComponent } from './components/loading-over/loading-over.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [RibbonLibComponent, LoadingOverComponent],
  imports: [
    ProgressSpinnerModule
  ],
  exports: [RibbonLibComponent, LoadingOverComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RibbonLibModule { }
