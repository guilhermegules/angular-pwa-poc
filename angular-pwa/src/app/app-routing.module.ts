import { SecureRegistryComponent } from './components/secure-registry/secure-registry.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureListComponent } from './components/secure-list/secure-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cadastro' },
  { path: 'cadastro', component: SecureRegistryComponent },
  { path: 'listar', component: SecureListComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'cadastro' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
