import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosService } from '../../services/alumnos';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.html',
  styleUrls: ['./tabla.css']
})
export class Tabla implements OnInit {

  alumnos:any[] = [];

  constructor(private servicio: AlumnosService){}

  ngOnInit(){
    this.servicio.obtenerAlumnos()
    .subscribe(data=>{
      this.alumnos = data;
    });
  }

}