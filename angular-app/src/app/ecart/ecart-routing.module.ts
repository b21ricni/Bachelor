import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcartComponent } from './ecart.component';

const routes: Routes = [
  {
    path: '',
    component: EcartComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcartRoutingModule { }
