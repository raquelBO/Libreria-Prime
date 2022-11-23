import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { DetallesPedido } from 'src/app/interface/detallesPedido.interface';
import { DetallesPedidoService } from 'src/app/servicios/detallesPedidos.service';


@Component({
  selector: 'app-formulario-detalles-pedido',
  templateUrl: './formulario-detalle-pedido.component.html',
  styleUrls: ['./formulario-detalle-pedido.component.css']
})
export class FormularioDetallesPedidoComponent implements OnInit {

  iddetallesPedido: number  | null = null;
    idproducto:   string  | null = null;
    cantidad:   number  | null = null;
    precio : number | null = null;
    idpedido : number | null = null ;

    iddetallesPedidoValido: boolean = true;
    idproductoValido: boolean = true;
    cantidadValido: boolean = true;
    precioValido: boolean = true;
    idpedidoValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Registrar' | 'Editar' = 'Registrar';
  listaDetallesPedido: DetallesPedido[] = [];

  @Output()
  recargarDetallesPedido: EventEmitter<boolean> = new EventEmitter();



  constructor(
    private servicioDetallesPedido: DetallesPedidoService,
  ) { }

  ngOnInit(): void {
    this.cargarDetallesPedido();
  }

  cargarDetallesPedido(){
    this.servicioDetallesPedido.get().subscribe({
      next: (detallesPedido) => {
        this.listaDetallesPedido = detallesPedido;
      },
      error: (e) => {
        console.log('Error al cargar detallesPedido');
        console.log(e);
        this.mensajes = [{severity: 'Error', summary: 'Error al cargar detallesPedido', detail: e.error}];
      }
    });
  }
  guardar(){
    this.validar();
    if(this.iddetallesPedidoValido && this.idproductoValido && this.cantidadValido && this.precioValido && this.idpedidoValido){
      const detallesPedido : DetallesPedido = {
        iddetallesPedido: this.iddetallesPedido,
        idproducto: this.idproducto,
        cantidad: this.cantidad,
        precio: this.precio,
        idpedido: this.idpedido
      }
      if(this.modo === 'Registrar'){
        this.registrar(detallesPedido);
      }else{
        this.editar(detallesPedido);
      }
    }
  }

  private registrar(detallesPedido: DetallesPedido){
    this.guardando = true;
    this.servicioDetallesPedido.post(detallesPedido).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se registro el detallesPedido'}];
        this.recargarDetallesPedido.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        this.mensajes=[{severity: 'error', summary: 'Error al registrar', detail: e.error}];
      }
    });
  }
  private editar(detallesPedido: DetallesPedido){
    this.guardando = true;
    this.servicioDetallesPedido.put(detallesPedido).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'sucess', summary: 'Exito', detail: 'Se edito el detallePedido'}];
        this.recargarDetallesPedido.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        this.mensajes=[{severity: 'error', summary: 'Error al editar', detail: e.error}];
      }
    });
  }
  validar(): boolean{
    this.iddetallesPedidoValido = this.iddetallesPedido !== null;
    this.idproductoValido = this.idproducto !== null;
    this.cantidadValido = this.cantidad !== null;
    this.precioValido = this.precio !== null;
    this.idpedidoValido = this.idpedido !== null;
    return this.iddetallesPedidoValido && this.idproductoValido && this.cantidadValido && this.precioValido && this.idpedidoValido;
  }
  limpiarFormulario(){
    this.iddetallesPedidoValido = true;
     this.idproductoValido = true;
     this.cantidadValido = true;
     this.precioValido = true;
     this.idpedidoValido = true;

     this.iddetallesPedido = null;
     this.idproducto = null;
     this.cantidad = null;
     this.precio = null;
     this.idpedido = null;

     this.mensajes = [];
  }

}
