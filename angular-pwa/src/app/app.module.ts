import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  // HTTP_INTERCEPTORS,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MenuComponent } from './components/menu/menu.component';
import { SecureRegistryComponent } from './components/secure-registry/secure-registry.component';
import { SecureListComponent } from './components/secure-list/secure-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SecureRegistryComponent,
    SecureListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
