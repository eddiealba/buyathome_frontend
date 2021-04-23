import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Voucher} from './voucher';
import { VoucherService } from './voucher.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listvoucher',
  templateUrl: './listvoucher.component.html'
  
})
export class ListvoucherComponent implements OnInit {

  vouchers!: Voucher[];

  constructor(private voucherService: VoucherService) { }

  ngOnInit(): void {
    this.voucherService.getVocuher().subscribe(
      vouchers => this.vouchers = vouchers
    );
  }

  delete(voucher: Voucher): void{
            
    Swal.fire({
      title: '¿Esta Seguro?',
      text: `¿Seguro que desea eliminar el comprobante ${voucher.voucherId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
      }).then((result) => {
      if (result.isConfirmed) {

        this.voucherService.delete(voucher.voucherId).subscribe(
          response => {
            this.vouchers = this.vouchers.filter(vou => vou !== voucher)
            Swal.fire(
              'Comprobante Eliminado',
              `Comprobante ${voucher.voucherId} eliminado con exito.`,
              'success'
            )
          }
        )
        
      }
    })
      }

}
