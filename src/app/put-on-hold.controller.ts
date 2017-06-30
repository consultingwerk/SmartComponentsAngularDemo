import { OnInit, Injector } from '@angular/core';
import { SmartController, DefaultFormController, DataSourceRegistry, DataSourceRegistryEventArgs, SmartDataSource } from '@consultingwerk/smartcomponents-core';

@SmartController('PutOnHoldController')
export class PutOnHoldController extends DefaultFormController implements OnInit {
  private customerDataSource: SmartDataSource;

  custNum: number;
  comments: string;
  resultJson: string;

  constructor(injector: Injector, private dsRegistry: DataSourceRegistry) {
    super(injector);
  }

  ngOnInit() {
    this.dsRegistry.dataSourceAdded.filter(ev => !!ev)
          .subscribe((ev: DataSourceRegistryEventArgs) => {
            if (ev.dataSourceName === 'customerDataSource') {
              this.customerDataSource = ev.dataSource;
            }
          });
  }

  putOnHold() {
    console.log(`cust num: ${this.custNum}, comments: ${this.comments}`);
    this.customerDataSource.invokeMethod('PutCustomerOnHold', {
      plcParameter: {
        CustNum: this.custNum,
        Comments: this.comments
      }
    }).then((response: any) => {
      console.log(response);
      this.resultJson = JSON.stringify(response.plcDataset.dsCustomer.eCustomer[0], null, '\t');
      alert(`Customer ${this.custNum} is now on hold.`);
    }).catch((err) => {
      console.error(err);
    });
  }
}
