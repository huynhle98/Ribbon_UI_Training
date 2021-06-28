import { AuthGuard } from './auth/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NodeComponent } from './components/node/node.component';
import { ClusterComponent } from './components/cluster/cluster.component';
import { FmComponent } from './fm/fm.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'node', component: NodeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cluster', component: ClusterComponent, canActivate: [AuthGuard]
  },
  {
    path: 'fm', component: FmComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
