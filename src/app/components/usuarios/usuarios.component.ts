import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html'

})
export class UsuariosComponent implements OnInit {

    usuarios!: Usuario[];

    constructor(private usuarioService: UsuarioService, public authService: AuthService) { }

    ngOnInit() {
        let page = 0;
        this.usuarioService.getUsuarios(page)
        .pipe(
          tap(response => {
            console.log('UsuariosComponent: tap 3');
           (response.content as Usuario[]).forEach(usuario =>{
            console.log(usuario.nombres);
          });
        })
        ).subscribe(response => this.usuarios = response.content as Usuario[]);
      }

    delete(usuario: Usuario): void{
            
    Swal.fire({
        title: '¿Esta Seguro?',
        text: `¿Seguro que desea eliminar el usuario ${usuario.nombres}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
        }).then((result) => {
        if (result.isConfirmed) {

            this.usuarioService.delete(usuario.idUsuario).subscribe(
            response => {
                this.usuarios = this.usuarios.filter(usu => usu !== usuario)
                Swal.fire(
                'Usuario Eliminado',
                `Usuario ${usuario.nombres} eliminado con exito.`,
                'success'
                )
            }
            )
            
        }
        })
    }

}