import { SmartController, DefaultFormController, WidgetFacadeFactory, IWidgetFacade, DataSourceRegistry } from '@consultingwerk/smartcomponents-core';
import { Injector, OnInit } from '@angular/core'

@SmartController('CustomerStateController', {

})
export class CustomerStateController extends DefaultFormController implements OnInit {

    constructor(injector: Injector,
        private widgetFactory: WidgetFacadeFactory,
        private dsRegistry: DataSourceRegistry) {
        super(injector);
    }

    ngOnInit() {
        this.dsRegistry.dataSourceAdded.first(ev => ev.dataSourceName === 'customerDataSource')
            .subscribe(ev => {
                ev.dataSource.selectionChanged.subscribe(selectionEvent => {
                    this.setStateInputSensitivity();
                });
                ev.dataSource.stateChanged.subscribe(() => {
                    this.setStateInputSensitivity();
                });
            });
    }

    private setStateInputSensitivity() {
        setTimeout(() => {
            this.widgetFactory.GetFacade('customerViewer.eCustomer.Country')
                .then(customerCountryInput => {
                    this.widgetFactory.GetFacade('customerViewer.eCustomer.State')
                        .then(customerStateInput => {
                            customerStateInput.SENSITIVE = !customerCountryInput.SCREEN_VALUE || customerCountryInput.SCREEN_VALUE === 'USA';
                        });
                });
        });
    }

}