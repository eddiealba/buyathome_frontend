import { ModalService } from './modal.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  producto!: Producto;
  public fotoSeleccionada!: File;
  progreso: number =0;

  constructor(private productoService:ProductoService, 
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let productId: number = +params.get('productId'); 

      if (productId){
         this.productoService.getProduct(productId).subscribe(producto => {
        this.producto = producto;
      });
    }
  });
      
      
  }
  seleccionarFoto(event:any){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') <0){
      swal.fire('Error seleccionar imagen ', 'El archivo debe ser del tipo imagen', 'error') 
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal.fire('Error al subir imagen ', 'Se debe seleccionar un formato apto de imagen', 'error') 

    } else{
    this.productoService.subirFoto(this.fotoSeleccionada, this.producto.productId)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      } else if(event.type === HttpEventType.Response){
        let response: any = event.body;
        this.producto = response.producto as Producto;
        swal.fire('La imagen se subio', `La imagen del producto: ${this.producto.productName} se subio con exito `, 'success') 

        }

      });
    }
  }
  
}