import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  constructor() {
    window.addEventListener('online', () => console.log('está online'));
    window.addEventListener('offline', () => console.log('está offline'));
   }
}
