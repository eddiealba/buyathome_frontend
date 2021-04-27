import { Router } from '@angular/router';
import { AuthService } from './../components/usuarios/auth.service';
import { Usuario } from './../components/usuarios/usuario';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';


@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {

  titulo:string = 'Inicio de sesion';
  usuario:Usuario ;

  constructor(private authService: AuthService, private router:Router) { 
    this.usuario = new Usuario();
  }
  

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal.fire('Login',`Usuario ${this.authService.usuario.username} ya esta autenticado`, 'info');
      this.router.navigate(['/homeadmin']);
    }
  }

  login():void{
    console.log(this.usuario);
    if(this.usuario.username==null || this.usuario.password == null){
      swal.fire('Error Login', 'Usuario o password vacios', 'error')
      return;
    }

    this.authService.login(this.usuario).subscribe(response =>{
      console.log(response);
      /*let payload =JSON.parse(atob(response.access_token.split(".")[1]));
      console.log(payload);*/

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/homeadmin']);
      swal.fire('Login',`Hola ${usuario.username}, has iniciado sesion con exito`, 'success');
    },err => {
      if (err.status == 400){
        swal.fire('Error Login', 'Usuario o password incorrectos', 'error')
      }
    }
    );
  }

}