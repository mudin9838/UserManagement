using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UserManagement.Core.Entities;
using UserManagement.Infrastructure.Identity;

namespace UserManagement.Infrastructure.Data
{
    // Context class for command
    //public class OrderingContext : DbContext
    public class OrderingContext : IdentityDbContext<ApplicationUser>
    {
        public OrderingContext(DbContextOptions<OrderingContext> options) : base (options)
        {

        }

        public DbSet<Customer> Customers { get; set; }
    }
}
