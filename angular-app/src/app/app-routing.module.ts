import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'ecart', loadChildren: () => import('./ecart/ecart.module').then(m => m.EcartModule) }, { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }, { path: 'landingpage', loadChildren: () => import('./landingpage/landingpage.module').then(m => m.LandingpageModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
