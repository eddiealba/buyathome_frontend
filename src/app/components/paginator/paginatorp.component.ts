import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'paginatorp-nav',
    templateUrl: './paginatorp.component.html'
    
  })
  export class PaginatorpComponent implements OnInit {
    @Input() paginadorp: any;

   paginasp!: number[];
    constructor(){ }

    ngOnInit(){
      this.paginasp = new Array(this.paginadorp.totalPages).fill(0).map((_valor, indice)=> indice+1);
    }
  }