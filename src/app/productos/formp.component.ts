import { Component, OnInit } from '@angular/core'
import { Producto } from './producto'
import {ProductoService} from './producto.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'


@Component({
    selector: 'app-form',
    templateUrl: './formp.component.html'
})
export class FormpComponent implements OnInit {

    producto: Producto = new Producto()

    

    constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
       
    }

    create(): void{
        this.productoService.create(this.producto)
        .subscribe(json => {
                this.router.navigate(['/productos'])
                swal.fire('Nuevo Producto', `${json.mensaje} # ${json.producto.productName}`, 'success') 
        },
        err => {
            console.error('Codigo de error desde el backend: '+err.error.errors);
            console.error(err.error.errors);
        }
        );
    }

   

}
