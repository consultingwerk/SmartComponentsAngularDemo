import { SmartController, DefaultFormController, DataSourceRegistry, DataSourceRegistryEventArgs } from '@consultingwerk/smartcomponents-core';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { Injector, OnInit } from '@angular/core';

@SmartController('StartController', {
  imports: [ChartsModule]
})
export class StartPageController extends DefaultFormController implements OnInit {

  private series: any[] = [];
  private categories: string[] = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(public injector: Injector, private dsReg: DataSourceRegistry) {
    super(injector);
  }

  ngOnInit() {
    this.dsReg.dataSourceAdded.subscribe((ev: DataSourceRegistryEventArgs) => {
      if (ev.dataSourceName === 'salesrepDataSource') {
        ev.dataSource.fetch()
          .then(result => {
            this.series = result.data.map(salesrep => {
              const serie = {
                name: salesrep.RepName,
                data: Object.keys(salesrep).filter(key => key.startsWith('MonthQuota')).map(month => salesrep[month])
              };

              return serie;
            });

            console.log('salesrep series', this.series);
          });
      }
    });
  }

}
