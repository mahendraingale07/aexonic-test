import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'ngx-products',
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {

  private alive = true;

  products: any = [];
  count: number = 0;

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private commonService: CommonService,
  ) {    
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.apiService.getProducts().subscribe(
      (response: any) => {
        this.products = response;

        //If already cart has some items then,
        let cartItem : any = []
        cartItem = this.commonService.getCartProducts()
        if(cartItem.length > 0){
          this.products.forEach((element1, i1) => {
            cartItem.forEach((element2, i2) => {
              if(element1.id == element2.id){
                this.products[i1].isCart = true;
              }
            });
          });
        }
      });
  }

  addToCart(index) {
    this.products[index].isCart = true;
    this.count = this.count + 1;
  }

  removeFromCart(index) {
    this.products[index].isCart = false;
    this.count = this.count - 1;
  }

  openCart() {
    let temp:any=[]
    this.products.forEach(element => {
      if(element.isCart){
        temp.push(element)
      }
    });  
    this.commonService.setProducts(this.products); 
    this.commonService.setCartProducts(temp); 
    this.router.navigate(['pages/cart']);
  }

}
