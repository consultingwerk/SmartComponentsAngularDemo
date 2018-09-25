import { SmartComponentLibraryModule, SmartFormComponent, CustomSmartForm, DataSourceRegistry, SmartViewerRegistryService, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, WidgetFacadeFactory, SmartDialogService, SmartTabFolderComponent, SmartTabFolderRegistryService } from '@consultingwerk/smartcomponent-library';
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChanges, NgModule, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common';
import { CustomerMaintenanceFormComponent } from '../customer-maintenance/customer-maintenance.form';


@CustomSmartForm('CustomerFormWithTabFolder')
@Component({
    selector: 'customer-tabfolder-form',
    templateUrl: '../../../../node_modules/@consultingwerk/smartcomponent-library/ui/form/smart-form.component.html',
    viewProviders: [DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService]
})
export class CustomerTabfolderFormComponent extends CustomerMaintenanceFormComponent implements OnInit, OnDestroy, OnChanges {

    constructor(injector: Injector,
        widgetFactory: WidgetFacadeFactory,
        dsRegistry: DataSourceRegistry,
        viewerRegistry: SmartViewerRegistryService,
        private tabRegistry: SmartTabFolderRegistryService,
        dialogService: SmartDialogService) {
        super(injector, widgetFactory, dsRegistry, viewerRegistry, dialogService);
    }

    async ngOnInit() {
        // Add your own initialization logic here
        
       // this.setFormConfiguration('/SmartForm/Form/CustomerFormWithTabFolder');
        this.setFormConfiguration('frontend://assets/tabfolder.layout.json')
        SmartFormComponent.prototype.ngOnInit.call(this);
    }

    ngOnDestroy() {

        super.ngOnDestroy();
    }

    ngOnChanges(changes: SimpleChanges) {

        super.ngOnChanges(changes);
    }

    async ngAfterViewInit() {
        console.log('awaiting tabfolder')
        const tabfolder = await this.tabRegistry.getTabFolderAsync('tabfolder');
        console.log('got tabfolder')
        setTimeout(() => tabfolder.selectPage('secondTab'), 2000);
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