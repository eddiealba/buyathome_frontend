import { Injectable } from '@angular/core';
import {Cliente} from './cliente';
import { Observable, of, throwError} from 'rxjs';
import { HttpClient,  HttpHeaders} from '@angular/common/http'
import {map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';


@Injectable()
export class ClienteService {
  private urlEndPoint:string ='http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient,private router:Router, private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
        return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
} 

private isNoAutorizado(e: { status: number; }): boolean{
    if(e.status==401 || e.status==403){
        this.router.navigate(['/loginadmin'])
        return true;
    }
    return false;
}

  getClientes(): Observable<Cliente[]>{
    
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  delete(idCliente: number): Observable<Cliente>{
      return this.http.delete<Cliente>(`${this.urlEndPoint}/${idCliente}`, {headers: this.agregarAuthorizationHeader()}).pipe(
          catchError(e => {

            if(this.isNoAutorizado(e)){
              return throwError(e);
            }
              console.error(e.error.mensaje);
              swal.fire('error al eliminar cliente', e.error.error, 'error');
              return throwError(e);
          })
      );    
  }

}