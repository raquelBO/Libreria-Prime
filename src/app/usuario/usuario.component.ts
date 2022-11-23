import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { Usuario } from '../interface/usuario.interface';
import { UsuarioService } from '../servicios/usuario.service';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild('formulario') formUsuario!: FormularioUsuarioComponent;
  //Aqui se guarda la lista de usuario
  listaUsuario: Usuario[] = [];
  //Esta variable muestra la animacion de carga
  cargando: boolean = false;
  //Indica si el dialogo esta visible u oculto
  dialogoVisible: boolean = false; 
  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar Usuario';

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioConfirm: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.cargando = true;
    this.servicioUsuario.get().subscribe({
      next: (datos) => {
        this.listaUsuario = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log(e);
        this.cargando = false;
        this.mensajes =[{ severity: 'error', summary: 'Error al cargar usuarios', detail: e.message }]
      }
    });
  }

  nuevo() {
    this.tituloDialogo = 'Registrar usuario';
    this.formUsuario.limpiarFormulario();
    this.formUsuario.modo = 'Registrar';
    this.cargarUsuario();
    this.dialogoVisible = true;
  }

  editar(usuario: Usuario) {
    this.formUsuario.idusuario = usuario.idusuario;
    this.formUsuario.nombre = usuario.nombre;
    this.formUsuario.apellido = usuario.apellido;
    this.formUsuario.direccion = usuario.direccion;
    this.formUsuario.telefono = usuario.telefono;
    this.formUsuario.ci = usuario.ci;
    this.formUsuario.digitoRuc = usuario.digitoRuc;
    this.formUsuario.correo = usuario.correo;
    this.formUsuario.password = usuario.password;
    this.formUsuario.modo = 'Editar';
    this.cargarUsuario();
    this.dialogoVisible = true;
    this.tituloDialogo = "Editar usuario";
  }
  eliminar(usuario: Usuario) {
    this.servicioConfirm.confirm({
      message: "¿Realemente desea eliminar el usuario: '" + usuario.idusuario + "-" + usuario.nombre + "-" + usuario.apellido + "-" + usuario.direccion + "-" + usuario.telefono + "-" + usuario.ci + "-" + usuario.digitoRuc + "-" + usuario.correo + "-" + usuario.password + "'?",
      accept: () => {
        this.servicioUsuario.delete(usuario).subscribe({
          next: () => {
            this.mensajes = [{ severity: 'success', summary: 'Exito', detail: 'Se elimino correctamente el usuario'}];
            this.cargarUsuario();
          },
          error: (e) => {
            console.log(e);
            this.mensajes = [{ severity: 'error', summary: 'Error al eliminar', detail: e.error }];
          }
        });
      }
    });
  }

}
