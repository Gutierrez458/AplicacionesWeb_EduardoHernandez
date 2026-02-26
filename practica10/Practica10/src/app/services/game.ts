import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Game {

  private apiUrl = 'http://localhost:5001/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addGame(game: any): Observable<any> {
    return this.http.post(this.apiUrl, game);
  }

  deleteGame(gameId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${gameId}`);
  }
}