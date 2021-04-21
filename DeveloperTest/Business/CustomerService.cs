using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeveloperTest.Business.Interfaces;
using DeveloperTest.Database;
using DeveloperTest.Database.Models;
using DeveloperTest.Models;

namespace DeveloperTest.Business
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext context;

        public CustomerService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public CustomerModel[] GetCustomers()
        {
            return context.Customers.Select(x => new CustomerModel
            {
                CustomerId = x.CustomerId,
                CustomerType = x.CustomerType,
                Name = x.Name
            }).ToArray();
        }

        public CustomerModel GetCustomer(int customerId)
        {
            return context.Customers.Where(x => x.CustomerId == customerId).Select(x => new CustomerModel
            {
                CustomerId = x.CustomerId,
                CustomerType = x.CustomerType,
                Name = x.Name
            }).SingleOrDefault();
        }

        public CustomerModel CreateCustomer(BaseCustomerModel model)
        {
            var addedCustomer = context.Customers.Add(new Customer
            {
                CustomerType = model.CustomerType,
                Name = model.Name
            });

            context.SaveChanges();

            return new CustomerModel
            {
                CustomerId = addedCustomer.Entity.CustomerId,
                CustomerType = addedCustomer.Entity.CustomerType,
                Name = addedCustomer.Entity.Name
            };
        }
    }
}
