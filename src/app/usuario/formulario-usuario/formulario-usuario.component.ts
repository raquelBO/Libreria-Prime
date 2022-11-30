import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { Usuario } from 'src/app/interface/usuario.interface';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {

   idusuario: number | null = null;
   nombre: string | null = null;
   apellido: string | null = null;
   direccion: string | null = null;
   telefono: number | null = null;
   ci: number | null = null;
   digitoRuc : number | null = null;
   correo: string | null = null;
   password: string | null = null;
   idtipo: number | null = null;

   idusuarioValido: boolean = true;
   nombreValido: boolean = true;
   apellidoValido: boolean = true;
   direccionValido: boolean = true;
   telefonoValido: boolean = true;
   ciValido: boolean = true;
   digitoRucValido: boolean = true;
   correoValido: boolean = true;
   passwordValido: boolean = true;
   idtipoValido: boolean = true;

   guardando: boolean = false;
   mensajes: Message[] = [];

   modo: 'Registrar' | 'Editar' = 'Registrar';
   listaUsuario: Usuario[] = [];

   @Output()
   recargarUsuario: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private servicioUsuario: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.servicioUsuario.get().subscribe({
      next: (usuario) =>{
        this.listaUsuario = usuario;
      },
      error: (e) => {
        console.log('Error al cargar usuarios');
        console.log(e);
        this.mensajes = [{severity: 'error', summary: 'Error al cargar usuarios',detail: e.error }]; 
      }
    });
  }

  guardar(){
    this.validar();
    if(this.idusuarioValido 
      && this.nombreValido 
      && this.apellidoValido
      && this.apellidoValido
      && this.direccionValido
      && this.telefonoValido
      && this.ciValido
      && this.digitoRucValido
      && this.correoValido
      && this.passwordValido 
      && this.idtipoValido){
        const usuario : Usuario = {
          idusuario: this.idusuario,
          nombre: this.nombre,
          apellido: this.apellido,
          direccion: this.direccion,
          telefono: this.telefono,
          ci: this.ci,
          digitoRuc: this.digitoRuc,
          correo: this.correo,
          password: this.password,
          idtipo: this.idtipo
        }
        if(this.modo === 'Registrar'){
          this.registrar(usuario);
        }else{
          this.editar(usuario);
        }
      }
    }

    private registrar(usuario: Usuario){
      this.guardando = true;
      this.servicioUsuario.post(usuario).subscribe({
        next: () => {
          this.guardando = false;
          this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se registro el usuario'}];
          this.recargarUsuario.emit(true);
        },
        error: (e) => {
          this.guardando = false;
          console.log(e);
          const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
          this.mensajes=[{severity: 'error', summary:'Error al registrar', detail: mensaje}];
        }
      });
    }

    private editar(usuario: Usuario){
      this.guardando = true;
      this.servicioUsuario.put(usuario).subscribe({
        next: () => {
          this.guardando = false;
          this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se edito el usuario'}];
          this.recargarUsuario.emit(true);
        },
        error: (e) => {
          this.guardando = false;
          console.log(e);
          const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
          this.mensajes=[{severity: 'error', summary: 'Error al editar', detail: mensaje}];
          }
      });
    }
    validar(): boolean{
      this.idusuarioValido = this.idusuario !== null;
      this.nombreValido = this.nombre !== null;
      this.apellidoValido = this.apellido !== null;
      this.direccionValido = this.direccion !== null;
      this.telefonoValido = this.telefono !== null;
      this.ciValido = this.ci !== null;
      this.digitoRucValido = this.digitoRucValido !== null;
      this.correoValido = this.correo !== null!
      this.passwordValido = this.password !== null;
      this.idtipoValido = this.idtipo !== null;
      return this.idusuarioValido && this.nombreValido && this.apellidoValido && this.direccionValido && this.telefonoValido && this.ciValido && this.digitoRucValido && this.correoValido && this.passwordValido && this.idtipoValido;
    }
    limpiarFormulario(){
      this.idusuario = null;
      this.nombre = null;
      this.apellido = null;
      this.direccion = null;
      this.telefono = null;
      this.ci = null;
      this.digitoRuc = null;
      this.correo = null;
      this.password = null;
      this.idtipo = null;

      this.idusuarioValido = true;
      this.nombreValido = true;
      this.apellidoValido = true;
      this.direccionValido = true;
      this.telefonoValido = true;
      this.ciValido = true;
      this.digitoRucValido = true;
      this.correoValido = true;
      this.passwordValido = true;
      this.idtipoValido = true;

      this.mensajes = [];
    }


}
