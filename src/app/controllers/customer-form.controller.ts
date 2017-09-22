import {
  SmartController,
  DefaultFormController,
  WidgetFacadeFactory,
  IWidgetFacade,
  DataSourceRegistry,
  SmartDataSource,
  DataSourceRegistryEventArgs  } from '@consultingwerk/smartcomponents-core';
import { SmartViewerComponent } from '@consultingwerk/smartcomponents-viewer';
import { Injector, OnInit, ViewChild } from '@angular/core';

interface CustomerBusinessEntityCustomer {
    CustNum: number;
    Name: string;
}

@SmartController('CustomerFormController')

export class CustomerFormController extends DefaultFormController implements OnInit {

    @ViewChild(SmartViewerComponent)
    viewer: SmartViewerComponent;

    private customerDatasource: SmartDataSource;

    constructor(injector: Injector,
        private widgetFactory: WidgetFacadeFactory,
        private dsRegistry: DataSourceRegistry) {
        super(injector);
      }

    ngOnInit() {
        this.viewer.inputValueChanged.subscribe(() => {
          this.setStateInputSensitivity();
        });

        this.dsRegistry.dataSourceAdded.first(ev => ev.dataSourceName === 'customerDataSource')
        .subscribe(ev => {
            this.customerDatasource = ev.dataSource;

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

                            if (customerCountryInput.SCREEN_VALUE) {
                              customerStateInput.SENSITIVE = customerCountryInput.SCREEN_VALUE.toUpperCase() === 'USA';
                            }
                            else {
                              customerStateInput.SENSITIVE = false;
                            }
                        });
                });
        });
    }

    PutCustomerOnHoldHandler (customer: CustomerBusinessEntityCustomer) {
      this.customerDatasource.invokeMethod('PutCustomerOnHold', {
        plcParameter: {
          CustNum: customer.CustNum,
          Comments: 'Welcome to TypeScript'
        }
      }).then(() => {
        console.log('done');
        this.customerDatasource.fetch((<any>{
          top: this.customerDatasource.top,
          skip: this.customerDatasource.skip

        }));
      })
        .catch(err => {
          console.error(err);
        });
    }


}
