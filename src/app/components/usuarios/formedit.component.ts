import { Component, OnInit } from '@angular/core'
import { Usuario } from './usuario'
import {UsuarioService} from './usuario.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'


@Component({
    selector: 'app-form',
    templateUrl: './formedit.component.html'
})
export class FormeditComponent implements OnInit {

    usuario: Usuario = new Usuario()
    

    constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.cargarUsuario()
    }

    cargarUsuario(): void{
        this.activatedRoute.params.subscribe(params =>{
            let idUsuario = params ['idUsuario']
            if(idUsuario){
                this.usuarioService.getUsuario(idUsuario).subscribe( (usuario) => this.usuario = usuario)
            }
        })
    }

    update(): void{
        this.usuarioService.update(this.usuario)
        .subscribe( json => {
            this.router.navigate(['/usuarios'])
            swal.fire('Usuario Actualizado', `${json.mensaje}`, 'success') 
        },
        err => {
            console.error('Codigo de error desde el backend: '+err.error.errors);
            console.error(err.error.errors);
        }

        )
    }

}