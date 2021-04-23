import { Injectable } from '@angular/core';
import {Cliente} from './cliente';
import { Observable, of, throwError} from 'rxjs';
import { HttpClient,  HttpHeaders} from '@angular/common/http'
import {map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';




@Injectable()
export class ClienteService {
  private urlEndPoint:string ='http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  delete(idCliente: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${idCliente}`, {headers: this.httpHeaders}).pipe(
        catchError(e => {
            console.error(e.error.mensaje);
            swal.fire('error al eliminar cliente', e.error.error, 'error');
            return throwError(e);
        })
    );    
}

}