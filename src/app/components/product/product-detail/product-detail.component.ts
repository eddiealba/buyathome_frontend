import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationsService} from 'angular2-notifications';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any[] = [];
  productId: any[] = [];
  cartTotal: any[] = [];
  cart: any[] = [];

  toCartAdd = {
    qtty: parseInt(''),
    cartId: 0,
    productId: '',

  }
  errorMessage: any;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,private service:NotificationsService) { 

    this.activatedRoute.params.subscribe(params => {
      this.productId = [parseInt(params['productId'])]
      console.log(params['productId']);
      console.log(this.productId)
    })

    this.http.get('http://localhost:8080/products/detail/' + this.productId)
    .subscribe((data: any) => {
      this.product = data;
      console.log(this.product[0]);
      }
    )
  
    this.http.get('http://localhost:8080/cart')
    .subscribe((data: any) => {
      this.cartTotal = data;
      console.log(this.cartTotal);
      }
    )
  
  }
  
  


  ngOnInit(): void {
  }

  addToCart(Message:any, toCart: NgForm ){

    console.log(toCart)
    this.toCartAdd.qtty = parseInt(toCart.value.qtty);
    this.toCartAdd.productId = this.productId[0];
    this.toCartAdd.cartId = this.cartTotal[0].cartId;
    console.log(this.toCartAdd)

    this.http.post('http://localhost:8080/cartDetail', this.toCartAdd)
      
      .subscribe({
        next: (data: any) => {
          this.toCartAdd = data;
          console.log(this.toCartAdd);
        this.service.success('Success',Message='producto agregado al Carrito Correctamente', {
          position: ['botton','right'],
          timeout: 2000,
          animated: 'fade',
          showProgressBar: true
        });
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error.error.error);
            this.service.error('Error',Message='El producto no fue agregado, puede que el producto ya exista en su carrito o la cantidad escogida no es valida', {
              position: ['botton','right'],
              timeout: 2000,
              animated: 'fade',
              showProgressBar: true
            });
        }})
      

  }

}
