import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlumnosService } from '../../services/alumnos';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.css']
})
export class Formulario {

  alumno = {
    nombre: '',
    edad: '',
    carrera: ''
  };

  constructor(private alumnosService: AlumnosService){}

  guardar(){
    this.alumnosService.insertarAlumno(this.alumno)
    .subscribe(()=>{
      alert("Alumno guardado");
      location.reload();   // recarga la tabla
    });
  }

}