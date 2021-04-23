import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private modal:NgbModal) { }
  
  ngOnInit(): void {
  }

openSM(contenido: any){
  this.modal.open(contenido,{size:'sm'});
}

openLG(contenido: any){
  this.modal.open(contenido,{size:'lg'});
}

openXL(contenido: any){
  this.modal.open(contenido,{size:'xl'});
}

openCentrado(contenido: any){
  this.modal.open(contenido,{centered:true});
}

openScroll(contenido: any){
  this.modal.open(contenido,{scrollable:true});
}

openBackground(contenido: any){
  this.modal.open(contenido,{backdropClass:'azul'});
}

openWindow(contenido: any){
  this.modal.open(contenido,{windowClass:'oscuro'});
}

}