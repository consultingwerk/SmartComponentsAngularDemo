import { SmartRouteGuard, SmartComponentLibraryModule, SmartViewerRegistryService, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerComponent, SmartDataSource, WidgetFacadeFactory, SmartDialogService, DialogButtons } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@CustomSmartForm('customerMntJson')
@Component({
    selector: 'customer-maintenance-j-s-o-n-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService]
})
export class CustomerMaintenanceJSONFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    private customerDatasource: SmartDataSource;

    constructor(injector: Injector,
        private widgetFactory: WidgetFacadeFactory,
        private dsRegistry: DataSourceRegistry,
        private viewerRegistry: SmartViewerRegistryService,
        private dialogService: SmartDialogService) {
        super(injector);
    }

    async ngOnInit() {
        // Add your own initialization logic here


        this.setFormConfiguration('frontend://assets/customer-maintenance.layout.json');

        super.ngOnInit();

        const customerViewer = await this.viewerRegistry.smartViewerAdded.first(viewer => viewer.name === 'CustomerViewer').toPromise();
        customerViewer.inputValueChanged.subscribe(() => {
            this.setStateInputSensitivity();
        });
        const customerDataSource = this.dsRegistry.getDataSource('customerDataSource') || await this.dsRegistry.dataSourceAdded.first(ev => ev.dataSourceName === 'customerDataSource')
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
            const customerCountryInput = await this.widgetFactory.GetFacade('CustomerViewer.eCustomer.Country');
            const customerStateInput = await this.widgetFactory.GetFacade('CustomerViewer.eCustomer.State');

            if (customerCountryInput.SCREEN_VALUE) {
                customerStateInput.SENSITIVE = customerCountryInput.SCREEN_VALUE.toUpperCase() === 'USA';
            }
            else {
                customerStateInput.SENSITIVE = false;
            }
        });
    }

    async PutCustomerOnHoldHandler(customer: any) {
        const result = await this.dialogService.showDialog({
            buttons: [DialogButtons.YES, DialogButtons.CANCEL],
            textContent: 'Are you sure you want to put this customer on hold?',
            title: 'Confirm'
          });
          if (result.button.value.toLowerCase() === 'yes') {
            await this.customerDatasource.invokeMethod('PutCustomerOnHold', {
              plcParameter: {
                CustNum: this.customerDatasource.selected.CustNum,
                Comments: 'Welcome to TypeScript'
              }
            })
            this.customerDatasource.fetch(<any>{
              top: this.customerDatasource.top,
              skip: this.customerDatasource.skip
            });
          }
    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: 'customer-mnt-json',
            component: CustomerMaintenanceJSONFormComponent,
            canActivate: [SmartRouteGuard],
            outlet: 'view',
            data: {
                BreadcrumbLabelTemplate: 'Customer Maintenance (Static JSON)', 
                BrowserTitleTemplate: 'Customer Maintenance (Static JSON)', 
                FormId: 'customerMntJson'
            }
        }]), 
        SmartComponentLibraryModule
    ],
    declarations: [
        CustomerMaintenanceJSONFormComponent
    ],
    entryComponents: [
        CustomerMaintenanceJSONFormComponent
    ],
    exports: [
        RouterModule
    ]
})
export class CustomerMaintenanceJSONFormModule { }