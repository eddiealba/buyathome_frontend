import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: any[] = [];
  userId: any[] = [];

  alert = false;

  userUpdate = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    neighbourId: 0,
    street: '',
    number: '',
    reference: ''
  }

  neighbourData: any[] = [];

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.params.subscribe(params => {
      this.userId = [parseInt(params['id'])]
      console.log(params['id']);
      console.log(this.userId)
    })

    this.http.get('http://localhost:8080/users/'+ this.userId)
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
        }
    ) 
    
    this.http.get('http://localhost:8080/neighbour')
      .subscribe((data: any) => {
        this.neighbourData = data;
        this.neighbourData.unshift({
          neighbourId: '',
          name: '[Seleccione una zona]'
        })
        console.log(this.neighbourData);
        }
      )

   }

  ngOnInit(): void {
  }

  editUser(edit: NgForm) {

    if (edit.invalid) {
      Object.values(edit.controls).forEach(control => {
        control.markAsTouched();
      })
      this.alert = true;
      console.log(this.alert)
    } else {
      this.alert = false;
      this.userUpdate.firstname = edit.value.firstname;
      this.userUpdate.lastname = edit.value.lastname;
      this.userUpdate.phone = edit.value.phone;
      this.userUpdate.email = edit.value.email;
      this.userUpdate.neighbourId = parseInt(edit.value.neighbour);
      this.userUpdate.street = edit.value.street;
      this.userUpdate.number = edit.value.number;
      this.userUpdate.reference = edit.value.reference;
      console.log(this.userUpdate)
      
      this.http.patch(' http://localhost:8080/users/edit/1',this.userUpdate)
      .subscribe((data: any) => {
        this.userUpdate = data;
        console.log(this.userUpdate);
      })
      }
    
  }
}
