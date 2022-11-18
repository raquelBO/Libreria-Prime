import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { Producto } from '../interface/producto.interface';
import { ProductoService } from '../servicios/productos.service';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @ViewChild('formulario') formProducto!: FormularioProductoComponent;
  //Aqui se guarda la lista de productos
  listaProductos: Producto[] = [];
  //Esta variable muestra la animacion de carga
  cargando: boolean = false;
  //Indica si el dialogo esta visible u oculto
  dialogoVisible: boolean = false;

  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar Producto';

  constructor(
    private servicioProductos: ProductoService,
    private servicioConfirm: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void{
    this.cargando = true;
    console.log("antes de cargar");
    this.servicioProductos.get().subscribe({
      next: (datos) => {
        this.listaProductos = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log("ocurrio un error de lectura del api");
        console.log(e);
        this.cargando = false;
        this.mensajes = [{ severity: 'error', summary: 'Error al cargar productos', detail: e.message}]
        console.log(this.mensajes);
      }
    });
  }
  
  nuevo() {
    this.tituloDialogo = 'Registrar Producto';
    this.formProducto.limpiarFormulario();
    this.formProducto.modo = 'Registrar';
    this.formProducto.cargarProductos();
    this.dialogoVisible =true;
  }
  editar(producto: Producto){
    this.formProducto.idproducto = producto.idproducto;
    this.formProducto.idpedido = producto.idpedido;
    this.formProducto.idusuario = producto.idusuario;
    this.formProducto.fechaPedido = producto.fechaPedido;
    this.formProducto.fechaEntrega = producto.fechaEntrega;
    this.formProducto.modo = 'Editar';
    this.formProducto.cargarProductos();
    this.dialogoVisible = true;
    this.tituloDialogo = "Editar Producto"
  }
  eliminar(producto: Producto){
    this.servicioConfirm.confirm({
      message: "¿Realmente desea eliminar el producto: '" + producto.idproducto + "-" + producto.idpedido + "-" + producto.fechaEntrega + "-" + producto.fechaEntrega + "-" + "'?",
      accept: () => {
        this.servicioProductos.delete(producto).subscribe({
          next: () => {
            this.mensajes = [{ severity: 'success', summary: 'Exito', detail: 'Se elimno correctamente el producto'}];
            this.cargarProductos();
          },
          error: (e) => {
            console.log(e);
            this.mensajes = [{ severity: 'error', summary: 'Error al eliminar', detail: e.error }];

          }
        });
      }
    })
  }
}
