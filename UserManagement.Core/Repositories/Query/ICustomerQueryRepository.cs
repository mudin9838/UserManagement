using UserManagement.Core.Entities;
using UserManagement.Core.Repositories.Query.Base;

namespace UserManagement.Core.Repositories.Query
{
    // Interface for CustomerQueryRepository
    public interface ICustomerQueryRepository : IQueryRepository<Customer>
    {
        //Custom operation which is not generic
        Task<IReadOnlyList<Customer>> GetAllAsync(CancellationToken cancellationToken);
        Task<Customer> GetByIdAsync(Int64 id);
        Task<Customer> GetCustomerByEmail(string email, CancellationToken cancellationToken);
    }
}
