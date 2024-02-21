
using Microsoft.AspNetCore.Identity;

namespace UserManagement.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }
    }
}
