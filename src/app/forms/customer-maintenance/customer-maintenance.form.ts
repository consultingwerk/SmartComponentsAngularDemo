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

    async ngOnInit() {
        // Add your own initialization logic here


        this.setFormConfiguration('/SmartForm/Form/Consultingwerk.SmartComponentsDemo.OERA.Sports2000.CustomerBusinessEntity/customer');

        super.ngOnInit();

        const customerViewer = await this.viewerRegistry.smartViewerAdded.first(viewer => viewer.name === 'customerViewer').toPromise();
        customerViewer.inputValueChanged.subscribe(() => {
            this.setStateInputSensitivity();
        });

        const customerDataSource = await this.dsRegistry.dataSourceAdded.first(ev => ev.dataSourceName === 'customerDataSource')
            .map(event => event.dataSource).toPromise();

        this.customerDatasource = customerDataSource;
        customerDataSource.selectionChanged.subscribe(selectionEvent => {
            this.setStateInputSensitivity();
        });
        customerDataSource.stateChanged.subscribe(() => {
            this.setStateInputSensitivity();
        });
    }

    async ngAfterViewInit() {

    }
    ngOnDestroy() {

        super.ngOnDestroy();
    }

    ngOnChanges(changes: SimpleChanges) {

        super.ngOnChanges(changes);
    }

    private setStateInputSensitivity() {
        setTimeout(async () => {
            const customerCountryInput = await this.widgetFactory.GetFacade('customerViewer.eCustomer.Country');
            const customerStateInput = await this.widgetFactory.GetFacade('customerViewer.eCustomer.State');

            if (customerCountryInput.SCREEN_VALUE) {
                customerStateInput.SENSITIVE = customerCountryInput.SCREEN_VALUE.toUpperCase() === 'USA';
            }
            else {
                customerStateInput.SENSITIVE = false;
            }
        });
    }

    PutCustomerOnHoldHandler(customer: any) {
        this.customerDatasource.invokeMethod('PutCustomerOnHold', {
            plcParameter: {
                CustNum: customer.CustNum,
                Comments: 'Welcome to TypeScript'
            }
        }).then(() => {
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