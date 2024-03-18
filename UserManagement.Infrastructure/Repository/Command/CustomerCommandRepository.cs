using UserManagement.Core.Entities;
using UserManagement.Core.Repositories.Command;
using UserManagement.Infrastructure.Data;

namespace UserManagement.Infrastructure.Repository.Command
{
    // Command Repository class for customer
    public class CustomerCommandRepository : ICustomerCommandRepository
    {
        private readonly OrderingContext context;

        public CustomerCommandRepository(OrderingContext context)
        {
            this.context = context;
        }

        public async Task<Customer> AddAsync(Customer entity)
        {
            context.Customers.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(Customer entity)
        {
            context.Customers.Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Customer entity)
        {
            context.Customers.Update(entity);
            await context.SaveChangesAsync();
        }
    }
}
