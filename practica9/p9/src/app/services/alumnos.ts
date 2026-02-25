import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  url = 'http://127.0.0.1:5001/alumnos';

  constructor(private http: HttpClient) {}

  obtenerAlumnos(){
    return this.http.get<any[]>(this.url);
  }

  insertarAlumno(alumno:any){
    return this.http.post(this.url, alumno);
  }
}