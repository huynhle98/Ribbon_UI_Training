import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from '../components/heroes/heroes.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { NotFoundPageComponent } from '../components/not-found-page/not-found-page.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { SkinsComponent } from '../components/skins/skins.component';
import { ChartComponent } from '../components/chart/chart.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: '/skins', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'heroes', component: HeroesComponent },
      { path: 'detail/:id', component: HeroDetailComponent },
      { path: 'skins', component: SkinsComponent },
      { path: 'chart', component: ChartComponent },
  ] },

  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
