import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SmartConfig, SessionContext, SmartMdiRegistryService, SmartNavigationService, SmartSessionManagerService } from '@consultingwerk/smartcomponents-core';

@Component({
  selector: 'app-root',
  templateUrl: './custom-root.component.html',
  styleUrls: ['./custom-root.component.css']
})
export class CustomRootComponent implements OnInit {

  sessionCtx: SessionContext;

  constructor(public smartConfig: SmartConfig,
              private mdiRegistry: SmartMdiRegistryService,
              private smartNavigation: SmartNavigationService,
              private sessionContext: SmartSessionManagerService) { }

  ngOnInit() {
    this.sessionContext.sessionContext.subscribe(context => {
      this.sessionCtx = context;
    });
  }

}
