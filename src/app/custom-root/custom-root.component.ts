import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
    SessionContext,
    SmartConfig,
    SmartSessionManagerService,
    SmartServiceAdapter
} from '@consultingwerk/smartcomponent-library';

@Component({
  selector: 'app-root',
  templateUrl: './custom-root.component.html',
  styleUrls: ['./custom-root.component.css']
})
export class CustomRootComponent implements OnInit {

  sessionCtx: SessionContext;
  authenticated: boolean;

  constructor(public smartConfig: SmartConfig,
              private sessionContext: SmartSessionManagerService,
              private serviceAdapter: SmartServiceAdapter) { }

  ngOnInit() {
    this.sessionContext.sessionContext.subscribe(context => {
      this.sessionCtx = context;
    });
    this.serviceAdapter.filter(state => !!state)
        .subscribe(state => { this.authenticated = state.authenticated; });
  }

}
