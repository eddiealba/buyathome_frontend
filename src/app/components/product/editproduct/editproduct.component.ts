import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  product: any[] = [];
  producto: any[] = [];
  
  errorMessage: any;
  
  productupdate = {
    price: parseFloat(''),
    stock: parseInt(''),
    storeAvailable: true,
    deliveryAvailable: true,
  }
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private service: NotificationsService) {
    
    this.activatedRoute.params.subscribe(params => {
      this.producto = [parseInt(params['productId'])]
      console.log(params['productId']);
      console.log(this.producto)
    })

    this.http.get('http://localhost:8080/products/'+this.producto)
    .subscribe((data: any) => {
      this.product = data;
      console.log(this.product);
      console.log(this.producto);
      }
    )

   }

  ngOnInit(): void {
  }
  updateProduct(Message:any,prod: NgForm){
    if(prod.value.storeAvailable === "true")
    {
      if(prod.value.deliveryAvailable === "true")
      {
        
        this.productupdate.price= prod.value.price
        this.productupdate.stock= prod.value.stock
        this.productupdate.storeAvailable= true
        this.productupdate.deliveryAvailable= true
        
        this.http.patch('http://localhost:8080/products/'+this.producto,this.productupdate)
        .subscribe({
          next: (data: any) => {
          this.productupdate = data;
          console.log(this.productupdate);
          this.service.success('Success',Message='producto Editado Correctamente', {
            position: ['botton','right'],
            timeout: 2000,
            animated: 'fade',
            showProgressBar: true
          });
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error.error.error);
              this.service.error('Error',Message='Algunos datos son Incorrectos, o estan con campos vacios', {
                position: ['botton','right'],
                timeout: 2000,
                animated: 'fade',
                showProgressBar: true
              });
          }})
      }
      else{
        this.productupdate.price= prod.value.price
        this.productupdate.stock= prod.value.stock
        this.productupdate.storeAvailable= true
        this.productupdate.deliveryAvailable= false
        
        this.http.patch('http://localhost:8080/products/'+this.producto,this.productupdate)
        .subscribe({
          next: (data: any) => {
          this.productupdate = data;
          console.log(this.productupdate);
          this.service.success('Success',Message='producto Editado Correctamente', {
            position: ['botton','right'],
            timeout: 2000,
            animated: 'fade',
            showProgressBar: true
          });
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error.error.error);
              this.service.error('Error',Message='Algunos datos son Incorrectos, o estan con campos vacios', {
                position: ['botton','right'],
                timeout: 2000,
                animated: 'fade',
                showProgressBar: true
              });
          }})
      }
    }
    else
    {
      if(prod.value.deliveryAvailable === "true")
      {
        this.productupdate.price= prod.value.price
        this.productupdate.stock= prod.value.stock
        this.productupdate.storeAvailable= false
        this.productupdate.deliveryAvailable= true
        
        this.http.patch('http://localhost:8080/products/'+this.producto,this.productupdate)
        .subscribe({
          next: (data: any) => {
          this.productupdate = data;
          console.log(this.productupdate);
          this.service.success('Success',Message='producto Editado Correctamente', {
            position: ['botton','right'],
            timeout: 2000,
            animated: 'fade',
            showProgressBar: true
          });
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error.error.error);
              this.service.error('Error',Message='Algunos datos son Incorrectos, o estan con campos vacios', {
                position: ['botton','right'],
                timeout: 2000,
                animated: 'fade',
                showProgressBar: true
              });
          }})
      }
      else{
        this.productupdate.price= prod.value.price
        this.productupdate.stock= prod.value.stock
        this.productupdate.storeAvailable= false
        this.productupdate.deliveryAvailable= false
        
        
        this.http.patch('http://localhost:8080/products/'+this.producto,this.productupdate)
        .subscribe({
          next: (data: any) => {
          this.productupdate = data;
          console.log(this.productupdate);
          this.service.success('Success',Message='producto Editado Correctamente', {
            position: ['botton','right'],
            timeout: 2000,
            animated: 'fade',
            showProgressBar: true
          });
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error.error.error);
              this.service.error('Error',Message='Algunos datos son Incorrectos, o estan con campos vacios', {
                position: ['botton','right'],
                timeout: 2000,
                animated: 'fade',
                showProgressBar: true
              });
          }})
      }
    }
  }

}
