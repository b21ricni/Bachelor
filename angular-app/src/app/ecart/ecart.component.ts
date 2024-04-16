import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ecart',
  templateUrl: './ecart.component.html',
  styleUrl: './ecart.component.css'
})
export class EcartComponent implements OnInit{
  searchWord!: string;
  products: any[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): void {
    const getSearchWord = 'http://localhost/Bachelor/angular-app/php/getCart.php';

  

    this.http.get(getSearchWord).subscribe(
      (response: any) => {
        this.products = response;
      },
      (error) => {
        console.error('Error sending data to PHP:', error);
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
      (response: any) => {
        console.log('Product removed from cart:', response);
        this.getProducts();
      },
      (error) => {
        console.error('Error sending data to PHP:', error);
      }
    );
  }
}
