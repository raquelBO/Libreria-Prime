export interface DetallesPedido {
    idpedido : number | null;
    idproducto:   number  | null;
    cantidad:   number  | null;
    precio : number | null;
    nombreProducto?: string | null;
    subtotal: number;
}