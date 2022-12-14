import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { PedidosService } from '../servicios/pedidos.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {

  menuProducto = {
    label: "Productos",
    icon: "assets/produ.png",
    routerLink: ['productos']
  }

  dockItems: MenuItem[] = [
    {
      label: "Pedidos",
      icon: "assets/pedido.jpg",
      routerLink: ['pedidos']
    },
    {
      label: "Usuario",
      icon: "assets/usuario.jpeg",
      routerLink: ['usuario']
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
  const token: string | null = localStorage.getItem('token');
  if(token){
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const esAdmin: boolean = (jwtHelper.decodeToken(token)).admin;
    if(esAdmin){
      this.dockItems.splice(1, 0, this.menuProducto);
    }
  }
}

  public cerrarSesion(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

}
