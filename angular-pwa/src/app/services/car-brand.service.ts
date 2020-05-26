import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CarBrand } from '../models/CarBrand';

interface CarResponse {
  Makes: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {
  private CARS_API =
    'http://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes';

  constructor(private http: HttpClient) {}

  private brands(brands): CarBrand[] {
    return brands.map((brand) => ({
      code: brand.make_id,
      name: brand.make_display,
    }));
  }

  public getMarcas(): Observable<CarBrand[]> {
    return this.http
      .jsonp(this.CARS_API, 'callback')
      .pipe(map((res: CarResponse) => this.brands(res.Makes)));
  }
}
