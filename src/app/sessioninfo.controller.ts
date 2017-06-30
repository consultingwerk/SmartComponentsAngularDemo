import { AppserverManagerComponent } from './appserver-manager/appserver-manager.component';
import { AblDojoModule } from './abl-dojo/abl-dojo.module';
import { SessionInfoModule } from './session-info/session-info.module';
import { FileInfoModule } from './file-info/file-info.module';
import { AppserverManagerModule } from './appserver-manager/appserver-manager.module';
import { SmartController, DefaultFormController } from '@consultingwerk/smartcomponents-core';
import { Injector } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { PanelBarModule, LayoutModule } from '@progress/kendo-angular-layout';

@SmartController('SessionInfoController', {
  imports: [GridModule, PanelBarModule, LayoutModule, SessionInfoModule, AblDojoModule, FileInfoModule, AppserverManagerModule]
})
export class SessionInfoController extends DefaultFormController {

    constructor(injector: Injector) {
      super(injector);
    }
}
