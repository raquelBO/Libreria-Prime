import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = 'http://localhost:3000/Libreria';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }
  post(usuario: Usuario): Observable<any>{
    return this.http.post(this.url, usuario, { responseType: 'text' });
  }
  put(usuario: Usuario): Observable<any>{
    return this.http.put(`${this.url}`, usuario, { responseType: 'text' });
  }
  delete(usuario : Usuario): Observable<any>{
    return this.http.delete(`${this.url}-${usuario.idusuario}`, { responseType: 'text' });
  }

}
