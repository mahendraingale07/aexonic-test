import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    products;
    cartProducts;

    constructor() { }

    //Set Products
    setProducts(data) {
        this.products = data;
    }

    //Get Products
    getProducts() {
        return this.products;
    }

    //Set Cart Products
    setCartProducts(data) {
        this.cartProducts = data;
    }

    //Get Cart Products
    getCartProducts() {
        return this.cartProducts;
    }
}
