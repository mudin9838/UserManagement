using UserManagement.Core.Entities;
using UserManagement.Core.Repositories.Command;

namespace UserManagement.Infrastructure.Repository.Command
{
    // Command Repository class for customer
    public class CustomerCommandRepository : ICustomerCommandRepository
    {
        public Task<Customer> AddAsync(Customer entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Customer entity)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Customer entity)
        {
            throw new NotImplementedException();
        }
    }
}
