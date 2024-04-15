import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent{
  searchWord!: string;

  constructor(private http: HttpClient) {}

  searchProducts(): void {
    const getSearchWord = 'http://localhost/Bachelor/angular-app/php/getProducts.php';

    const requestData = {
      searchWord: this.searchWord,
    };

    this.http.post(getSearchWord, requestData).subscribe(
      (response) => {
        console.log('Response from PHP:', response);
      },
      (error) => {
        console.error('Error sending data to PHP:', error);
      }
    );
  }
}