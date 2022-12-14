import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PedidosComponent } from "./pedidos/pedidos.component";
import { ProductosComponent } from "./productos/productos.component";
import { UsuarioComponent } from "./usuario/usuario.component";
import { LoginComponent } from "./login/login.component";
import { MainAppComponent } from "./main-app/main-app.component";
import { DetallesPedidoComponent } from "./detalles-pedidos/detalles-pedidos.component";
import { SesionGuard } from "./guards/sesion.guard";
import { CrearUsuarioComponent } from "./crear-usuario/crear-usuario.component";

const routes : Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'app', component: MainAppComponent, canActivate: [SesionGuard] ,children: [
        { path: 'pedidos', component: PedidosComponent },
        { path: 'productos', component: ProductosComponent },
        { path: 'usuario', component: UsuarioComponent }
    ]},
    { path: 'login', component: LoginComponent },
    { path: 'crearusuario', component: CrearUsuarioComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}