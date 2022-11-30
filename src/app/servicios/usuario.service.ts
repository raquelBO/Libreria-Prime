import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = 'http://localhost:3000/usuario';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url, { headers: this.ObtenerCabeceras()});
  }
  post(usuario: Usuario): Observable<any>{
    return this.http.post(this.url, usuario, { responseType: 'text' , headers: this.ObtenerCabeceras('application/json') });
  }
  put(usuario: Usuario): Observable<any>{
    return this.http.put(`${this.url}`, usuario, { responseType: 'text' , headers: this.ObtenerCabeceras('application/json') });
  }
  delete(usuario : Usuario): Observable<any>{
    return this.http.delete(`${this.url}-${usuario.idusuario}`, { responseType: 'text' , headers: this.ObtenerCabeceras('application/json') });
  }
  private ObtenerCabeceras(contentType?: string): HttpHeaders{
    let cabeceras: HttpHeaders = new HttpHeaders();
    if(contentType) cabeceras = cabeceras.append('Content-type', contentType);
    const token: string | null = localStorage.getItem('token');
    if(token) cabeceras = cabeceras.append('Authorization', 'Bearer '+token);
    return cabeceras;
   } 


}
