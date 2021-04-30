import { Injectable } from "@angular/core";

import { from } from 'rxjs';
import { Producto } from './producto';

import { of,Observable, throwError } from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http'; 
import {map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';

import {Router} from '@angular/router';
import { AuthService } from "../components/usuarios/auth.service";


@Injectable()
export class ProductoService{
    private urlEndPoint:string = 'http://localhost:8080/api/productos';

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor(private http: HttpClient, private router:Router, private authService: AuthService){}

    private agregarAuthorizationHeader(){
        let token = this.authService.token;
        if(token!=null){
            return this.httpHeaders.append('Authorization','Bearer '+token);
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
    
    
    getProducto(page: number): Observable<any[]> {
        return this.http.get(this.urlEndPoint +'/page/' + page).pipe(
            tap( (response: any) =>{
                (response.content as Producto[]).forEach(producto => {
                    console.log(producto.productId);
                });
            }),
            
            map( (response: any) => {
                
                (response.content as Producto[]).map(producto =>{
                    
                return producto; 
                });
                return response;
            })
        );
    }

    create(producto: Producto) : Observable<any> {
        return this.http.post<any>(this.urlEndPoint, producto, {headers: this.agregarAuthorizationHeader()}).pipe(
            catchError(e => {
                if(e.status==400){
                    return throwError(e);
                }
                console.error(e.error.mensaje);
                swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            })
        )
    }

   getProduct(productId:number): Observable<Producto>{
        return this.http.get<Producto>(`${this.urlEndPoint}/${productId}`, {headers: this.agregarAuthorizationHeader()}).pipe(
            catchError(e => {
                this.router.navigate(['/product']);
                console.error(e.error.mensaje);
                swal.fire('Error al editar', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }

    update(producto: Producto): Observable<any>{
        return this.http.put<any>(`${this.urlEndPoint}/${producto.productId}`, producto, {headers: this.agregarAuthorizationHeader()}).pipe(
            catchError(e => {
                if(e.status==400){
                    return throwError(e);
                }

                console.error(e.error.mensaje);
                swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            })
        );
    }

    delete(productId: number): Observable<Producto>{
        return this.http.delete<Producto>(`${this.urlEndPoint}/${productId}`, {headers: this.agregarAuthorizationHeader()}).pipe(
            catchError(e => {
                console.error(e.error.mensaje);
                swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            })
        );    
    }

    subirFoto(archivo: File, productId:any): Observable<HttpEvent<{}>> {
        let formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("productId", productId);

        let httpHeaders = new HttpHeaders();
        let token =this.authService.token;
        if (token != null){
            httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
        }

        const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
            reportProgress: true,
            headers: httpHeaders
        });

        return this.http.request(req);
    }
    

}