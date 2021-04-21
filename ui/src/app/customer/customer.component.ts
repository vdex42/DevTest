import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerModel } from '../models/customer.model'
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customerTypes: string[] = ["Large", "Small"];  //Todo this could be database driven

  public customers: CustomerModel[] = [];

  public newCustomer: CustomerModel = {    
    customerId: null,
    name: "",
    customerType: null
  };

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerService.GetCustomers().subscribe(customers => this.customers = customers);
  }

  public createCustomer(form: NgForm): void {
    if (form.invalid) {
      alert('form is not valid');
    } else {      
       this.customerService.CreateCustomer(this.newCustomer).then(() => {
        this.customerService.GetCustomers().subscribe(customers => this.customers = customers);
       });
    }
  }

}
