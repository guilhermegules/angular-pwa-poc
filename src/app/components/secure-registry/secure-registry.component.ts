import { CarBrandService } from './../../services/car-brand.service';
import { Component, OnInit } from '@angular/core';
import { Secure } from 'src/app/models/Secure';
import { CarBrand } from 'src/app/models/CarBrand';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-secure-registry',
  templateUrl: './secure-registry.component.html',
  styleUrls: ['./secure-registry.component.scss']
})
export class SecureRegistryComponent implements OnInit {

  public secure = new Secure();
  public carBrands$: Observable<CarBrand[]>;

  constructor(private carBrandService: CarBrandService) { }

  ngOnInit(): void {
    this.carBrands$ = this.carBrandService.getMarcas();
  }

}
