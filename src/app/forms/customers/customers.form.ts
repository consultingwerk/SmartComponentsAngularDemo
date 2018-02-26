import { SmartComponentLibraryModule, SmartFormComponent, DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'customers-form',
    
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry]
})
export class CustomersFormComponent extends SmartFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        // Add your own initialization logic here

        
        this.setFormConfiguration('http://localhost:4200/assets/customers-form.structure.json');
        
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
        CustomersFormComponent
    ]
})
export class CustomersFormModule { }