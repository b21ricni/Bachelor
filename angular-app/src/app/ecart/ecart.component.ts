import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ecart',
  templateUrl: './ecart.component.html',
  styleUrl: './ecart.component.css'
})
export class EcartComponent implements OnInit{
  products: any[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): void {
    const getCartProducts = 'http://localhost/Bachelor/angular-app/php/getCart.php';

  

    this.http.get(getCartProducts).subscribe(
      (response: any) => {
        this.products = response;
      }
    );
  }
  
  ngOnInit() {
    this.getProducts();
  }

  deleteCartProduct(ID: string): void{
    const deleteCartProduct = 'http://localhost/Bachelor/angular-app/php/deleteCartProduct.php';
    
    const requestData = {
      ID    
    };

    this.http.post(deleteCartProduct, requestData).subscribe(
      () => {
        this.getProducts();
      },
    );
  }
}
