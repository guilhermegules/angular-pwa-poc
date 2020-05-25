import { Observable } from 'rxjs';
import { Secure } from 'src/app/models/Secure';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SecureService {
  private API = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  registry(secure: Secure) {
    this.http.post(`${this.API}/api/seguros`, secure).subscribe(
      () => alert('Seguro foi cadastrado com sucesso'),
      (err) => console.log('Erro ao cadastrar seguro')
    );
  }

  list(): Observable<Secure[]> {
    return this.http.get<Secure[]>(`${this.API}/api/seguros`);
  }
}
