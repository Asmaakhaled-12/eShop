import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes =
[
  {path:'',redirectTo:"login",pathMatch:"full"},
  {path: 'login',loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
  {path:'',component:LayoutComponent,children:
  [
    {path: 'products',loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
