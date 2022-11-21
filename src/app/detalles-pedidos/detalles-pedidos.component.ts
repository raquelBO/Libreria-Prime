import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { DetallesPedido } from '../interface/detallesPedido.interface';
import { DetallesPedidoService } from '../servicios/detallesPedidos.service';
import { FormularioDetallePedidoComponent } from './formulario-detalle-pedido/formulario-detalle-pedido.component';
@Component({
  selector: 'app-detalles-pedidos',
  templateUrl: './detalles-pedidos.component.html',
  styleUrls: ['./detalles-pedidos.component.css']
})
export class DetallesPedidosComponent implements OnInit {

  @ViewChild('formulario') formdetallesPedido!: FormularioDetallePedidoComponent;
  //Aqui se guarda la lista de detallesPedidos
  listadetallesPedidos: DetallesPedido[] = [];
  //Esta variable muestra la animacion de carga
  cargando: boolean = false;
  //Indica si el dialogo esta visible u oculto
  dialogoVisible: boolean = false;

  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar detallesPedido';

  constructor(
    private serviciosDetallesPedidos: DetallesPedidoService,
    private servicioConfirm: ConfirmationService

  ) { }

  ngOnInit(): void {
  }

}
