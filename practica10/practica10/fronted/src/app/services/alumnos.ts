import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Games {

private API = 'https://videojuegos-iyxo.onrender.com/games';

  constructor(private http: HttpClient) {}

  obtenerGames() {
    return this.http.get<any[]>(this.API);
  }

  agregarGame(game: any) {
    return this.http.post(this.API, game);
  }

  actualizarGame(id: string, game: any) {
    return this.http.put(`${this.API}/${id}`, game);
  }

  eliminarGame(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}