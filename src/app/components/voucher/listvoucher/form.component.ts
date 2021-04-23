import { Component, OnInit } from '@angular/core'
import { Voucher } from './voucher'
import {VoucherService} from './voucher.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

    voucher: Voucher = new Voucher()
    

    constructor(private voucherService: VoucherService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.cargarVoucher()
    }

    cargarVoucher(): void{
        this.activatedRoute.params.subscribe(params =>{
            let voucherId = params ['voucherId']
            if(voucherId){
                this.voucherService.getVoucher(voucherId).subscribe( (voucher) => this.voucher = voucher)
            }
        })
    }

    create(): void{
        this.voucherService.create(this.voucher)
        .subscribe(voucher => {
                this.router.navigate(['/voucher/listvoucher'])
                swal.fire('Nuevo Comprobante', `Comprobante # ${voucher.voucherId} creado con exito`, 'success') 
        }
        );
    }

    /*update(): void{
        this.voucherService.update(this.voucher)
        .subscribe( voucher => {
            this.router.navigate(['/voucher/listvoucher'])
            swal.fire('Comprobante Actualizado', `Comprobante # ${voucher.voucherId} actualizado con exito`, 'success') 
        }

        )
    }*/

}
