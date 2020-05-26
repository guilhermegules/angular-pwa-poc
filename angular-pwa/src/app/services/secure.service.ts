import { OnlineOfflineService } from './online-offline.service';
import { Observable } from 'rxjs';
import { Secure } from 'src/app/models/Secure';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class SecureService {
  private API = 'http://localhost:9000';
  private db: Dexie;
  private table: Dexie.Table<Secure, any> = null;

  constructor(
    private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService
  ) {
    this.connectionStatusListener();
    this.initDb();
  }

  private initDb() {
    this.db = new Dexie('db-secures');
    this.db.version(1).stores({
      secure: 'carBoard',
    });
    this.table = this.db.table('secure');
  }

  public saveApi(secure: Secure): void {
    this.http.post(`${this.API}/api/seguros`, secure).subscribe(
      () => alert('Seguro foi cadastrado com sucesso'),
      (err) => console.log('Erro ao cadastrar seguro')
    );
  }

  private async saveIndexedDb(secure: Secure): Promise<any> {
    try {
      await this.table.add(secure);
      const allSecures: Secure[] = await this.table.toArray();
      console.log('Seguro foi salvo no indexDB', allSecures);
    } catch (error) {
      console.log('Erro ao salvar', error);
    }
  }

  private async sendIndexedDb() {
    const allSecures: Secure[] = await this.table.toArray();
    for (const secure of allSecures) {
      this.saveApi(secure);
      await this.table.delete(secure.carBoard);
      console.log(
        `Seguro do carro com a placa ${secure.carBoard} foi excluido com sucesso`
      );
    }
  }

  public registry(secure: Secure): void {
    if (this.onlineOfflineService.isOnline) {
      this.saveApi(secure);
    } else {
      this.saveIndexedDb(secure);
    }
  }

  public list(): Observable<Secure[]> {
    return this.http.get<Secure[]>(`${this.API}/api/seguros`);
  }

  private connectionStatusListener() {
    this.onlineOfflineService.conectionStatus.subscribe((online) => {
      if (online) {
        this.sendIndexedDb();
      } else {
        console.log('Estou offline');
      }
    });
  }
}
