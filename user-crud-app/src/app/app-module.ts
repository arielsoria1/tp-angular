import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// modulos agregados
import { FormsModule } from '@angular/forms'; // para [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // para UserService
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // para NgbModal
// ------------------------

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// componente agregado
import { UserListComponent } from './components/user-list/user-list'; 

@NgModule({
  declarations: [
    App,
    UserListComponent // agregado
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,        // agregado
    HttpClientModule,   // agregado
    NgbModule           // agregado
  ],
  providers: [
    provideBrowserGlobalErrorListeners() 
  ],
  bootstrap: [App] // 
})
export class AppModule { }