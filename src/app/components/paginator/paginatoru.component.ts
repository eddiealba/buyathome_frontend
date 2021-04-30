import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginatoru-nav',
  templateUrl: './paginatoru.component.html'
})
export class PaginatoruComponent implements OnInit {

  @Input() paginadoru: any;

  paginas!: number[];

  constructor() { }

  ngOnInit(): void {
    this.paginas = new Array(this.paginadoru.totalPages).fill(0).map((_valor, indice)=> indice+1);
  }

}
