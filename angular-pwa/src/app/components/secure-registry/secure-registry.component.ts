import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Secure } from 'src/app/models/Secure';
import { CarBrand } from 'src/app/models/CarBrand';
import { SecureService } from './../../services/secure.service';
import { CarBrandService } from './../../services/car-brand.service';

@Component({
  selector: 'app-secure-registry',
  templateUrl: './secure-registry.component.html',
  styleUrls: ['./secure-registry.component.scss'],
})
export class SecureRegistryComponent implements OnInit {
  public secure = new Secure();
  public carBrands$: Observable<CarBrand[]>;

  constructor(
    private carBrandService: CarBrandService,
    private secureService: SecureService
  ) {}

  ngOnInit(): void {
    this.carBrands$ = this.carBrandService.getMarcas();
  }

  public registry(): void {
    this.secureService.registry(this.secure);
  }
}
