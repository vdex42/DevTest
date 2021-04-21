import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job.service';
import { CustomerService } from '../services/customer.service';
import { JobModel } from '../models/job.model';
import { CustomerModel } from '../models/customer.model';


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  private jobId: number;

  public job: JobModel;

  public customer: CustomerModel;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private customerService: CustomerService) {
      this.jobId = route.snapshot.params.id;
    }

  ngOnInit() {
    this.jobService.GetJob(this.jobId).subscribe(job => {
      this.job = job;
      if(job.customerId)
        this.customerService.GetCustomer(job.customerId).subscribe( customer => this.customer = customer);
      else
        this.customer = {
          customerId : null,
          name : "Unkown",
          customerType : null          
        }
    });
  }

}
