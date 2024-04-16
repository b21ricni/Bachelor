import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent{
  searchWord!: string;
  products: any[] = [];
  

  constructor(private http: HttpClient) {}

  searchProducts(): void {
    const getSearchWord = 'http://localhost/Bachelor/angular-app/php/getProducts.php';

    const requestData = {
      searchWord: this.searchWord
    };

    this.http.post(getSearchWord, requestData).subscribe(
      (response: any) => {
        this.products = response;
      }
    );
  }
  
  addCartProduct(ID: string): void{
    const addCartProduct = 'http://localhost/Bachelor/angular-app/php/addCartProduct.php';
    
    const requestData = {
      ID    
    };

    this.http.post(addCartProduct, requestData).subscribe();
  }
}