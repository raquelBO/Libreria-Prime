import { DetallesPedido } from "./detallesPedido.interface";

export interface Pedido {
    idpedido: number  | null;
    idusuario:   number  | null;
    fechaPedido: Date  | null;
    fechaEntrega : Date | null;
    detallesPedidos?: DetallesPedido[];
    usuario?: string;
    total?: number;
}