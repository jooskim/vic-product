import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { AuthService } from '../services/auth.service';
import { ApplianceService } from '../services/appliance.service';
import { AppRoutingModule } from '../app-routing.module';
import { LocalStorageService } from '../services/localstorage.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { appConfigToken } from '../config/app.config';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        AppRoutingModule,
        HttpClientModule
      ],
      providers: [
        AuthService,
        ApplianceService,
        LocalStorageService,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        {
          provide: appConfigToken,
          useValue: {
            baseApiUrl: 'api'
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
