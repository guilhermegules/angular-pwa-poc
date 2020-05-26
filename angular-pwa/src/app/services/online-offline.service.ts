import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {

  private connectionStatus$ = new Subject<boolean>();

  constructor() {
    window.addEventListener('online', () => this.updateConnection());
    window.addEventListener('offline', () => this.updateConnection());
  }

  get isOnline(): boolean {
    return !!window.navigator.onLine;
  }

  get conectionStatus(): Observable<boolean> {
    return this.connectionStatus$.asObservable();
  }

  public updateConnection() {
    this.connectionStatus$.next(this.isOnline);
  }
}
