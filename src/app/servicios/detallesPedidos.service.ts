import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallesPedido } from '../interface/detallesPedido.interface';

@Injectable({
  providedIn: 'root'
})
export class DetallesPedidoService {

  url: string = 'http://localhost:3000/detallesPedido';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<DetallesPedido[]>{
    return this.http.get<DetallesPedido[]>(this.url);
  }
  post(detallesPedido: DetallesPedido): Observable<any>{
    return this.http.post(this.url, detallesPedido, { responseType: 'text' });
  }
  put(detallesPedido: DetallesPedido): Observable<any>{
    return this.http.put(`${this.url}`, detallesPedido, { responseType: 'text' });
  }
  delete(detallesPedido : DetallesPedido): Observable<any>{
    return this.http.delete(`${this.url}-${detallesPedido.iddetallesPedido}`, { responseType: 'text' });
  }

}