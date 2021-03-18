import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-listar-productos',
    templateUrl: './listar-productos.component.html',
    styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

    titulo: string = "LISTADO DE PRODUCTOS";
    constructor() { }

    ngOnInit(): void {
    }

}
