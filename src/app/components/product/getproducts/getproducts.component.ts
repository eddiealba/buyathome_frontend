import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-getproducts',
  templateUrl: './getproducts.component.html',
  styleUrls: ['./getproducts.component.css']
})
export class GetproductsComponent implements OnInit {

  product: any[] = [];
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/products')
    .subscribe((data: any) => {
      this.product = data;
      console.log(this.product);
      }
    )

   }

  ngOnInit(): void {
  }

}
