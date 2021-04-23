import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: any[] = [];
  user: any[] = [];
  users: any[] = [];

  constructor(private http: HttpClient, private _userService: UserService, private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.params.subscribe(params => {
      this.userId = [parseInt(params['id'])]
      console.log(params['id']);
      console.log(this.user)
    })

    this.http.get('http://localhost:8080/users/' + this.userId)
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
        console.log(this.userId)
        }
      ) 
   }
  
  ngOnInit(): void {

    this.users = this._userService.getUsers();
    console.log(this.users)

  }

}
