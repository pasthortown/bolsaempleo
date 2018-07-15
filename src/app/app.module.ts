import { FirebaseBDDService } from './services/firebase-bdd.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostulanteComponent } from './components/sidebars/postulante/postulante.component';
import { EmpresaComponent } from './components/sidebars/empresa/empresa.component';
import { CommonModule } from '@angular/common';
import { DatosPostulanteComponent } from './components/modals/datos-postulante/datos-postulante.component';
import { DatosEmpresaComponent } from './components/modals/datos-empresa/datos-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostulanteComponent,
    EmpresaComponent,
    DatosPostulanteComponent,
    DatosEmpresaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [FirebaseBDDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
