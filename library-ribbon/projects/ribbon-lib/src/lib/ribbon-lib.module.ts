import { NgModule } from '@angular/core';
import { RibbonLibComponent } from './ribbon-lib.component';
import { LoadingOverComponent } from './components/loading-over/loading-over.component';



@NgModule({
  declarations: [RibbonLibComponent, LoadingOverComponent],
  imports: [
  ],
  exports: [RibbonLibComponent]
})
export class RibbonLibModule { }
