import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, WidgetFacadeFactory, SmartDialogService } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { CustomerMaintenanceFormComponent } from '../customer-maintenance/customer-maintenance.form';


@CustomSmartForm('CustomerFormWithTabFolder')
@Component({
    selector: 'customer-tabfolder-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService]
})
export class CustomerTabfolderFormComponent extends CustomerMaintenanceFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector,
        widgetFactory: WidgetFacadeFactory,
        dsRegistry: DataSourceRegistry,
        viewerRegistry: SmartViewerRegistryService,
        dialogService: SmartDialogService) {
        super(injector, widgetFactory, dsRegistry, viewerRegistry, dialogService);
    }

    async ngOnInit() {
        // Add your own initialization logic here
        
        this.setFormConfiguration('/SmartForm/Form/CustomerFormWithTabFolder');
        
        SmartFormComponent.prototype.ngOnInit.call(this);
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
        CustomerTabfolderFormComponent
    ],
    entryComponents: [
        CustomerTabfolderFormComponent
    ]
})
export class CustomerTabfolderFormModule { }