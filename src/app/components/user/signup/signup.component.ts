import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { NotificationsService} from 'angular2-notifications';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup= {
    correo: '',
    password: '',
    estado: parseInt(''),
    nombres: '',
    apellidos: '',
    fechaNacimiento: Date,
    telefono: parseInt(''),
    direccion: ''
  }
  errorMessage: any;

  alert = false;
  //modal: any[] = [];

  constructor( private http: HttpClient, private router: Router,private service: NotificationsService ) {
  }

  ngOnInit(): void {
    console.log(this.alert)
  }

  signUpUser(Message:any,user: NgForm) {

    if (user.invalid || user.value.password!==user.value.password_confirm) {
      Object.values(user.controls).forEach(control => {
        control.markAsTouched();
      })
      this.alert = true;
      console.log(this.alert)
    } else {
      this.alert = false;
      console.log(this.alert)
      this.signup.correo = user.value.correo;
      this.signup.password = user.value.password;
      this.signup.estado = 1;
      this.signup.nombres = user.value.nombres;
      this.signup.apellidos = user.value.apellidos;
      this.signup.password = user.value.password;
      this.signup.fechaNacimiento= user.value.fechaNacimiento
      this.signup.telefono = user.value.telefono;
      this.signup.direccion = user.value.direccion;

      console.log(this.signup);
      console.log(user)
      console.log(this.alert)

    this.http.post('http://localhost:8080/api/clientes',this.signup)
          .subscribe({
            next: (data: any) => {
              this.signup = data;
              console.log(this.signup);
            this.service.success('Success',Message='Usuario Creado Correctamente', {
              position: ['botton','right'],
              timeout: 2000,
              animated: 'fade',
              showProgressBar: true
            });
            },
            error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error.error.error);
              this.service.error('Error',Message='El correo que ingreso ya esta en uso', {
                position: ['botton','right'],
                timeout: 2000,
                animated: 'fade',
                showProgressBar: true
              });
          }
            })
      
          
    }    
  }
}
