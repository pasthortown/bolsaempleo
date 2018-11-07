import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'postulantes'},
      {path: 'postulantes', loadChildren: './postulantes/postulantes.module#PostulantesModule'},
      {path: 'empresas', loadChildren: './empresas/empresas.module#EmpresasModule'},
      {path: 'hoja-vida', loadChildren: './hoja-vida/hoja-vida.module#HojaVidaModule'},
      {path: 'postulaciones', loadChildren: './postulaciones/postulaciones.module#PostulacionesModule'},
      {path: 'perfil-empresa', loadChildren: './perfil-empresa/perfil-empresa.module#PerfilEmpresaModule'},
      {path: 'curriculum', loadChildren: './curriculum/curriculum.module#CurriculumModule'},
      {path: 'account', loadChildren: './account/account.module#AccountModule'},
      {path: 'about', loadChildren: './about/about.module#AboutModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
