import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductosComponent } from './productos/productos.component'; 
import { FormularioPedidoComponent } from './pedidos/formulario-pedido/formulario-pedido.component';
import { FormularioProductoComponent } from './productos/formulario-producto/formulario-producto.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MenubarModule} from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MainAppComponent } from './main-app/main-app.component';
import { LoginComponent } from './login/login.component';
import { DetallesPedidoComponent } from './detalles-pedidos/detalles-pedidos.component';
import { FormularioDetallesPedidoComponent } from './detalles-pedidos/formulario-detalle-pedido/formulario-detalle-pedido.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormularioUsuarioComponent } from './usuario/formulario-usuario/formulario-usuario.component';
import { PasswordModule } from 'primeng/password';
import { SesionGuard } from './guards/sesion.guard';
import { CalendarModule } from 'primeng/calendar';
import {DockModule} from 'primeng/dock';

@NgModule({
  declarations: [
    AppComponent,
    PedidosComponent,
    ProductosComponent,
    FormularioPedidoComponent,
    FormularioProductoComponent,
    MainAppComponent,
    LoginComponent,
    UsuarioComponent,
    DetallesPedidoComponent,
    FormularioDetallesPedidoComponent,
    FormularioUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    HttpClientModule,
    TableModule,
    CardModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    DropdownModule,
    ReactiveFormsModule,
    CalendarModule,
    PasswordModule,
    DockModule
  ],
  providers: [ConfirmationService, SesionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
