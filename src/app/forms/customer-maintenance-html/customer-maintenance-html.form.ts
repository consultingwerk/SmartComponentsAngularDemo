import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common';

@CustomSmartForm('customerMntHtml')
@Component({
    selector: 'customer-maintenance-html-form',
    
    templateUrl: './customer-maintenance-html.form.html',
    styleUrls: ['./customer-maintenance-html.form.css'],
    
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry]
})
export class CustomerMaintenanceHtmlFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

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
        CustomerMaintenanceHtmlFormComponent
    ],
    entryComponents: [
        CustomerMaintenanceHtmlFormComponent
    ]
})
export class CustomerMaintenanceHtmlFormModule { }