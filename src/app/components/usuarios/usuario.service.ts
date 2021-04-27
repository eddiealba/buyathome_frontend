import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {Usuario} from './usuario';
import { of,Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import {map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';



@Injectable()
export class UsuarioService {
    private urlEndPoint:string ='http://localhost:8080/api/usuarios';

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient,private router:Router, private authService: AuthService) { }

    
    private agregarAuthorizationHeader(){
        let token = this.authService.token;
        if(token!=null){
            return this.httpHeaders.append('Authorization', 'Bearer '+ token);
        }
        return this.httpHeaders;
    } 

    private isNoAutorizado(e: { status: number; }): boolean{
        if(e.status==401){

            if(this.authService.isAuthenticated()){
                this.authService.logout();
              } 
              
            this.router.navigate(['/loginadmin'])
            return true;
        }
    
        if(e.status==403){
          swal.fire('Acceso denegado', `Usuario ${this.authService.usuario.username} no tiene acceso`, 'warning');
          this.router.navigate(['/homeadmin'])
          return true;
      }
        return false;
    }

    getUsuarios(): Observable<Usuario[]>{
        //return this.http.get<Usuario[]>(this.urlEndPoint);
        return this.http.get(this.urlEndPoint).pipe(
        map(response => response as Usuario[])
        );
    }

    create(usuario: Usuario) : Observable<any> {
        return this.http.post<any>(this.urlEndPoint, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
            catchError(e => {

                if(this.isNoAutorizado(e)){
                    return throwError(e);
                }
                if(e.status==400){
                    return throwError(e);
                }
                console.error(e.error.mensaje);
                swal.fire('Error al crear usuario',e.error.mensaje, 'error');
                return throwError(e);
            })
        )
    }

    getUsuario(idUsuario:number): Observable<Usuario>{
        return this.http.get<Usuario>(`${this.urlEndPoint}/${idUsuario}`, {headers: this.agregarAuthorizationHeader()}).pipe(
            catchError(e => {

                if(this.isNoAutorizado(e)){
                    return throwError(e);
                }

                this.router.navigate(['/usuarios']);
                console.error(e.error.mensaje);
                swal.fire('Error al editar', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }
    update(usuario: Usuario): Observable<any>{
        return this.http.put<any>(`${this.urlEndPoint}/${usuario.idUsuario}`, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
            catchError(e => {

                if(this.isNoAutorizado(e)){
                    return throwError(e);
                }

                if(e.status==400){
                    return throwError(e);
                }

                console.error(e.error.mensaje);
                swal.fire('Error al editar usuario', e.error.error, 'error');
                return throwError(e);
            })
        );
    }

    delete(idUsuario: number): Observable<Usuario>{
        return this.http.delete<Usuario>(`${this.urlEndPoint}/${idUsuario}`, {headers: this.agregarAuthorizationHeader()}).pipe(
            catchError(e => {
                if(this.isNoAutorizado(e)){
                    return throwError(e);
                }

                console.error(e.error.mensaje);
                swal.fire('error al eliminar usuario', e.error.error, 'error');
                return throwError(e);
            })
        );    
    }


}