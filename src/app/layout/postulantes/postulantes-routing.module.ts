import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostulantesComponent } from './postulantes.component';

const routes: Routes = [
    { path: '', component: PostulantesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulantesRoutingModule { }
