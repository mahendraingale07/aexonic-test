import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // API path
  url = 'https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7';

  constructor(private http: HttpClient) { }

  //Get Products
  getProducts() {
    return this.http
      .get(this.url)
      .pipe(map((results) => results));
  }
}
