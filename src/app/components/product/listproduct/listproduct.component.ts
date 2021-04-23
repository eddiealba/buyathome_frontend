import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  product: any[] = [];
  category: any[] = [];
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/products')
    .subscribe((data: any) => {
      this.product = data;
      console.log(this.product);
      }
    )

    this.http.get('http://localhost:8080/products/category')
      .subscribe((data: any) => {
        
      this.category = data;
      console.log(this.category);
      }
    )

   }

  ngOnInit(): void {
  }

}
