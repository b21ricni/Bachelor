import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcartRoutingModule } from './ecart-routing.module';
import { EcartComponent } from './ecart.component';


@NgModule({
  declarations: [
    EcartComponent
  ],
  imports: [
    CommonModule,
    EcartRoutingModule
  ]
})
export class EcartModule { }
