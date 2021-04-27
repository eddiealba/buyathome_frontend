import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html'

})
export class UsuariosComponent implements OnInit {

    usuarios!: Usuario[];

    constructor(private usuarioService: UsuarioService, public authService: AuthService) { }

    ngOnInit(): void {
        this.usuarioService.getUsuarios().subscribe(
        usuarios => this.usuarios = usuarios
    );
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