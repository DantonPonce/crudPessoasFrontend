import { Pessoa } from './../models/Pessoa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  baseURL: string = 'https://localhost:5001/api/pessoas';

  constructor(
    private _http: HttpClient
  ) { }

  pegarTodos(): Observable<Pessoa[]>{
    return this._http.get<Pessoa[]>(this.baseURL);
  }

  pegarPessoaPeloId(idPessoa: number): Observable<Pessoa>{
    return this._http.get<Pessoa>(`${this.baseURL}/${idPessoa}`)
  }

  salvarPessoa(pessoa: Pessoa): Observable<Pessoa>{
    return this._http.post<Pessoa>(this.baseURL, pessoa, httpOptions);
  }

  atualizarPessoa(pessoa: Pessoa): Observable<any>{
    return this._http.put<Pessoa>(this.baseURL, pessoa, httpOptions);
  }

  excluirPessoa(idPessoa: number): Observable<any>{
    return this._http.delete<number>(`${this.baseURL}/${idPessoa}`, httpOptions)
  }


}
