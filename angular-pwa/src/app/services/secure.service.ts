import { OnlineOfflineService } from './online-offline.service';
import { Observable } from 'rxjs';
import { Secure } from 'src/app/models/Secure';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SecureService {
  private API = 'http://localhost:9000';

  constructor(
    private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService
  ) {
    this.connectionStatusListener();
  }

  public saveApi(secure: Secure) {
    this.http.post(`${this.API}/api/seguros`, secure).subscribe(
      () => alert('Seguro foi cadastrado com sucesso'),
      (err) => console.log('Erro ao cadastrar seguro')
    );
  }

  public registry(secure: Secure) {
    if (this.onlineOfflineService.isOnline) {
      this.saveApi(secure);
    } else {
      console.log('salvar seguro no banco local');
    }
  }

  public list(): Observable<Secure[]> {
    return this.http.get<Secure[]>(`${this.API}/api/seguros`);
  }

  private connectionStatusListener() {
    this.onlineOfflineService.conectionStatus.subscribe((online) => {
      if (online) {
        console.log('Enviando os dados do meu banco local para API');
      } else {
        console.log('Estou offline');
      }
    });
  }
}
