export interface Pedido {
    idpedido: number  | null;
    idusuario:   number  | null;
    fechaPedido: Date  | null;
    fechaEntrega : Date | null;
}