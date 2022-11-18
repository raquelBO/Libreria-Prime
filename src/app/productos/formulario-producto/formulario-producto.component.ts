import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { Producto } from 'src/app/interface/producto.interface'; 
import { PedidoService } from 'src/app/servicios/pedidos.service';
import { ProductoService } from 'src/app/servicios/productos.service';


@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css']
})
export class FormularioProductoComponent implements OnInit {

  idproducto: number | null = null;
  idpedido: number | null = null;
  idusuario: string | null = null;
  fechaPedido: number  | null = null;
  fechaEntrega: number | null = null;

  idproductoValido: boolean = true;
  idpedidoValido: boolean = true;
  idusuarioValido: boolean = true;
  fechaEntregaValido: boolean = true;
  fechaPedidoValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Registrar' | 'Editar' = 'Registrar';
  listaProductos: Producto[] = [];

  @Output()
  recargarProductos: EventEmitter<boolean> = new EventEmitter();



  constructor(
    private servicioProductos: ProductoService,
    private servicioPedidos: PedidoService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.servicioProductos.get().subscribe({
      next: (productos) => {
        this.listaProductos = productos;
      },
      error: (e) => {
        console.log('Error al cargar producto');
        console.log(e);
        this.mensajes = [{severity: 'Error', summary: 'Error al cargar producto', detail: e.error}];
      }
    });
  }
  guardar(){
    this.validar();
    if(this.idproductoValido && this.idpedidoValido && this.idusuarioValido && this.fechaPedidoValido && this.fechaEntregaValido){
      const producto : Producto = {
        idproducto: this.idpedido,
        idpedido: this.idpedido,
        idusuario: this.idusuario,
        fechaEntrega: this.fechaEntrega,
        fechaPedido: this.fechaEntrega
      }
      if(this.modo === 'Registrar'){
        this.registrar(producto);
      }else{
        this.editar(producto);
      }
    }
  }

  private registrar(producto: Producto){
    this.guardando = true;
    this.servicioProductos.post(producto).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se registro el producto'}];
        this.recargarProductos.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        this.mensajes=[{severity: 'error', summary: 'Error al registrar', detail: e.error}];
      }
    });
  }
  private editar(producto: Producto){
    this.guardando = true;
    this.servicioProductos.put(producto).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'sucess', summary: 'Exito', detail: 'Se edito el producto'}];
        this.cargarProductos.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        this.mensajes=[{severity: 'error', summary: 'Error al editar', detail: e.error}];
      }
    });
  }
  validar(): boolean{
    this.idproductoValido = this.idproducto !== null;
    this.idpedidoValido = this.idpedido !== null;
    this.idusuarioValido = this.idusuario !== null;
    this.fechaEntregaValido = this.fechaEntrega !== null;
    this.fechaPedidoValido = this.fechaPedido !== null;
    return this.idproductoValido && this.idpedidoValido && this.idusuarioValido && this.fechaEntregaValido && this.fechaPedidoValido;
  }
  limpiarFormulario(){
    this.idproductoValido = true;
     this.idpedidoValido = true;
     this.idusuarioValido = true;
     this.fechaEntregaValido = true;
     this.fechaPedidoValido = true;

     this.idproducto = null;
     this.idpedido = null;
     this.idusuario = null;
     this.fechaEntrega = null;
     this.fechaPedido = null;

     this.mensajes = [];
  }

}
