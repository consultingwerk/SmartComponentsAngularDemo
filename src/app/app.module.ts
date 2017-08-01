import { GridModule } from '@progress/kendo-angular-grid';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { SessionInfoController } from './sessioninfo.controller';
import { PutOnHoldController } from './put-on-hold.controller';
import { CustomerController } from './customer.controller';
import { StartPageController } from './start-page.controller';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
      //serviceURI: 'http://192.168.0.44:8820/web',
      serviceURI: 'http://localhost:8820/',
      smartRestURI: 'http://localhost:8820/web/',
      //smartRestURI: 'http://localhost:8820/static/staticbackend',
      imageURI: 'http://localhost:8820/static/smartimages/',
      templateURI: 'http://localhost:8820/web',
      // templateURI: 'http://localhost:8820/static/staticbackend',
      breadcrumbNavigation: true,
      mdiInterface: true,
      moduleCode: 'Web2 Demo',
      development: false,
      smartControllers: [StartPageController, CustomerController, PutOnHoldController, SessionInfoController]
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot([{
      path: 'logout',
      component: LogoutComponent
    }], { useHash: true })
  ],
  providers: [],
  bootstrap: [CustomRootComponent]
})
export class AppModule { }
