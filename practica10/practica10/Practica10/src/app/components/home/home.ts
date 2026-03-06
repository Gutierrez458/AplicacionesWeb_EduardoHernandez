import { Component, OnInit } from '@angular/core';
import { Game } from '../../services/game';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  games: any[] = [];   // ✅ arreglo para guardar juegos

  constructor(private game: Game, private router: Router) {}

  ngOnInit(): void {
    this.cargarGames();
  }

  cargarGames() {
    this.game.getGames().subscribe(data => {
      this.games = data;
    });
  }

  irEliminar(juego: any) {
    // navegamos a la ruta de confirmación pasando el objeto en el estado
    this.router.navigate(['/delete', juego._id], { state: { game: juego } });
  }
}