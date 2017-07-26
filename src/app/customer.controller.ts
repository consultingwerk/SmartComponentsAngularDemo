import { Injector, OnInit } from '@angular/core';
import { SmartController, DefaultFormController, DataSourceRegistry, SmartDataSource, DataSourceRegistryEventArgs } from '@consultingwerk/smartcomponents-core';

interface CustomerBusinessEntityCustomer {
  CustNum: number;
  Name: string;


}

@SmartController('CustomerController')
export class CustomerController extends DefaultFormController implements OnInit {

  private customerDatasource: SmartDataSource;

  constructor(injector: Injector, private dsRegistry: DataSourceRegistry) {
    super(injector);
  }

  PutCustomerOnHoldHandler(customer: CustomerBusinessEntityCustomer) {
    this.customerDatasource.invokeMethod('PutCustomerOnHold', {
      plcParameter: {
        CustNum: customer.CustNum,
        Comments: 'Welcome to TypeScript'
      }
    }).then(() => {
      console.log('done');
      this.customerDatasource.fetch((<any>{
        top: this.customerDatasource.top,
        skip: this.customerDatasource.skip

      }));
    })
      .catch(err => {
        console.error(err);
      });
  }

  ngOnInit() {
    this.dsRegistry.dataSourceAdded.filter(ev => !!ev)
      .subscribe((ev: DataSourceRegistryEventArgs) => {
        if (ev.dataSourceName === 'customerDataSource') {
          this.customerDatasource = ev.dataSource;
        }
      });
  }
}
