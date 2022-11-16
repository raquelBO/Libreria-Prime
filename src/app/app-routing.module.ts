import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PedidosComponent } from "./pedidos/pedidos.component";
import { ProductosComponent } from "./productos/productos.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

const routes : Routes = [
    { path: 'pedidos', component: PedidosComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}