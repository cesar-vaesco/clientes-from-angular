import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
    selector: 'app-listar-productos',
    templateUrl: './listar-productos.component.html',
    styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

    titulo: string = "LISTADO DE PRODUCTOS";

    listProductos: Producto[] = [];

    constructor(private productoService: ProductoService) { }

    ngOnInit(): void {

        this.obtenerProductos();
    }

    obtenerProductos() {
        this.productoService.getProductos().subscribe(data => {

            console.log(data);
            this.listProductos = data;

        }, error => {
            console.log(error)
        }
        )
    }

}
