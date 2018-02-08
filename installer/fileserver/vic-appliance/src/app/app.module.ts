import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import { ApplianceInitComponent } from './applianceInit/applianceInit.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { LocalStorageService } from './services/localstorage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplianceService } from './services/appliance.service';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { appConfigToken } from './config/app.config';

@NgModule({
  declarations: [
    AppComponent,
    ApplianceInitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    LocalStorageService,
    ApplianceService,
    {
      provide: appConfigToken,
      useValue: {
        baseApiUrl: 'api'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
