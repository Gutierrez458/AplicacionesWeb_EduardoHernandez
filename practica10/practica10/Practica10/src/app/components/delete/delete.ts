import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../../services/game';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete.html',
  styleUrls: ['./delete.css']
})
export class DeleteComponent implements OnInit {
  game: any = null;
  gameId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: Game
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    // intenta leer el juego desde el estado de navegación
    const state: any = history.state;
    if (state && state.game) {
      this.game = state.game;
    }
    // si no había objeto, podríamos cargar los datos desde el servidor
    if (!this.game && this.gameId) {
      this.gameService.getGames().subscribe(list => {
        this.game = list.find((g: any) => g._id === this.gameId) || null;
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  confirmarEliminar() {
    if (this.gameId) {
      this.gameService.deleteGame(this.gameId).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
