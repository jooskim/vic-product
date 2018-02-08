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

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApplianceService } from './appliance.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class InitGuardService implements CanActivate {
  constructor(
    private applService: ApplianceService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    // wait until appliance becomes stabilized
    // once it's stabilized check if the appliance was already initialized
    return this.applService
      .waitForApplianceReady(1)
      .catch(err => {
        console.warn('Appliance is not responding. Redirecting to the init page');
        this.router.navigate(['init']);
        return Observable.throw(err);
      })
      .switchMap(results => {
        return this.applService
                   .isApplianceInitialized()
                   .do(v => {
                     if (!v) {
                       this.router.navigate(['init']);
                       return;
                     }
                   });
      });
  }
}
