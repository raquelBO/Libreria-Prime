import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { DetallesPedido } from '../interface/detallesPedido.interface';
import { DetallesPedidoService } from '../servicios/detallesPedidos.service';
import { FormularioDetallesPedidoComponent } from './formulario-detalle-pedido/formulario-detalle-pedido.component';
@Component({
  selector: 'app-detalles-pedidos',
  templateUrl: './detalles-pedidos.component.html',
  styleUrls: ['./detalles-pedidos.component.css']
})
export class DetallesPedidoComponent implements OnInit {

  @ViewChild('formulario') formDetallesPedido!: FormularioDetallesPedidoComponent;
  //Aqui se guarda la lista de detallesPedidos
  listaDetallesPedido: DetallesPedido[] = [];
  //Esta variable muestra la animacion de carga
  cargando: boolean = false;
  //Indica si el dialogo esta visible u oculto
  dialogoVisible: boolean = false;

  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar detallesPedido';

  constructor(
    private servicioDetallesPedidos: DetallesPedidoService,
    private servicioConfirm: ConfirmationService

  ) { }

  ngOnInit(): void {
    this.cargarDetallesPedido();
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
    this.formDetallesPedido.modo = 'Registrar';
    this.formDetallesPedido.cargarDetallesPedidos();
    this.dialogoVisible = true;

  }

  editar(detallesPedido: DetallesPedido) {
    this.formDetallesPedido.iddetallesPedido = detallesPedido.iddetallesPedido;
    this.formDetallesPedido.idproducto = detallesPedido.idproducto;
    this.formDetallesPedido.cantidad = detallesPedido.cantidad;
    this.formDetallesPedido.precio = detallesPedido.precio;
    this.formDetallesPedido.idpedido = detallesPedido.idpedido;
    this.formDetallesPedido.cargarDetallesPedidos();
    this.dialogoVisible = true;
    this.tituloDialogo = "Editar DetallesPedido";
  }
  eliminar(detallesPedido: DetallesPedido) {
    this.servicioConfirm.confirm({
      message: "¿Realmente desea eliminar el detallesPedido: '" + detallesPedido.iddetallesPedido + "-" + detallesPedido.idproducto + '-' + detallesPedido.cantidad +'-' + detallesPedido.precio +'-' + detallesPedido.idpedido + "'?",
      accept: () => {
        this.servicioDetallesPedidos.delete(detallesPedido).subscribe({
          next: () => {
            this.mensajes = [{ severity: 'success', summary: 'Exito', detail: 'Se elimino correctamente el detallesPedido' }];
            this.cargarDetallesPedido();
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

}


