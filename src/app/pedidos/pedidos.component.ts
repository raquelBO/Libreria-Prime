import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { Pedido } from '../interface/pedido.interface';
import { PedidoService } from '../servicios/pedidos.service';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  @ViewChild('formulario') formPedido!: FormularioPedidoComponent;
  //Aqui se guarda la lista de pedidos
  listaPedidos: Pedido[] = [];
  //Esta variable muestra la animacion de carga
  cargando: boolean = false;
  //Indica si el dialogo esta visible u oculto
  dialogoVisible: boolean = false;

  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar Pedido';

  constructor(
    private servicioPedidos: PedidoService,
    private servicioConfirm: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.cargando = true;
    this.servicioPedidos.get().subscribe({
      next: (datos) => {
        this.listaPedidos = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log(e);
        this.cargando = false;
        this.mensajes = [{ severity: 'error', summary: 'Error al cargar pedidos', detail: e.message }]
      }
    });
  }

  nuevo() {
    this.tituloDialogo = 'Ragistrar pedido';
    this.formPedido.limpiarFormulario();
    this.formPedido.modo = 'Registrar';
    this.formPedido.cargarPedidos();
    this.dialogoVisible = true;
  }

  editar(pedido: Pedido) {
    this.formPedido.idpedido = pedido.idpedido;
    this.formPedido.idusuario = pedido.idusuario;
    this.formPedido.fechaEntrega = pedido.fechaEntrega;
    this.formPedido.fechaPedido = pedido.fechaPedido;
    this.formPedido.modo = 'Editar';
    this.formPedido.cargarPedidos();
    this.dialogoVisible = true;
    this.tituloDialogo = "Editar pedido";
  }
  eliminar(pedido: Pedido) {
    this.servicioConfirm.confirm({
      message: "¿Realmente desea eliminar el pedido: '" + pedido.idpedido + "-" + pedido.idusuario + '-' + pedido.fechaEntrega + '-' + pedido.fechaPedido + "'?",
      accept: () => {
        this.servicioPedidos.delete(pedido).subscribe({
          next: () => {
            this.mensajes = [{ severity: 'success', summary: 'Exito', detail: 'Se elimino correctamente el pedido' }];
            this.cargarPedidos();
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
