import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { login } from './login/login.component';
import { contactsScreen } from './contactsScreen/contactsScreen.component'
import { newContactModal } from './newContactModal/newContactModal.component';
import { HealthCheckComponent} from './health-check/health-check.component'
/*import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
*/

import { DragModalDirective } from './directives/DragModalDirective';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    login,
    contactsScreen,
    newContactModal,
    HealthCheckComponent,
    DragModalDirective,
/*    CounterComponent,
    FetchDataComponent
*/  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: login, pathMatch: 'full' },
      { path: 'mainpage', component: contactsScreen },
      /*{ path: 'modal', component: newContactModal },*/
      { path: 'health-check', component: HealthCheckComponent },

  /*    { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
  */  ]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
