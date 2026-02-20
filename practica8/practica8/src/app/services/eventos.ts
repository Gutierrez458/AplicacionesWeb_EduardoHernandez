import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private API = 'http://127.0.0.1:5001/eventos';

  constructor(private http: HttpClient) {}

  obtenerEventos() {
    return this.http.get<any[]>(this.API);
  }
}