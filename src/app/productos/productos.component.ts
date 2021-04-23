import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import Swal from 'sweetalert2';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {
  productos!: Producto[]
  paginadorp: any;

  constructor(private productoService: ProductoService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe (params =>{
      let page: number = +params.get('page'); 
      if(!page){
        page=0;
      }
    this.productoService.getProducto(page).subscribe(
      response => {
        this.productos = response.content as Producto[]; 
        this.paginadorp= response;
      });
    });
  }

  delete(producto: Producto): void{
            
    Swal.fire({
      title: '¿Esta Seguro?',
      text: `¿Seguro que desea eliminar el producto ${producto.productName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
      }).then((result) => {
      if (result.isConfirmed) {

        this.productoService.delete(producto.productId).subscribe(
          response => {
            this.productos = this.productos.filter(vou => vou !== producto)
            Swal.fire(
              'Comprobante Eliminado',
              `Comprobante ${producto.productName} eliminado con exito.`,
              'success'
            )
          }
        )
        
      }
    })
  }
}
