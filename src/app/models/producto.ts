
export class Producto {
    _id?: number;
    nombre: string;
    categoria: string;
    ubicacion: string;
    precio: number;

    constructor(categoria: string, nombre: string, ubicacion: string, precio: number) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.ubicacion = ubicacion;
        this.precio = precio;
    }
}
