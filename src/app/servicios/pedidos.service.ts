import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../interface/pedido.interface';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    
    url: string = 'http://localhost:3000/pedido';

    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<Pedido[]>{
        return this.http.get<Pedido[]>(this.url);
    }
    post(pedido: Pedido): Observable<any>{
        return this.http.post(this.url, pedido, { responseType: 'text' });
    }
    put(pedido: Pedido): Observable<any>{
        return this.http.put(`${this.url}`, pedido, { responseType: 'text' });
    }
    delete(pedido: Pedido): Observable<any>{
        return this.http.delete(`${this.url}-${pedido.idpedido}`, { responseType: 'text' });
    }

}