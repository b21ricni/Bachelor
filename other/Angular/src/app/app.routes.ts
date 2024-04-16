import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'Cart', component: CartComponent},
  {path: 'Product', component: ProductsComponent},
];
