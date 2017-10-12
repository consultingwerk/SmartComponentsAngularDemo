import { SmartFormOutletComponent } from '@consultingwerk/smartcomponents-core';
import { GridModule } from '@progress/kendo-angular-grid';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { SessionInfoController } from './sessioninfo.controller';
import { StartPageController } from './start-page.controller';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SmartComponentLibraryModule } from '@consultingwerk/smartcomponent-library';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmartAppRootComponent } from '@consultingwerk/smartcomponents-core';
import { CustomRootComponent } from './custom-root/custom-root.component';
import { SessionInfoModule } from './session-info/session-info.module';
import { AblDojoModule } from './abl-dojo/abl-dojo.module';
import { FileInfoModule } from './file-info/file-info.module';
import { AppserverManagerModule } from './appserver-manager/appserver-manager.module';
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
import { CustomerFormController } from './controllers/customer-form.controller';

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
    FormsModule,
    HttpModule,
    PanelBarModule,
    GridModule,
    SessionInfoModule,
    AblDojoModule,
    FileInfoModule,
    AppserverManagerModule,
    SmartComponentLibraryModule.forRoot({
      defaultRoute: '/start',
      serviceURI: 'http://localhost:8820/',
      templateURI: 'http://localhost:8820/web',
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
      development: false,
      smartControllers: [StartPageController, SessionInfoController, CustomerFormController]
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot([{
      path: 'logout',
      component: LogoutComponent
    }],
    { useHash: true })
  ],
  providers: [
    {  provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [CustomRootComponent]
})
export class AppModule { }
