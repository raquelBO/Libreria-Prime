import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { DetallesPedido } from '../interface/detallesPedido.interface';
import { DetallesPedidosService } from '../servicios/detallesPedidos.service';
import { FormularioDetallesPedidoComponent } from './formulario-detalle-pedido/formulario-detalle-pedido.component';
@Component({
  selector: 'app-detalles-pedidos',
  templateUrl: './detalles-pedidos.component.html',
  styleUrls: ['./detalles-pedidos.component.css']
})
export class DetallesPedidoComponent implements OnInit {

  @ViewChild('formulario') formDetallesPedido!: FormularioDetallesPedidoComponent;
  //Aqui se guarda la lista de detallesPedidos
  @Output()
  listaDetallesPedidoChange: EventEmitter<DetallesPedido[]> = new EventEmitter();
  @Input()
  listaDetallesPedido: DetallesPedido[] = [];
  //Esta variable muestra la animacion de carga
  cargando: boolean = false;
  //Indica si el dialogo esta visible u oculto
  dialogoVisible: boolean = false;

  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar detallesPedido';
  total: number = 0;

  constructor(
    private servicioDetallesPedidos: DetallesPedidosService,
    private servicioConfirm: ConfirmationService

  ) { }

  ngOnInit(): void {
    //this.cargarDetallesPedido();
  }

  public calcularTotal(){
    this.total = 0;
    for(let detalle of this.listaDetallesPedido){
      detalle.subtotal = Number(detalle.cantidad) * Number(detalle.precio);
      this.total += detalle.subtotal;
    }
  }

  agregarDetallePedido(detallePedido: DetallesPedido){
    const detallesPedidoEncontrado: DetallesPedido | undefined = this.listaDetallesPedido.find(detalle => detalle.idproducto === detallePedido.idproducto)
    
    if(detallesPedidoEncontrado != null ){
      const posicion = this.listaDetallesPedido.indexOf(detallesPedidoEncontrado);
      detallesPedidoEncontrado.cantidad = Number(detallesPedidoEncontrado.cantidad) + Number(detallePedido.cantidad);
      this.listaDetallesPedido[posicion] = detallesPedidoEncontrado;
    }else{
      this.listaDetallesPedido.push(detallePedido);
    }
    this.calcularTotal();
    this.listaDetallesPedidoChange.emit(this.listaDetallesPedido);
  }

  modificarDetallePedido(detallePedido: DetallesPedido){
    const detallesPedidoEncontrado: DetallesPedido | undefined = this.listaDetallesPedido.find(detalle => detalle.idproducto === detallePedido.idproducto)
    if(detallesPedidoEncontrado != null){
      const posicion = this.listaDetallesPedido.indexOf(detallesPedidoEncontrado);
      this.listaDetallesPedido.splice(posicion, 1, detallePedido);
    }
    this.calcularTotal();
  }

  cargarDetallesPedido(): void {
    this.cargando = true;
    this.servicioDetallesPedidos.get().subscribe({
      next: (datos) => {
        this.listaDetallesPedido = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log(e);
        this.cargando = false;
        const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
        this.mensajes = [{severity: 'error', summary: 'Error al cargar detallesPedidos', detail: mensaje}]
      }
    });
  }

  nuevo() {
    this.tituloDialogo = 'Registrar DetallesPedido';
    this.formDetallesPedido.limpiarFormulario();
    this.formDetallesPedido.modo = 'Agregar';
    this.dialogoVisible = true;

  }

  editar(detallesPedido: DetallesPedido) {
    this.formDetallesPedido.idproducto = detallesPedido.idproducto;
    this.formDetallesPedido.cantidad = detallesPedido.cantidad;
    this.formDetallesPedido.precio = detallesPedido.precio;
    //this.formDetallesPedido.idpedido = detallesPedido.idpedido;
    //this.formDetallesPedido.cargarDetallesPedidos();
    this.formDetallesPedido.modo = 'Editar';
    this.dialogoVisible = true;
    this.tituloDialogo = "Editar DetallesPedido";
  }
  eliminar(detallesPedido: DetallesPedido) {
    console.log('eliminar');
    this.servicioConfirm.confirm({
      message: "¿Realmente desea eliminar el detallesPedido: '"+ detallesPedido.nombreProducto + '-' + detallesPedido.cantidad +'-' + detallesPedido.precio + "'?",
      accept: () => {
        this.listaDetallesPedido = this.listaDetallesPedido.filter(detalle => detalle.idproducto !== detallesPedido.idproducto);
      }
    });
  }

  limpiarDetalle(){
    this.listaDetallesPedido = [];
    this.listaDetallesPedidoChange.emit([]);
  }

}


