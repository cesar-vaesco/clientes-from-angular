import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
    selector: 'app-crear-producto',
    templateUrl: './crear-producto.component.html',
    styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

    productoForm: FormGroup;
    titulo = 'crear producto';
    id: string | null;

    constructor(private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private _productoService: ProductoService,
        private aRouter: ActivatedRoute) {
        this.productoForm = this.fb.group({

            producto: ['', Validators.required],
            categoria: ['', Validators.required],
            ubicacion: ['', Validators.required],
            precio: ['', Validators.required],
        })
        this.id = this.aRouter.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.esEditar();
    }

    agregarProducto() {
        this.spinner.show();
        console.log(this.productoForm);
        console.log(this.productoForm.get('producto')?.value);

        const PRODUCTO: Producto = {
            nombre: this.productoForm.get('producto')?.value,
            categoria: this.productoForm.get('categoria')?.value,
            ubicacion: this.productoForm.get('ubicacion')?.value,
            precio: this.productoForm.get('precio')?.value,
        }

        if (this.id !== null) {
            // Editamos producto
            this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {

                this.toastr.info(`El producto ' ${PRODUCTO.nombre} ' fue actualizado con éxito!(^・ω・^ )`, 'Producto actualizado!',{
                    timeOut: 2500,
                });

                setTimeout(() => {
                    this.spinner.hide();
                    this.router.navigate(['/']);
                }, 2000);


            }, error => {
                this.toastr.error('El producto NO fue editado!', '¯\_(ツ)_/¯');
                console.log(error);
                this.productoForm.reset();
            })

        } else {
            //agregamos producto
            console.log(PRODUCTO);

            this._productoService.guardarProducto(PRODUCTO).subscribe(data => {

                this.toastr.success(`El producto ' ${PRODUCTO.nombre} ' fue registrado con éxito!`, 'Producto registrado!', {
                    timeOut: 4000,
                });
                setTimeout(() => {
                    this.spinner.hide();
                    this.router.navigate(['/']);
                }, 2000);
            }, error => {
                this.toastr.error('El producto NO fue creado!', '¯\_(ツ)_/¯');
                console.log(error);
                this.productoForm.reset();
            })
        }
    }

    esEditar() {
        if (this.id !== null) {
            this.titulo = 'editar producto';
            this._productoService.obtenerProducto(this.id).subscribe(data => {

                this.productoForm.setValue({
                    producto: data.nombre,
                    categoria: data.categoria,
                    ubicacion: data.ubicacion,
                    precio: data.precio
                })
            }, error => {
                this.toastr.error('El producto NO fue editado!', '¯\_(ツ)_/¯');
                console.log(error);
                this.productoForm.reset();
            })
        }
    }


}
