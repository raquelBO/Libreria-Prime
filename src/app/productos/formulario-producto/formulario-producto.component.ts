import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { DetallesPedido } from 'src/app/interface/detallesPedido.interface';
import { Producto } from 'src/app/interface/producto.interface'; 
import { ProductoService } from 'src/app/servicios/productos.service';


@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css']
})
export class FormularioProductoComponent implements OnInit {

  idproducto: number | null = null;
  nombrePro: string | null = null;
  precioPro: number | null = null;
  cantidadPro: number  | null = null;
  produOferta: string | null = null;
  marcaPro: string | null = null;

  idproductoValido: boolean = true;
  nombreProValido: boolean = true;
  precioProValido: boolean = true;
  cantidadProValido: boolean = true;
  produOfertaValido: boolean = true;
  marcaProValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Registrar' | 'Editar' = 'Registrar';
  listaProducto: Producto[] = [];

  @Output()
  recargarProductos: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private servicioProducto: ProductoService,
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.servicioProducto.get().subscribe({
      next: (productos) => {
        this.listaProducto = productos;
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
    if(this.idproductoValido && this.nombreProValido && this.precioProValido && this.cantidadProValido && this.produOfertaValido && this.marcaProValido){
      const producto : Producto = {
        idproducto: this.idproducto,
        nombrePro: this.nombrePro,
        precioPro: this.precioPro,
        cantidadPro: this.cantidadPro,
        produOferta: this.produOferta,
        marcaPro: this.marcaPro
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
    this.servicioProducto.post(producto).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se registro el producto'}];
        this.recargarProductos.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
        this.mensajes=[{severity: 'error', summary: 'Error al registrar', detail: mensaje}];
      }
    });
  }
  private editar(producto: Producto){
    this.guardando = true;
    this.servicioProducto.put(producto).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes=[{severity: 'sucess', summary: 'Exito', detail: 'Se edito el producto'}];
        this.recargarProductos.emit(true);
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
    this.idproductoValido = this.idproducto !== null;
    this.nombreProValido = this.nombrePro !== null;
    this.precioProValido = this.precioPro !== null;
    this.cantidadProValido = this.cantidadPro !== null;
    this.produOfertaValido= this.produOferta !== null;
    this.marcaProValido = this.marcaPro !== null;
    return this.idproductoValido && this.nombreProValido && this.precioProValido && this.cantidadProValido && this.produOfertaValido && this.marcaProValido;
  }
  limpiarFormulario(){
    this.idproductoValido = true;
     this.nombreProValido = true;
     this.precioProValido = true;
     this.cantidadProValido = true;
     this.produOfertaValido = true;
     this.marcaProValido = true;

     this.idproducto = null;
     this.nombrePro = null;
     this.precioPro = null;
     this.cantidadPro = null;
     this.produOferta = null;
     this.marcaPro = null;

     this.mensajes = [];
  }

}
