import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
    Payment= {
      firstname: '',
      lastname: '',
      cardNumber: parseInt(''),
      securityCode: parseInt(''),
      dateExpire: Date
    }
    constructor(private http:HttpClient) { 
      
    }
  ngOnInit(): void {
  }

  createPayment(paym: NgForm){
        this.Payment.firstname= paym.value.fisrtname
        this.Payment.lastname= paym.value.lastname
        this.Payment.cardNumber= paym.value.cardNumber
        this.Payment.securityCode= paym.value.securityCode
        this.Payment.dateExpire= paym.value.dateExpire
    
        
        this.http.post('http://localhost:8080/payment',this.Payment)
        .subscribe((data: any) => {
          this.Payment = data;
          console.log(this.Payment);
        })
      }
     

}
