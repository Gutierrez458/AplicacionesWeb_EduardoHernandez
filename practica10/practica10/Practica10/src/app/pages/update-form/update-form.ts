import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../../services/game';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-form.html',
  styleUrls: ['./update-form.css']
})
export class UpdateFormComponent implements OnInit {

  juego: any = {};
  gameId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: Game
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');

    const state: any = history.state;

    if (state && state.game) {
      this.juego = { ...state.game };
    } else if (this.gameId) {
      this.gameService.getGames().subscribe(list => {
        this.juego = list.find((g: any) => g._id === this.gameId) || {};
      });
    }
  }

  guardar() {
    if (this.gameId) {
      this.gameService.updateGame(this.gameId, this.juego).subscribe({
        next: () => {
          alert('Juego actualizado correctamente');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}