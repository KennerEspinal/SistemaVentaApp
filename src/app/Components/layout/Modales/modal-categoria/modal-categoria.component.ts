import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Categoria } from 'src/app/Interfaces/categoria';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent implements OnInit {

  formularioCategoria: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaCategorias: Categoria[] = [];


  constructor(
    private modalActual: MatDialogRef<ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCategoria: Categoria,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioCategoria = this.fb.group({
      nombre: ['', Validators.required],
      esActivo: ['1', Validators.required]
    });

    if (this.datosCategoria != null) {

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }


    this._categoriaServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaCategorias = data.value
      },
      error: (e) => { }
    })

  }

  ngOnInit(): void {
    if (this.datosCategoria != null) {
      this.formularioCategoria.patchValue({

        nombre: this.datosCategoria.nombre,
        esActivo: this.datosCategoria.esActivo.toString()
      });

    }
  }

  guardarEditar_Categoria() {

    const _categoria: Categoria = {
      idCategoria: this.datosCategoria == null ? 0 : this.datosCategoria.idCategoria,
      nombre: this.formularioCategoria.value.nombre,
      esActivo: parseInt(this.formularioCategoria.value.esActivo),
    }

    if (this.datosCategoria == null) {

      this._categoriaServicio.guardar(_categoria).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("El producto fue registrado", "Exito");
            this.modalActual.close("true")
          } else
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el producto", "Error")
        },
        error: (e) => { }
      })

    } else {

      this._categoriaServicio.editar(_categoria).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("El producto fue editado", "Exito");
            this.modalActual.close("true")
          } else
            this._utilidadServicio.mostrarAlerta("No se pudo editar el producto", "Error")
        },
        error: (e) => { }
      })
    }

  }

}
