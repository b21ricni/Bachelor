import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-ecart',
  templateUrl: './ecart.component.html',
  styleUrl: './ecart.component.css'
})
export class EcartComponent implements OnInit{
  products: any[] = [];

  constructor(private productService: ProductService) {}

  getProducts(): void {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }
  ngOnInit() {
    this.getProducts();
  }
}
