import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../components/layout/layout.component';
import { DirectiveComponent } from '../components/directive/directive.component';
import { LibraryComponent } from '../components/library/library.component';
import { FormComponent } from '../components/form/form.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      // { path: '', redirectTo: '/skins', pathMatch: 'full'},
      { path: 'directive', component: DirectiveComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'form', component: FormComponent }
  ] },

  // { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
