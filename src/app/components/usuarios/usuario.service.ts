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

    constructor(private http: HttpClient,private router:Router) { }

    getUsuarios(): Observable<Usuario[]>{
        //return this.http.get<Usuario[]>(this.urlEndPoint);
        return this.http.get(this.urlEndPoint).pipe(
        map(response => response as Usuario[])
        );
    }

    create(usuario: Usuario) : Observable<any> {
        return this.http.post<any>(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                /*if(e.status==400){
                    return throwError(e);
                }*/
                console.error(e.error.mensaje);
                swal.fire('Error al crear usuario',e.error.mensaje, 'error');
                return throwError(e);
            })
        )
    }

    getUsuario(idUsuario:number): Observable<Usuario>{
        return this.http.get<Usuario>(`${this.urlEndPoint}/${idUsuario}`).pipe(
            catchError(e => {
                this.router.navigate(['/usuarios']);
                console.error(e.error.mensaje);
                swal.fire('Error al editar', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }
    update(usuario: Usuario): Observable<any>{
        return this.http.put<any>(`${this.urlEndPoint}/${usuario.idUsuario}`, usuario, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                /*if(e.status==400){
                    return throwError(e);
                }*/

                console.error(e.error.mensaje);
                swal.fire('Error al editar usuario', e.error.error, 'error');
                return throwError(e);
            })
        );
    }

    delete(idUsuario: number): Observable<Usuario>{
        return this.http.delete<Usuario>(`${this.urlEndPoint}/${idUsuario}`, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                console.error(e.error.mensaje);
                swal.fire('error al eliminar usuario', e.error.error, 'error');
                return throwError(e);
            })
        );    
    }


}