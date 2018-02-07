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

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delayWhen';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/range';
import { HttpClient } from '@angular/common/http';
import { appConfigToken, AppConfig } from '../config/app.config';

@Injectable()
export class ApplianceService {
  public readonly RETRY_INTERVAL = 60000;
  public readonly MAX_RETRIES = 10;

  constructor(
    private http: HttpClient,
    @Inject(appConfigToken) private appConfig: AppConfig
  ) {}

  /**
   * Polls the endpoint every couple seconds to check
   * if the appliance is ready
   */
  waitForApplianceReady(): Observable<any> {
    return this.http.get(this.appConfig.baseApiUrl)
      .retryWhen(err => {
        return err.zip(Observable.range(1, this.MAX_RETRIES)).mergeMap(([_, i]) => {
          if (i >= this.MAX_RETRIES) {
            throw Observable.throw(err);
          }
          return Observable.timer(this.RETRY_INTERVAL);
        });
      });
  }
}
