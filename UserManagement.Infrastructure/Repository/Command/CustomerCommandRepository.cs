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

        public async Task<Customer> AddAsync(Customer entity, CancellationToken cancellationToken)
        {
            context.Customers.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(Customer entity, CancellationToken cancellationToken)
        {
            context.Customers.Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Customer entity, CancellationToken cancellationToken)
        {
            context.Customers.Update(entity);
            await context.SaveChangesAsync();
        }
    }
}
