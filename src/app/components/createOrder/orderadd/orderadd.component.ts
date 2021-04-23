import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-orderadd',
  templateUrl: './orderadd.component.html',
  styleUrls: ['./orderadd.component.css']
})
export class OrderaddComponent implements OnInit {

  Order= {
    addressId: parseInt(''),
    userId: parseInt(''),
    cartId: parseInt(''),
    deliveryId: parseInt(''),
    date: Date,
    status: parseInt(''),
    state: parseInt('')
  }
  

  constructor(private http:HttpClient) { 
      
  }

  ngOnInit(): void {
  }

  createOrder(ord: NgForm){
    this.Order.addressId= ord.value.addressId
    this.Order.userId= ord.value.userId
    this.Order.cartId= ord.value.cartId
    this.Order.deliveryId= ord.value.deliveryId
    this.Order.date= ord.value.date
    this.Order.status=ord.value.status
    this.Order.state=ord.value.state

    
    this.http.post('http://localhost:8080/orders/order',this.Order)
    .subscribe((data: any) => {
      this.Order = data;
      console.log(this.Order);
    })
  }
 

}
