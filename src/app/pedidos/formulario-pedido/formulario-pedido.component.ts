import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { Pedido } from 'src/app/interface/pedido.interface';
import { PedidoService } from 'src/app/servicios/pedidos.service';
import { ProductoService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.css']
})
export class FormularioPedidoComponent implements OnInit {

  idpedido: number | null = null;
  idusuario: number | null = null;
  fecha_pedido: string | null = null;
  fecha_entrega: string | null = null;

  idpedidoValido: boolean = true;
  idusuarioValido: boolean = true;
  fecha_pedidoValido: boolean = true;
  fecha_entregaValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Registrar' | 'Editar' = 'Registrar';
  listaAutores: Pedido[] = [];

  @Output()
  recargarPedidos: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private servicioPedidos: PedidoService,
    private servicioProductos: ProductoService
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
    if(this.idpedidoValido && this.idusuarioValido && this.fecha_pedidoValido && this.fecha_entregaValido){
      const pedido : Pedido = {
        idproducto: this.idpedido,
        idusuario: this.idusuario,
        fecha_entrega: this.fecha_entrega,
        fecha_pedido: this.fecha_pedido
      }
      if(this.modo === 'Registrar'){
        this.registrar(pedido);
      }else{
        this.editar(pedido);
      }
    }
  }

  private registar(pedido: Pedido){
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
        this.mensajes=[{severity: 'sucess', summary: 'Exito', detail: 'Se edito el pedido'}];
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
    this.fecha_entregaValido = this.fecha_entrega !== null;
    this.fecha_pedidoValido = this.fecha_pedido !== null;
    return this.idpedidoValido && this.idusuarioValido && this.fecha_entregaValido && this.fecha_pedidoValido;
  }
  limpiarFormulario(){
     this.idpedidoValido = null;
     this.idusuarioValido = null;
     this.fecha_entregaValido = null;
     this.fecha_pedidoValido = null;

     this.idpedido = true;
     this.idusuario = true;
     this.fecha_entrega = true;
     this.fecha_pedido = true;

     this.mensajes = [];
  }

}
