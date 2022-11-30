import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { PedidoService } from '../servicios/pedidos.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {

  dockItems: MenuItem[] = [
    {
      label: "Pedidos",
      icon: "assets/pedido.jpg",
      routerLink: ['pedidos']
    },
    {
      label: "Productos",
      icon: "assets/produ.png",
      routerLink: ['productos']
    },
    {
      label: "Usuario",
      icon: "assets/usuario.jpeg",
      routerLink: ['usuario']
    },
    {
      label: "Detalles Pedido",
      icon: "assets/detalles.jpg",
      routerLink: ['detallesPedido']
    },
    {
      label: 'Cerrar Sesion',
      icon: "assets/cerrar.png",
      command: () => this.cerrarSesion()
    }
  ];

constructor(
  private router : Router
) { }

ngOnInit(): void {
}

  public cerrarSesion(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

}
