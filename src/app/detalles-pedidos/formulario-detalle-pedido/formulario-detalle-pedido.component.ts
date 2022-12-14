import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { DetallesPedido } from 'src/app/interface/detallesPedido.interface';
import { DetallesPedidosService } from 'src/app/servicios/detallesPedidos.service';
import { Producto } from 'src/app/interface/producto.interface';
import { ProductosService } from 'src/app/servicios/productos.service';


@Component({
  selector: 'app-formulario-detalles-pedido',
  templateUrl: './formulario-detalle-pedido.component.html',
  styleUrls: ['./formulario-detalle-pedido.component.css']
})
export class FormularioDetallesPedidoComponent implements OnInit {

    idproducto:   number  | null = null;
    cantidad:   number  | null = 1;
    precio : number | null = null;
    //idpedido : number | null = null ;

    idproductoValido: boolean = true;
    cantidadValido: boolean = true;
    precioValido: boolean = true;
    //idpedidoValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Agregar' | 'Editar' = 'Agregar';
  listaDetallesPedidos: DetallesPedido[] = [];
  listaProductos: Producto[] = [];

  @Output()
  recargarDetallesPedidos: EventEmitter<boolean> = new EventEmitter();

  @Output()
  agregarDetalle: EventEmitter<DetallesPedido> = new EventEmitter();

  @Output()
  modificarDetalle: EventEmitter<DetallesPedido> = new EventEmitter();

  constructor(
    private servicioDetallesPedidos: DetallesPedidosService,
    private servicioProductos: ProductosService
  ) { }

  ngOnInit(): void {
    //this.cargarDetallesPedidos();
    this.cargarProductos();
  }

  cargarProductos() {
    this.servicioProductos.get().subscribe({
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
    this.servicioDetallesPedidos.get().subscribe({
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
    if(this.validar()){
      const detallesPedido : DetallesPedido = {
        idproducto: this.idproducto,
        cantidad: Number(this.cantidad),
        precio: Number(this.precio),
        idpedido: null,
        nombreProducto: this.listaProductos.find(producto => producto.idproducto === this.idproducto)?.nombrePro,
        subtotal: Number(this.cantidad) *  Number(this.precio)
      }
      console.log(detallesPedido);
      if(this.modo === 'Agregar'){
        //this.registrar(detallesPedido);
        this.agregarDetalle.emit(detallesPedido)
        this.mensajes = [{summary: 'Producto agregado', severity: 'success'}]
      }else{
        this.modificarDetalle.emit(detallesPedido)
        this.mensajes = [{summary: 'Producto modificado', severity: 'success'}]
        //this.editar(detallesPedido);
      }
    }
  }

  /*private registrar(detallesPedido: DetallesPedido){
    this.guardando = true;
    this.servicioDetallesPedidos.post(detallesPedido).subscribe({
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
    this.servicioDetallesPedidos.put(detallesPedido).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se edito el detallePedido'}];
        this.recargarDetallesPedidos.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
        this.mensajes=[{severity: 'error', summary: 'Error al editar', detail: mensaje}];
      }
    });
  }*/
  validar(): boolean{
    this.idproductoValido = this.idproducto !== null;
    this.cantidadValido = this.cantidad !== null;
    this.precioValido = this.precio !== null;
    //this.idpedidoValido = this.idpedido !== null;
    return this.idproductoValido && this.cantidadValido && this.precioValido ;
  }
  limpiarFormulario(){
     this.idproductoValido = true;
     this.cantidadValido = true;
     this.precioValido = true;
     //this.idpedidoValido = true;

     this.idproducto = null;
     this.cantidad = 1;
     this.precio = null;
     //this.idpedido = null;

     this.mensajes = [];
  }

  cargarPrecio(idproducto: number){
    const productoEncontrado: Producto | undefined = this.listaProductos.find(pro => pro.idproducto === idproducto)
    if(productoEncontrado){
      this.precio = productoEncontrado.precioPro;
    }
  }

}
