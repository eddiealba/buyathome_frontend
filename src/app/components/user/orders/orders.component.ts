import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  order: any[] = [];
  user: any[] = [];

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {


    this.activatedRoute.params.subscribe(params => {
      this.user = [parseInt(params['id'])]
      console.log(params['id']);
      console.log(this.user)
    })

    this.http.get('http://localhost:8080/users/' + this.user + '/orders')
    .subscribe((data: any) => {
      this.order = data;
      console.log(this.order);
      }
    )

   }

  ngOnInit(): void {
  }
}
