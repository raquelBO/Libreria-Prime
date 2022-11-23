import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDetallesPedidoComponent } from './formulario-detalle-pedido.component';

describe('FormularioDetallesPedidoComponent', () => {
  let component: FormularioDetallesPedidoComponent;
  let fixture: ComponentFixture<FormularioDetallesPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDetallesPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDetallesPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
