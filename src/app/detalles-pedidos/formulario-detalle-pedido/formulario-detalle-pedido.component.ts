import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { DetallesPedidoService } from 'src/app/servicios/detallesPedidos.service';
import { DetallesPedido } from 'src/app/interface/detallesPedido.interface';

@Component({
  selector: 'app-formulario-detalle-pedido',
  templateUrl: './formulario-detalle-pedido.component.html',
  styleUrls: ['./formulario-detalle-pedido.component.css']
})
export class FormularioDetallePedidoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
