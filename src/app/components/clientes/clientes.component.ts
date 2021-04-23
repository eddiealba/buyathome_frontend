import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'

})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
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