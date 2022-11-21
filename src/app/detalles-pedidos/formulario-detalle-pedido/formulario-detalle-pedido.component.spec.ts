import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDetallePedidoComponent } from './formulario-detalle-pedido.component';

describe('FormularioDetallePedidoComponent', () => {
  let component: FormularioDetallePedidoComponent;
  let fixture: ComponentFixture<FormularioDetallePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDetallePedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
