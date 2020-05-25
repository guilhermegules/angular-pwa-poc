import { Observable } from 'rxjs';
import { SecureService } from './../../services/secure.service';
import { Component, OnInit } from '@angular/core';

import { Secure } from 'src/app/models/Secure';

@Component({
  selector: 'app-secure-list',
  templateUrl: './secure-list.component.html',
  styleUrls: ['./secure-list.component.scss'],
})
export class SecureListComponent implements OnInit {
  public secures$: Observable<Secure[]>;

  constructor(private secureService: SecureService) {}

  ngOnInit(): void {
    this.secures$ = this.secureService.list();
  }
}
