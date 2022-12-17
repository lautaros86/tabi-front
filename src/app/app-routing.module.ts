import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {IndexComponent} from "./index/index.component";

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'map',
    loadChildren: () => import('./map/map-routing.module').then(m => m.MapRoutingModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('./charts/charts-routing.module').then(m => m.ChartsRoutingModule)
  },
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
