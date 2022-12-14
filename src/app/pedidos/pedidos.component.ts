import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService, Message } from 'primeng/api';
import { DetallesPedidoComponent } from '../detalles-pedidos/detalles-pedidos.component';
import { DetallesPedido } from '../interface/detallesPedido.interface';
import { Pedido } from '../interface/pedido.interface';
import { PedidosService } from '../servicios/pedidos.service';
import { SesionService } from '../servicios/sesion.service';
import { FormularioPedidoComponent } from './formulario-pedido/formulario-pedido.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  @ViewChild('formulario') formPedido!: FormularioPedidoComponent;
  @ViewChild('detallesPedido') detallesPedido!: DetallesPedidoComponent;
  //Aqui se guarda la lista de pedidos
  listaPedidos: Pedido[] = [];

  listaDetallesPedido: DetallesPedido[] = [];
  //Esta variable muestra la animacion de carga
  cargando: boolean = false;
  //Indica si el dialogo esta visible u oculto
  dialogoVisible: boolean = false;

  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar Pedido';

  constructor(
    private servicioPedidos: PedidosService,
    private servicioConfirm: ConfirmationService,
    private servicioSesion: SesionService,
  ) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  calcularTotales() {
    for (let pedido of this.listaPedidos) {
      
      if (pedido.detallesPedidos != null) {
        let total: number = 0;
        for (let detalle of pedido.detallesPedidos) {
          total += Number(detalle.cantidad) * Number(detalle.precio)
        }
        pedido.total = total;
      }

    }
  }

  cargarPedidos(): void {
    const token: string | null | undefined = localStorage.getItem('token');
    if (token) {
      const jwtHelper: JwtHelperService = new JwtHelperService();
      const esAdmin: boolean = jwtHelper.decodeToken(token).admin;
      const idusuario: number | null = jwtHelper.decodeToken(token).sub;
      if (esAdmin) {
        this.cargarTodosLosPedidos()
      } else {
        this.cargarPedidosPorUsuario(idusuario);
      }
    }

  }

  cargarTodosLosPedidos(): void {
    this.cargando = true;
    this.servicioPedidos.get().subscribe({
      next: (datos) => {
        this.listaPedidos = datos;
        this.cargando = false;
        this.calcularTotales();
      },
      error: (e) => {
        console.log(e);
        this.cargando = false;
        const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
        this.mensajes = [{ severity: 'error', summary: 'Error al cargar pedidos', detail: mensaje }]
      }
    });
  }

  cargarPedidosPorUsuario(idusuario: number | null): void {
    this.cargando = true;
    if (idusuario != null) {
      this.servicioPedidos.getPorUsuario(idusuario).subscribe({
        next: (datos) => {
          this.listaPedidos = datos;
          this.cargando = false;
          this.calcularTotales();
        },
        error: (e) => {
          console.log(e);
          this.cargando = false;
          const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
          this.mensajes = [{ severity: 'error', summary: 'Error al cargar pedidos', detail: mensaje }]
        }
      });
    }
  }


  nuevo() {
    this.tituloDialogo = 'Registrar pedido';
    this.formPedido.limpiarFormulario();
    this.formPedido.modo = 'Agregar';
    //this.formPedido.cargarPedidos();
    this.dialogoVisible = true;
  }

  editar(pedido: Pedido) {
    console.log(pedido);
    this.formPedido.idpedido = pedido.idpedido;
    this.formPedido.idusuario = pedido.idusuario;
    if (pedido.fechaEntrega != null) {
      const fechaEntrega: Date = new Date(pedido.fechaEntrega);
      this.formPedido.fechaEntrega = fechaEntrega;
    }
    if (pedido.fechaPedido != null) {
      const fechaPedido: Date = new Date(pedido.fechaPedido);
      this.formPedido.fechaPedido = fechaPedido;
    }

    this.formPedido.modo = 'Editar';
    this.detallesPedido.listaDetallesPedido = pedido.detallesPedidos != null ? pedido.detallesPedidos : [];
    this.detallesPedido.calcularTotal();
    //this.formPedido.cargarPedidos();

    this.dialogoVisible = true;
    this.tituloDialogo = "Editar pedido";
  }

  eliminar(event: Event, pedido: Pedido) {
    this.servicioConfirm.confirm({
      target: event.target ? event.target : undefined,
      message: "¿Realmente desea eliminar el pedido: '" + pedido.idpedido + "-" + pedido.idusuario + "-" + pedido.fechaEntrega + "-" + pedido.fechaPedido + "'?",
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'pi pi-danger',
      acceptIcon: 'pi pi-trash',
      accept: () => {
        this.servicioPedidos.delete(pedido).subscribe({
          next: () => {
            this.mensajes = [{ severity: 'success', summary: 'Exito', detail: 'Se elimino correctamente el pedido' }];
            this.cargarPedidos();
          },
          error: (e) => {
            console.log(e);
            const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
            this.mensajes = [{ severity: 'error', summary: 'Error al eliminar', detail: mensaje }];
          }
        });
      }
    });
  }

  limpiarDetalle() {
    this.detallesPedido.limpiarDetalle();
  }

}
