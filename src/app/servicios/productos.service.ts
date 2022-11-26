import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        return this.http.get<Producto[]>(this.url);
    }
    post(producto: Producto): Observable<any>{
        return this.http.post(this.url, producto, { responseType: 'text' });
    }
    put(producto: Producto): Observable<any>{
        return this.http.put(`${this.url}`, producto, { responseType: 'text' });
    }
    delete(producto: Producto): Observable<any>{
        return this.http.delete(`${this.url}-${producto.idproducto}`, { responseType: 'text' });
    }

}