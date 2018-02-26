import { SmartFormComponent, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartComponentLibraryModule } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'customers-json-form',
    
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry]
})
export class CustomersJsonFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here

        
        this.setFormConfiguration('http://localhost:4200/assets/customer-form.structure.json');
        console.log('custom form with json init')
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
        CustomersJsonFormComponent
    ]
})
export class CustomersJsonFormModule { }