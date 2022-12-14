import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { Pedido } from 'src/app/interface/pedido.interface';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { Usuario } from 'src/app/interface/usuario.interface';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DetallesPedido } from 'src/app/interface/detallesPedido.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.css']
})
export class FormularioPedidoComponent implements OnInit {

  @Input()
  listaDetallesPedido: DetallesPedido [] = [];

  idpedido: number | null = null;
  idusuario: number | null = null;
  fechaPedido: Date | null = null;
  fechaEntrega: Date | null = null;

  idpedidoValido: boolean = true;
  idusuarioValido: boolean = true;
  fechaPedidoValido: boolean = true;
  fechaEntregaValido: boolean = true;
  listaDetallesPedidoValidado: boolean = false;

  idusuarioLogueado: number | null = null;
  esAdmin: boolean = false;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Agregar' | 'Editar' = 'Agregar';
  //listaPedidos: Pedido[] = [];
  listaUsuarios: Usuario[] = [];

  @Output()
  recargarPedidos: EventEmitter<boolean> = new EventEmitter();

  @Output()
  limpiarDetalle: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private servicioPedidos: PedidosService,
    private servicioUsuarios: UsuarioService
  ) { }

  ngOnInit(): void {
    //this.cargarPedidos();
    this.cargarUsuarios();
    const token = localStorage.getItem('token');
    console.log(token);
    if(token != null){
      const jwtHelper: JwtHelperService = new JwtHelperService();
      this.idusuarioLogueado = jwtHelper.decodeToken(token).sub;
      this.esAdmin = jwtHelper.decodeToken(token).admin != null ? jwtHelper.decodeToken(token).admin : false;
    }
  }

  cargarUsuarios() {
    this.servicioUsuarios.get().subscribe({
      next: (usuarios) =>{
        this.listaUsuarios = usuarios;
      },
      error: (e) => {
        console.log('Error al cargar usuarios');
        console.log(e);
        this.mensajes = [{severity:'error', summary: 'Error al cargar usuarios', detail: e.error}];
      }
    });
  }

  /*cargarPedidos(){
    this.servicioPedidos.get().subscribe({
      next: (pedidos) => {
        this.listaPedidos = pedidos;
      },
      error: (e) => {
        console.log('Error al cargar pedido');
        console.log(e);
        this.mensajes = [{severity: 'Error', summary: 'Error al cargar pedidos', detail: e.error}];
      }
    });
  }*/
  guardar(){
    if(this.validar()){
      const pedido : Pedido = {
        idpedido: this.idpedido,
        idusuario: this.idusuario,
        fechaEntrega: this.fechaEntrega,
        fechaPedido: this.fechaPedido,
        detallesPedidos: this.listaDetallesPedido
      }
      console.log(pedido);
      if(this.modo === 'Agregar'){
        this.registrar(pedido);
      }else{
        this.editar(pedido);
      }
    }
  }

  private registrar(pedido: Pedido){
    console.log(pedido);
    this.guardando = true;
    this.servicioPedidos.post(pedido).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se registro el pedido'}];
        this.recargarPedidos.emit(true);
        
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
        this.mensajes=[{severity: 'error', summary: 'Error al registrar', detail: mensaje}];
      }
    });
  }
  private editar(pedido: Pedido){
    this.guardando = true;
    this.servicioPedidos.put(pedido).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se edito el pedido'}];
        this.recargarPedidos.emit(true);
        console.log( 'Se edito el pedido' );
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
    if(this.modo === 'Editar'){
      this.idpedidoValido = this.idpedido !== null;
    }else{
      this.idpedidoValido = true;
    }
    this.listaDetallesPedidoValidado = this.listaDetallesPedido.length > 0;
    if(this.listaDetallesPedido.length === 0){
      this.mensajes =[{summary: 'Agrege productos al pedido', severity: 'error'}]
    }
    this.listaDetallesPedidoValidado = this.listaDetallesPedido.length > 0;
    this.idusuarioValido = this.idusuario !== null;
    this.fechaEntregaValido = this.fechaEntrega !== null;
    this.fechaPedidoValido = this.fechaPedido !== null;
    return this.idpedidoValido && this.idusuarioValido && this.fechaEntregaValido && this.fechaPedidoValido && this.listaDetallesPedidoValidado;
  }
  limpiarFormulario(){
     this.idpedido = null;
     this.idusuario = this.idusuarioLogueado;
     this.fechaEntrega = null;
     this.fechaPedido = null; 
    
    this.idpedidoValido = true;
     this.idusuarioValido = true;
     this.fechaEntregaValido = true;
     this.fechaPedidoValido = true;


     this.mensajes = [];
    this.limpiarDetalle.emit(true)

  }

}
