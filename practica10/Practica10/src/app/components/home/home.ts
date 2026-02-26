import { Component, OnInit } from '@angular/core';
import { Game } from '../../services/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  games: any[] = [];   // ✅ arreglo para guardar juegos
  nuevo: any = {};     // ✅ objeto para formulario
  mostrarModalEliminar = false;  // ✅ controlar visibilidad del modal
  juegoAEliminar: any = null;    // ✅ juego seleccionado para eliminar

  constructor(private game: Game) {}

  ngOnInit(): void {
    this.cargarGames();
  }

  cargarGames() {
    this.game.getGames().subscribe(data => {
      this.games = data;
    });
  }

  guardar() {
    this.game.addGame(this.nuevo).subscribe(() => {
      this.cargarGames();
      this.nuevo = {};
    });
  }

  abrirModalEliminar(juego: any) {
    this.juegoAEliminar = juego;
    this.mostrarModalEliminar = true;
  }

  cerrarModal() {
    this.mostrarModalEliminar = false;
    this.juegoAEliminar = null;
  }

  confirmarEliminar() {
    if (this.juegoAEliminar && this.juegoAEliminar._id) {
      this.game.deleteGame(this.juegoAEliminar._id).subscribe(() => {
        this.cargarGames();
        this.cerrarModal();
      });
    }
  }
}