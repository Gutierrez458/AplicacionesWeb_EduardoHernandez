import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Game } from '../../services/game';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css']
})
export class AddComponent {
  nuevo: any = {};

  constructor(private game: Game, private router: Router) {}

  guardar() {
    this.game.addGame(this.nuevo).subscribe(() => {
      // después de guardar, regresamos a la lista principal
      this.router.navigate(['/']);
    });
  }
}
