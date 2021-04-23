import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {

  constructor(private modal:NgbModal) { }
  

  ngOnInit(): void {
  }
openSM(contenido: any){
  this.modal.open(contenido,{size:'sm'});
}
}