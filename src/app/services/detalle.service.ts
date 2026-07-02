import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiResponse,PeliculaDetalle} from '../model/pelicula';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;

  private readonly baseIdUrl = environment.baseIdUrl;
  private accessToken = environment.accessToken;

  constructor(private _httpClient: HttpClient) { 
    
  }

  public ObtenerPeliculasService(): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
    );
  }

  public ObtenerPeliculaPorIDService(id:number):Observable<PeliculaDetalle>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<PeliculaDetalle>(
      `${this.baseIdUrl}/${id}&language=en-US`,
      {headers}
    );

  }

  /**
   * Obtiene una pagina de peliculas populares usando el endpoint discover,
   * ordenadas por popularidad descendente y filtrando por ingles/español.
   * @param pagina numero de pagina (por defecto 1)
   */
  public obtenerPeliculasPopulares(pagina: number = 1): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-ES')
      .set('with_original_language', 'en|es')
      .set('sort_by', 'popularity.desc')
      .set('page', pagina.toString());

    return this._httpClient.get<ApiResponse>(`${this.baseUrl}/discover/movie`, { params });
  }

  /**
   * Obtiene una pagina de peliculas mas votadas, con al menos 200 votos.
   * @param pagina numero de pagina (por defecto 1)
   */
  public obtenerPeliculasMasVotadas(pagina: number = 1): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-ES')
      .set('with_original_language', 'en|es')
      .set('sort_by', 'vote_average.desc')
      .set('vote_count.gte', '200')
      .set('page', pagina.toString());

    return this._httpClient.get<ApiResponse>(`${this.baseUrl}/discover/movie`, { params });
  }

  /**
   * Construye la URL completa de una imagen de TMDB.
   * @param ruta path de la imagen 
   * @param tamaño tamaño deseado 
   * @returns URL completa o una imagen placeholder si la ruta es nula
   */
  public obtenerUrlImagen(ruta: string | null, tamaño: string = 'w300'): string {
    if (!ruta) {
      return 'assets/placeholder.png';
    }
    return `https://image.tmdb.org/t/p/${tamaño}${ruta}`;
  }
}