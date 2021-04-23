import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  producto!: Producto;

  constructor(private productoService:ProductoService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    
  }

}
