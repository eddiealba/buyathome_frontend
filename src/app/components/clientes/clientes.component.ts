import { AuthService } from './../usuarios/auth.service';
import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'

})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];
  paginador: any;

  constructor(private clienteService: ClienteService, public authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
    let page: number = +params.get('page');

    if (!page){
      page =0;
    }

    this.clienteService.getClientes(page)
    .pipe(
      tap(response => {
        console.log('ClientesComponent: tap 3');
       (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombres));
    })
    ).subscribe(response => {
      this.clientes = response.content as Cliente[];
      this.paginador = response;
    });
  });
}

  delete(cliente: Cliente): void{
            
    Swal.fire({
        title: '¿Esta Seguro?',
        text: `¿Seguro que desea eliminar el usuario ${cliente.nombres}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
        }).then((result) => {
        if (result.isConfirmed) {

            this.clienteService.delete(cliente.idCliente).subscribe(
            response => {
                this.clientes = this.clientes.filter(cli => cli !== cliente)
                Swal.fire(
                'Usuario Eliminado',
                `Usuario ${cliente.nombres} eliminado con exito.`,
                'success'
                )
            }
            )
            
        }
        })
    }

}