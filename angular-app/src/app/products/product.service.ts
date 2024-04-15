import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost/Bachelor/angular-app/'; 

  constructor(private http: HttpClient) {}

  getProducts(searchWord: string): Observable<any> {
    const params = new HttpParams().set('searchWord', searchWord);

    return this.http.get(this.baseUrl + "php/getProducts.php", {params});
  }
}