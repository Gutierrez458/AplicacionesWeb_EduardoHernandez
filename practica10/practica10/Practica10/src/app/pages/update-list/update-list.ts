import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Game } from '../../services/game';

@Component({
  selector: 'app-update-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-list.html',
  styleUrls: ['./update-list.css']
})
export class UpdateListComponent implements OnInit {
  games: any[] = [];

  constructor(private gameService: Game, private router: Router) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }

  seleccionarParaActualizar(juego: any): void {
    this.router.navigate(['/update', juego._id], { state: { game: juego } });
  }
}
