import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interface/pedido.interface';
import { PedidoService } from 'src/app/servicios/pedidos.service';
import { ProductoService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.css']
})
export class FormularioPedidoComponent implements OnInit {

  idproducto: number | null = null;
  cantidad: number | null = null;
  producto: string | null = null;
  marca: string | null = null;

  idproductoValido: boolean = true;
  cantidadValido: boolean = true;
  productoValido: boolean = true;
  marcaValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Registrar' | 'Editar' = 'Registrar';
  listaAutores: Pedido[] = [];

  @Output()
  recargarLibros: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private servicioPedidos: PedidoService,
    private servicioProductos: ProductoService
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
        console.log('Error al cargar productos');
        console.log(e);
        this.mensajes = [{severity: 'Error', summary: 'Error al cargar productos'}]
      }
    })
  }

}
