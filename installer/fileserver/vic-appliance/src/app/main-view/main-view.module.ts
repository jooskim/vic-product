/*
 Copyright 2018 VMware, Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import { AuthService } from './../services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';
import { ClarityModule } from '@clr/angular';
import { RouterModule, Routes } from '@angular/router';
import { InitGuardService } from '../services/init-guard.service';
import { LocalStorageService } from '../services/localstorage.service';
import { GettingStartedComponent } from './getting-started/getting-started.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    canActivate: [ InitGuardService ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ MainViewComponent, GettingStartedComponent ],
  exports: [ RouterModule ],
  providers: [
    InitGuardService,
    AuthService,
    LocalStorageService
  ]
})
export class MainViewModule { }
