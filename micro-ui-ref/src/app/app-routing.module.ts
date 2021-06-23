import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewsComponent } from './views/views.component';

const routes: Routes = [
    
    { path: '', component: DashboardComponent },    
    { path: 'dashboard', component: DashboardComponent },
    { path: 'views', component: ViewsComponent },
    { path: '**', redirectTo: 'dashboard' } // default
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
