import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { Pedido } from 'src/app/interface/pedido.interface';
import { PedidoService } from 'src/app/servicios/pedidos.service';
import  { DetallesPedido } from 'src/app/interface/detallesPedido.interface';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.css']
})
export class FormularioPedidoComponent implements OnInit {

  idpedido: number | null = null;
  idusuario: number | null = null;
  fechaPedido: string | null = null;
  fechaEntrega: string | null = null;

  idpedidoValido: boolean = true;
  idusuarioValido: boolean = true;
  fechaPedidoValido: boolean = true;
  fechaEntregaValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Registrar' | 'Editar' = 'Registrar';
  listaPedidos: Pedido[] = [];
  listaDetallesPedido: DetallesPedido[] = [];

  @Output()
  recargarPedidos: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private servicioPedidos: PedidoService,
  ) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(){
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
  }
  guardar(){
    this.validar();
    if(this.idpedidoValido && this.idusuarioValido && this.fechaPedidoValido && this.fechaEntregaValido){
      const pedido : Pedido = {
        idpedido: this.idpedido,
        idusuario: this.idusuario,
        fechaEntrega: this.fechaEntrega,
        fechaPedido: this.fechaEntrega
      }
      if(this.modo === 'Registrar'){
        this.registrar(pedido);
      }else{
        this.editar(pedido);
      }
    }
  }

  private registrar(pedido: Pedido){
    this.guardando = true;
    this.servicioPedidos.post(pedido).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se registro el pedido'}];
        this.recargarPedidos.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        this.mensajes=[{severity: 'error', summary: 'Error al registrar', detail: e.error}];
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
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        this.mensajes=[{severity: 'error', summary: 'Error al editar', detail: e.error}];
      }
    });
  }
  validar(): boolean{
    this.idpedidoValido = this.idpedido !== null;
    this.idusuarioValido = this.idusuario !== null;
    this.fechaEntregaValido = this.fechaEntrega !== null;
    this.fechaPedidoValido = this.fechaPedido !== null;
    return this.idpedidoValido && this.idusuarioValido && this.fechaEntregaValido && this.fechaPedidoValido;
  }
  limpiarFormulario(){
     this.idpedidoValido = true;
     this.idusuarioValido = true;
     this.fechaEntregaValido = true;
     this.fechaPedidoValido = true;

     this.idpedido = null;
     this.idusuario = null;
     this.fechaEntrega = null;
     this.fechaPedido = null;

     this.mensajes = [];
  }

}
