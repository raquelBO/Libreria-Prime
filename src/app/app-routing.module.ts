import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PedidosComponent } from "./pedidos/pedidos.component";
import { ProductosComponent } from "./productos/productos.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { LoginComponent } from "./login/login.component";
import { MainAppComponent } from "./main-app/main-app.component";

const routes : Routes = [
    { path: 'app', component: MainAppComponent, children: [
        { path: 'pedidos', component: PedidosComponent },
        { path: 'productos', component: ProductosComponent },
        { path: 'usuarios', component: UsuariosComponent },
    ]},
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}