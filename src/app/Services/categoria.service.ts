import { Injectable } from '@angular/core';


import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Categoria } from '../Interfaces/categoria';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private urlApi: string = environment.endpoint + "Categoria/";

  constructor(private http: HttpClient) { }

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }

  guardar(request: Categoria): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request)
  }

  editar(request: Categoria): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request)
  }

  eliminar(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`)
  }


}
