import { Injectable } from "@angular/core";

import { from } from 'rxjs';
import { Producto } from './producto';

import { of,Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import {map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';

import {Router} from '@angular/router';


@Injectable()
export class ProductoService{
    private urlEndPoint:string = 'http://localhost:8080/api/productos';

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor(private http: HttpClient, private router:Router){}

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
        return this.http.post<any>(this.urlEndPoint, producto, {headers: this.httpHeaders}).pipe(
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
        return this.http.get<Producto>(`${this.urlEndPoint}/${productId}`).pipe(
            catchError(e => {
                this.router.navigate(['/product']);
                console.error(e.error.mensaje);
                swal.fire('Error al editar', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }

    update(producto: Producto): Observable<any>{
        return this.http.put<any>(`${this.urlEndPoint}/${producto.productId}`, producto, {headers: this.httpHeaders}).pipe(
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
        return this.http.delete<Producto>(`${this.urlEndPoint}/${productId}`, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                console.error(e.error.mensaje);
                swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            })
        );    
    }

    subirFoto(archivo: File, productId:any): Observable<Producto> {
        let formData = new FormData();
        formData.append("archivo",archivo);
        formData.append("productId",productId);
        return this.http.post(`${this.urlEndPoint}/upload/`,formData).pipe(
            map((response: any)=> response.producto as Producto),
            catchError(e => {
                console.error(e.error.mensaje);
                swal.fire(e.error.mensaje, e.error.error, 'error');
                return throwError(e);
            })
        );
    }
    

}