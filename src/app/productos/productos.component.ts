import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { Producto } from '../interface/producto.interface';
import { ProductosService } from '../servicios/productos.service';
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
    private servicioProductos: ProductosService,
    private servicioConfirm: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void{
    this.cargando = true;
    this.servicioProductos.get().subscribe({
      next: (datos) => {
        this.listaProductos = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log(e);
        this.cargando = false;
        const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
        this.mensajes = [{ severity: 'error', summary: 'Error al cargar productos', detail: mensaje}]
      }
    });
  }
  
  nuevo() {
    this.tituloDialogo = 'Registrar Producto';
    this.formProducto.limpiarFormulario();
    this.formProducto.modo = 'Agregar';
    this.formProducto.cargarProductos();
    this.dialogoVisible =true;
  }
  editar(producto: Producto){
    this.formProducto.idproducto = producto.idproducto;
    this.formProducto.nombrePro = producto.nombrePro;
    this.formProducto.precioPro = producto.precioPro
    this.formProducto.cantidadPro = producto.cantidadPro;
    this.formProducto.produOferta = producto.produOferta;
    this.formProducto.marcaPro = producto.marcaPro;
    this.formProducto.modo = 'Editar';
    this.formProducto.cargarProductos();
    this.dialogoVisible = true;
    this.tituloDialogo = "Editar Producto"
  }
  eliminar(producto: Producto){
    this.servicioConfirm.confirm({
      message: "¿Realmente desea eliminar el producto: '" + producto.idproducto + "-" + producto.nombrePro + "-" + producto.precioPro + "-" + producto.cantidadPro + "-" + producto.produOferta + "-" + producto.marcaPro + "'?",
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'pi pi-danger',
      acceptIcon: 'pi pi-trash',
      accept: () => {
        this.servicioProductos.delete(producto).subscribe({
          next: () => {
            this.mensajes = [{ severity: 'success', summary: 'Exito', detail: 'Se elimno correctamente el producto'}];
            this.cargarProductos();
          },
          error: (e) => {
            console.log(e);
            const mensaje: string = e.status === 403 || e.status === 401 ? 'No autorizado' : e.message;
            this.mensajes = [{ severity: 'error', summary: 'Error al eliminar', detail: mensaje }];

          }
        });
      }
    })
  }
}
