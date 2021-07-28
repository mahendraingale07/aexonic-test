import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'ngx-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems:any=[]
  amount:any=[];

  constructor(private commonService: CommonService,) { }

  ngOnInit(): void {
    this.cartItems = this.commonService.getCartProducts()
    this.cartItems.forEach((element, i) => {
      this.cartItems[i].count = 1
      this.cartItems[i].total = element.price
    });
    this.calculate()
  }
  addOne(i){
    this.cartItems[i].count = this.cartItems[i].count + 1
    this.cartItems[i].total = this.cartItems[i].price * this.cartItems[i].count
    this.calculate()
  }

  minusOne(i){
    this.cartItems[i].count = this.cartItems[i].count - 1
    this.cartItems[i].total = this.cartItems[i].price * this.cartItems[i].count
    this.calculate()
  }

  remove(index){
    this.cartItems.splice(index, 1);
    this.commonService.setCartProducts(this.cartItems)
    this.calculate()
  }

  calculate(){
    let total:number=0;
    this.amount.discount = 0
    this.amount = {}
    this.cartItems.forEach((element, i) => {
      total = total + this.cartItems[i].total
    });
    this.amount.total = total;
    if(total <= 100){
      this.amount.discount = 0
    }else if(total > 100 && total <= 500){
      this.amount.discount = (total/100)*10;
    }else if(total > 500){
      this.amount.discount = (total/100)*20;
    }
    this.amount.amountToPay = this.amount.total - this.amount.discount
  }

}
