import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common';

@CustomSmartForm('customersMaintenance')
@Component({
    selector: 'customers-maintenance-form',
    
    templateUrl: './customers-maintenance.form.html',
    styleUrls: ['./customers-maintenance.form.css'],
    
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry]
})
export class CustomersMaintenanceFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here

        
        super.ngOnInit();
    }

    ngOnDestroy() {

        super.ngOnDestroy();
    }

    ngOnChanges(changes: SimpleChanges) {

        super.ngOnChanges(changes);
    }
}

@NgModule({
    imports: [
        CommonModule,
        SmartComponentLibraryModule
    ],
    declarations: [
        CustomersMaintenanceFormComponent
    ],
    entryComponents: [
        CustomersMaintenanceFormComponent
    ]
})
export class CustomersMaintenanceFormModule { }