import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interface/producto.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    url: string = 'http://localhost:3000/productos';

    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<Producto[]>{
        return this.http.get<Producto[]>(this.url, { headers: this.ObtenerCabeceras()});
    }
    post(producto: Producto): Observable<any>{
        return this.http.post(this.url, producto, { responseType: 'text', headers: this.ObtenerCabeceras('application/json') });
    }
    put(producto: Producto): Observable<any>{
        return this.http.put(`${this.url}`, producto, { responseType: 'text', headers: this.ObtenerCabeceras('application/json') });
    }
    delete(producto: Producto): Observable<any>{
        return this.http.delete(`${this.url}-${producto.idproducto}`, { responseType: 'text', headers: this.ObtenerCabeceras('application/json') });
    }
    private ObtenerCabeceras(contentType?: string): HttpHeaders{
        let cabeceras: HttpHeaders = new HttpHeaders();
        if(contentType) cabeceras = cabeceras.append('Content-type', contentType);
        const token: string | null = localStorage.getItem('token');
        if(token) cabeceras = cabeceras.append('Authorization', 'Bearer '+token);
        return cabeceras;
       } 

}