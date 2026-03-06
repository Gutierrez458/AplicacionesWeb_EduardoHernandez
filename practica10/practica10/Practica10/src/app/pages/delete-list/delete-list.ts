import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Game } from '../../services/game';

@Component({
  selector: 'app-delete-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-list.html',
  styleUrls: ['./delete-list.css']
})
export class DeleteListComponent implements OnInit {
  games: any[] = [];

  constructor(private gameService: Game, private router: Router) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }

  seleccionarParaEliminar(juego: any): void {
    this.router.navigate(['/delete', juego._id], { state: { game: juego } });
  }
}
