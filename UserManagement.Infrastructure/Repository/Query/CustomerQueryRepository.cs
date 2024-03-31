using Microsoft.EntityFrameworkCore;
using UserManagement.Core.Entities;
using UserManagement.Core.Repositories.Query;
using UserManagement.Infrastructure.Data;

namespace UserManagement.Infrastructure.Repository.Query
{
    // QueryRepository class for customer
    public class CustomerQueryRepository : ICustomerQueryRepository
    {
        private readonly OrderingContext _orderingContext;

        public CustomerQueryRepository(OrderingContext orderingContext)
        {
            _orderingContext = orderingContext;
        }

        public async Task<IReadOnlyList<Customer>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _orderingContext.Customers.ToListAsync(cancellationToken);
        }
        public async Task<Customer> GetByIdAsync(long id)
        {
            return await _orderingContext.Customers.FindAsync(id);
        }

        public Task<Customer> GetCustomerByEmail(string email, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
