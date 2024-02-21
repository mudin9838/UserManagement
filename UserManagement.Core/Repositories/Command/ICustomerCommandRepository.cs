using UserManagement.Core.Entities;
using UserManagement.Core.Repositories.Command.Base;

namespace UserManagement.Core.Repositories.Command
{
    // Interface for customer command repository
    public interface ICustomerCommandRepository : ICommandRepository<Customer>
    {

    }
}
