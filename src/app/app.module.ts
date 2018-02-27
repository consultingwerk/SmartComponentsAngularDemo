import { GridModule } from '@progress/kendo-angular-grid';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SmartComponentLibraryModule, SmartRouteGuard, SmartFormOutletComponent } from '@consultingwerk/smartcomponent-library';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomRootComponent } from './custom-root/custom-root.component';
import { SessionInfoModule } from './session-info/session-info.module';
import { AblDojoModule } from './abl-dojo/abl-dojo.module';
import { FileInfoModule } from './file-info/file-info.module';
import { AppserverManagerModule } from './appserver-manager/appserver-manager.module';
import { ServersideLoggingModule } from './serverside-logging/serverside-logging.module'
import { LogoutComponent } from './logout/logout.component';

import { load } from '@progress/kendo-angular-intl';
import * as likelySubtags from 'cldr-data/supplemental/likelySubtags.json';
import * as weekData from 'cldr-data/supplemental/weekData.json';
import * as currencyData from 'cldr-data/supplemental/currencyData.json';
import * as numbers from 'cldr-data/main/de/numbers.json';
import * as timeZoneNames from 'cldr-data/main/de/timeZoneNames.json';
import * as calendar from 'cldr-data/main/de/ca-gregorian.json';
import * as currencies from 'cldr-data/main/de/currencies.json';
import * as dateFields from 'cldr-data/main/de/dateFields.json';
import { CustomerMaintenanceFormModule } from './forms/customer-maintenance/customer-maintenance.form';
import { DeveloperToolsCustomFormModule } from './forms/developer-tools-custom/developer-tools-custom.form';
import { StartPageModule } from './start-page/chart-template.component';

load(
  likelySubtags,
  weekData,
  currencyData,
  numbers,
  currencies,
  calendar,
  dateFields,
  timeZoneNames
);

@NgModule({
  declarations: [
    AppComponent,
    CustomRootComponent,
    LogoutComponent
  ],
  entryComponents: [LogoutComponent],
  imports: [
    BrowserModule,
    DeveloperToolsCustomFormModule,
    CustomerMaintenanceFormModule,
    StartPageModule,
    SmartComponentLibraryModule.forRoot({
      defaultRoute: '/start',
      serviceURI: 'http://192.168.0.44:8820/',
      //templateURI: 'http://localhost:8820/web',
      // smartRestURI: 'http://localhost:8820/web/',
      // imageURI: 'http://localhost:8820/static/smartimages/',
      //
      // serviceURI: 'http://192.168.0.44:8820/web',
      //
      // serviceURI: 'http://localhost:8980/SmartJsdoBackendService',
      // catalogURI: 'http://localhost:8980/SmartJsdoBackendService/rest/SmartJsdoBackendService',
      // smartRestURI: 'http://localhost:8980/SmartJsdoBackendService/static/staticbackend/',
      // imageURI: 'http://localhost:8980/SmartJsdoBackendService/static/smartimages/',
      // templateURI: 'http://localhost:8980/SmartJsdoBackendService/static/staticbackend',
      breadcrumbNavigation: true,
      mdiInterface: true,
      moduleCode: 'Web2 Demo',
      development: false
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot([{
      path: 'logout',
      component: LogoutComponent
    }, {
      path: 'start',
      outlet: 'view',
      canActivate: [SmartRouteGuard],
      component: SmartFormOutletComponent,
      data: {
        BrowserTitleTemplate: 'Start',
        ViewUri: 'frontend://assets/start-page.layout.json'
      }
    }],
    { useHash: true })
  ],
  providers: [
    {  provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [CustomRootComponent]
})
export class AppModule { }
