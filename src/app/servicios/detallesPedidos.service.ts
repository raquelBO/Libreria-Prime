import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallesPedido } from '../interface/detallesPedido.interface';

@Injectable({
  providedIn: 'root'
})
export class DetallesPedidosService {

  url: string = 'http://localhost:3000/detallesPedido';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<DetallesPedido[]>{
    return this.http.get<DetallesPedido[]>(this.url, { headers: this.ObtenerCabeceras()});
  }
  post(detallesPedido: DetallesPedido): Observable<any>{
    return this.http.post(this.url, detallesPedido, { responseType: 'text', headers: this.ObtenerCabeceras('application/json') });
  }
  put(detallesPedido: DetallesPedido): Observable<any>{
    return this.http.put(`${this.url}`, detallesPedido, { responseType: 'text', headers: this.ObtenerCabeceras('application/json') });
  }
  delete(detallesPedido : DetallesPedido): Observable<any>{
    return this.http.delete(`${this.url}/${detallesPedido.idpedido}-${detallesPedido.idproducto}`, { responseType: 'text', headers: this.ObtenerCabeceras('application/json') });
  }
  private ObtenerCabeceras(contentType?: string): HttpHeaders{
    let cabeceras: HttpHeaders = new HttpHeaders();
    if(contentType) cabeceras = cabeceras.append('Content-type', contentType);
    const token: string | null = localStorage.getItem('token');
    if(token) cabeceras = cabeceras.append('Authorization', 'Bearer '+token);
    return cabeceras;
   } 


}