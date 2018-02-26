import { SmartComponentLibraryModule, SmartViewerRegistryService, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerComponent, SmartDataSource, WidgetFacadeFactory } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common';

@CustomSmartForm('customerForm')
@Component({
    selector: 'customer-maintenance-form',

    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',

    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService]
})
export class CustomerMaintenanceFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

    private customerDatasource: SmartDataSource;

    constructor(injector: Injector,
        private widgetFactory: WidgetFacadeFactory,
        private dsRegistry: DataSourceRegistry,
        private viewerRegistry: SmartViewerRegistryService) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here


        this.setFormConfiguration('/SmartForm/Form/Consultingwerk.SmartComponentsDemo.OERA.Sports2000.CustomerBusinessEntity/customer');

        super.ngOnInit();
    }

    async ngAfterViewInit() {
        let customerViewer = await this.viewerRegistry.smartViewerAdded.first(viewer => viewer.name === 'customerGrid').toPromise();
        console.log('got viewer', customerViewer)
        customerViewer.inputValueChanged.subscribe(() => {
            this.setStateInputSensitivity();
        });

        //this.
        this.dsRegistry.dataSourceAdded.first(ev => ev.dataSourceName === 'customerDataSource')
            .subscribe(ev => {
                this.customerDatasource = ev.dataSource;
                console.log('got ds', this.customerDatasource)
                ev.dataSource.selectionChanged.subscribe(selectionEvent => {
                    console.log('sel changed')
                    this.setStateInputSensitivity();
                });
                ev.dataSource.stateChanged.subscribe(() => {
                    this.setStateInputSensitivity();
                });
            });
    }
    ngOnDestroy() {

        super.ngOnDestroy();
    }

    ngOnChanges(changes: SimpleChanges) {

        super.ngOnChanges(changes);
    }

    private setStateInputSensitivity() {
        setTimeout(() => {

            this.widgetFactory.GetFacade('customerGrid.eCustomer.Country')
                .then(customerCountryInput => {
                    this.widgetFactory.GetFacade('customerGrid.eCustomer.State')
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

    PutCustomerOnHoldHandler(customer: any) {
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

@NgModule({
    imports: [
        CommonModule,
        SmartComponentLibraryModule
    ],
    declarations: [
        CustomerMaintenanceFormComponent
    ],
    entryComponents: [
        CustomerMaintenanceFormComponent
    ]
})
export class CustomerMaintenanceFormModule { }