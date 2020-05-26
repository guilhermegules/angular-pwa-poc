import { Injectable, Injector, Inject } from '@angular/core';

import Dexie from 'dexie';

import { HttpClient } from '@angular/common/http';
import { OnlineOfflineService } from './online-offline.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T extends { id: string }> {
  private db: Dexie;
  private table: Dexie.Table<T, any> = null;

  protected http: HttpClient;
  protected onlineOfflineService: OnlineOfflineService;

  constructor(
    protected injector: Injector,
    @Inject(String) private tableName: string,
    @Inject(String) private apiUrl: string
  ) {
    this.http = this.injector.get(HttpClient);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);
    this.connectionStatusListener();
    this.initDb();
  }

  private initDb() {
    this.db = new Dexie('secures');
    this.db.version(1).stores({
      [this.tableName]: 'id',
    });
    this.table = this.db.table(this.tableName);
  }

  public saveApi(table: T): void {
    this.http.post(this.apiUrl, table).subscribe(
      () => alert('Seguro foi cadastrado com sucesso'),
      (err) => console.log('Erro ao cadastrar seguro')
    );
  }

  private async saveIndexedDb(table: T): Promise<any> {
    try {
      await this.table.add(table);
      const allTables: T[] = await this.table.toArray();
      console.log(`${this.tableName} foi salvo no indexDB`, allTables);
    } catch (error) {
      console.log(`Erro ao salvar na tabela ${this.tableName}`, error);
    }
  }

  private async sendIndexedDb(): Promise<any> {
    try {
      const allTables: T[] = await this.table.toArray();
      for (const table of allTables) {
        this.saveApi(table);
        await this.table.delete(table.id);
        console.log(`A tabela com o id ${table.id} foi excluido com sucesso`);
      }
    } catch (error) {
      console.log('Erro em adicionar dados', error);
    }
  }

  public registry(table: T): void {
    if (this.onlineOfflineService.isOnline) {
      this.saveApi(table);
    } else {
      this.saveIndexedDb(table);
    }
  }

  public list(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
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
