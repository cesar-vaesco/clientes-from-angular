import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

    constructor(private productoService: ProductoService,
        private toastr: ToastrService) { }

    ngOnInit(): void {

        this.obtenerProductos();
    }

    obtenerProductos() {
        this.productoService.getProductos().subscribe(data => {

            console.log(data);
            this.listProductos = data;

        }, error => {
            console.log(error)
        })
    }

    eliminarProducto(id: any) {
        this.productoService.eliminarProducto(id).subscribe(data => {
            this.toastr.error('El producto fue eliminado con éxito! :) ', 'Producto eliminado');
            this.obtenerProductos();
        }, error => {
            this.toastr.error(' :(  El producto fue encontrado!', 'Producto no fue eliminado');
            console.log(error);
        })
    }

}
