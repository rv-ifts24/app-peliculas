import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pelicula } from '../../../model/pelicula';
import { DetalleService } from '../../../services/detalle.service';

@Component({
  selector: 'app-tarjeta-pelicula',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './tarjeta-pelicula.component.html',
  styleUrl: './tarjeta-pelicula.component.css'
})
export class TarjetaPeliculaComponent {
  @Input() pelicula!: Pelicula;

  constructor(private detalleService: DetalleService) { }

  obtenerPoster(): string {
    return this.detalleService.obtenerUrlImagen(this.pelicula.poster_path, 'w300');
  }

  obtenerAnio(): string {
    if (!this.pelicula.release_date) return '';
    return new Date(this.pelicula.release_date).getFullYear().toString();
  }
}
