import { Component, OnInit } from '@angular/core'
import { Usuario } from './usuario'
import {UsuarioService} from './usuario.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

    usuario: Usuario = new Usuario()

    

    constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        
    }

    create(): void{ 
        this.usuarioService.create(this.usuario)
        .subscribe(json => {
                this.router.navigate(['/usuarios'])
                swal.fire('Nuevo Usuario', `${json.mensaje} `, 'success') 
        },
        err => {
            console.error('Codigo de error desde el backend: '+err.error.errors);
            console.error(err.error.errors);
        }
        );
    }



}