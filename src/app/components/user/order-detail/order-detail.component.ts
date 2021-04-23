import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: any[] = [];
  orde: any[] = [];
  user: any[] = [];
  orderId: any[] = [];

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      this.user = (params['userId'])
      this.orderId = (params['orderId'])
      console.log(params['userId']);
      console.log(params['orderId']);
    })

    this.http.get('http://localhost:8080/users/' + this.user + '/orders/' + this.orderId)
    .subscribe((data: any) => {
      this.order = data;
      this.orde[0] = data[0];
      console.log(this.order);
      console.log(this.orde);
      }
    )

   }

  ngOnInit(): void {
  }

}