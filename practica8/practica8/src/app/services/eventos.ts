import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class Eventos {
  private API = 'http://localhost:5000/eventos';

  constructor(private http: HttpClient) {}

  obtenerEventos() {
    return this.http.get<any[]>(this.API);
  }
  
}