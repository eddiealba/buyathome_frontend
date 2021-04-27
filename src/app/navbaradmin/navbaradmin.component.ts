import { Router } from '@angular/router';
import  swal  from 'sweetalert2';
import { AuthService } from './../components/usuarios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbaradmin',
  templateUrl: './navbaradmin.component.html',
})
export class NavbaradminComponent implements OnInit {


  ngOnInit(): void {
  }

  constructor(public authService:AuthService, private router: Router){}
  
  logout():void{
      let username = this.authService.usuario.username;
      this.authService.logout();
      swal.fire('Logout', `Usuario ${username}, cerro sesion`, 'success')
      this.router.navigate(['/loginadmin']);
    }
  

}
