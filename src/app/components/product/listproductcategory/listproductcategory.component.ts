import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listproductcategory',
  templateUrl: './listproductcategory.component.html',
  styleUrls: ['./listproductcategory.component.css']
})
export class ListproductcategoryComponent implements OnInit {

  product: any[] = [];
  categoryId: any[] = [];
  category: any[] = [];
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = [parseInt(params['id'])]
      console.log(params['id']);
      console.log(this.categoryId)
      
    })
    
    this.http.get('http://localhost:8080/products/category/' + this.categoryId)
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

  refresh(){
    window.location.reload();
  }
}
