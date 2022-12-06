import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { DetallesPedido } from 'src/app/interface/detallesPedido.interface';
import { DetallesPedidoService } from 'src/app/servicios/detallesPedidos.service';
import { Producto } from 'src/app/interface/producto.interface';
import { ProductoService } from 'src/app/servicios/productos.service';


@Component({
  selector: 'app-formulario-detalles-pedido',
  templateUrl: './formulario-detalle-pedido.component.html',
  styleUrls: ['./formulario-detalle-pedido.component.css']
})
export class FormularioDetallesPedidoComponent implements OnInit {

  iddetallesPedido: number  | null = null;
    idproducto:   number  | null = null;
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
  listaDetallesPedidos: DetallesPedido[] = [];
  listaProductos: Producto[] = [];

  @Output()
  recargarDetallesPedidos: EventEmitter<boolean> = new EventEmitter();



  constructor(
    private servicioDetallesPedido: DetallesPedidoService,
    private servicioProducto: ProductoService
  ) { }

  ngOnInit(): void {
    this.cargarDetallesPedidos();
    this.cargarProductos();
  }
  cargarProductos() {
    this.servicioProducto.get().subscribe({
      next: (productos) => {
        this.listaProductos = productos;
      },
      error: (e) => {
        console.log('Error al cargar productos');
        console.log(e);
        this.mensajes = [{severity:'Error', summary:'Error al cargar Productos', detail: e.error}];
      }
    });
  }

  cargarDetallesPedidos(){
    this.servicioDetallesPedido.get().subscribe({
      next: (detallesPedido) => {
        this.listaDetallesPedidos = detallesPedido;
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
        this.recargarDetallesPedidos.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
        this.mensajes=[{severity: 'error', summary: 'Error al registrar', detail: mensaje}];
      }
    });
  }
  private editar(detallesPedido: DetallesPedido){
    this.guardando = true;
    this.servicioDetallesPedido.put(detallesPedido).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'sucess', summary: 'Exito', detail: 'Se edito el detallePedido'}];
        this.recargarDetallesPedidos.emit(true);
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
