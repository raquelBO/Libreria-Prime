import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../interface/pedido.interface';

@Injectable({
    providedIn: 'root'
})
export class PedidosService {
    
    url: string = 'http://localhost:3000/pedido';

    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<Pedido[]>{
        return this.http.get<Pedido[]>(this.url, { headers: this.ObtenerCabeceras()});
    }
    post(pedido: Pedido): Observable<any>{
        return this.http.post(this.url, pedido, { responseType: 'text', headers: this.ObtenerCabeceras('application/json') });
    }
    put(pedido: Pedido): Observable<any>{
        return this.http.put(`${this.url}`, pedido, { responseType: 'text', headers: this.ObtenerCabeceras('application/json') });
    }
    delete(pedido: Pedido): Observable<any>{
        return this.http.delete(`${this.url}-${pedido.idpedido}`, { responseType: 'text', headers: this.ObtenerCabeceras('application/json') });
    }
    private ObtenerCabeceras(contentType?: string): HttpHeaders{
        let cabeceras: HttpHeaders = new HttpHeaders();
        if(contentType) cabeceras = cabeceras.append('Content-type', contentType);
        const token: string | null = localStorage.getItem('token');
        if(token) cabeceras = cabeceras.append('Authorization', 'Bearer '+token);
        return cabeceras;
       } 

}