import { Injectable, Injector } from '@angular/core';

import { Secure } from '../models/Secure';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SecureService extends BaseService<Secure> {
  constructor(protected injector: Injector) {
    super(injector, 'secures', 'http://localhost:9000/api/segures');
  }
}
