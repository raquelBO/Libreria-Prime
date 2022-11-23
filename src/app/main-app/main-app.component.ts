import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: "Libreria",
      icon: PrimeIcons.BOOK,
      items: [
        {
          label: "Pedidos",
          icon: PrimeIcons.BOOKMARK,
          routerLink: ['pedidos']
        },
        {
          label: "Productos",
          icon: PrimeIcons.BOOK,
          routerLink: ['productos']
        },
        {
          label: "Usuario",
          icon: PrimeIcons.USERS,
          routerLink: ['usuario']
        },
        {
          label: "Detalles Pedido",
          icon: PrimeIcons.BOOK,
          routerLink: ['detallesPedido']
        },
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
