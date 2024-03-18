﻿using Microsoft.AspNetCore.Http;

namespace UserManagement.Application.Common.Interfaces
{
    public interface IIdentityService
    {
        // User section
        Task<(bool isSucceed, string userId)> CreateUserAsync(string userName, string password, string email, string fullName, List<string> roles);
        Task<bool> SigninUserAsync(string userName, string password);
        Task<string> GetUserIdAsync(string userName);
        Task<(string userId, string fullName, string UserName, string email, IList<string> roles, string image)> GetUserDetailsAsync(string userId);
        Task<(string userId, string fullName, string UserName, string email, IList<string> roles)> GetUserDetailsByUserNameAsync(string userName);
        Task<string> GetUserNameAsync(string userId);
        Task<bool> DeleteUserAsync(string userId);
        Task<bool> IsUniqueUserName(string userName);
        Task<List<(string id, string fullName, string userName, string email)>> GetAllUsersAsync();
        Task<List<(string id, string userName, string email, IList<string> roles)>> GetAllUsersDetailsAsync();
        Task<bool> UpdateUserProfile(string id, string fullName, string email, IList<string> roles, IFormFile file);

        Task<bool> ChangePassword(string id, string currentPassword, string newPassword);
        // Role Section
        Task<bool> CreateRoleAsync(string roleName);
        Task<bool> DeleteRoleAsync(string roleId);
        Task<List<(string id, string roleName)>> GetRolesAsync();
        Task<(string id, string roleName)> GetRoleByIdAsync(string id);
        Task<bool> UpdateRole(string id, string roleName);

        // User's Role section
        Task<bool> IsInRoleAsync(string userId, string role);
        Task<List<string>> GetUserRolesAsync(string userId);
        Task<bool> AssignUserToRole(string userName, IList<string> roles);
        Task<bool> UpdateUsersRole(string userName, IList<string> usersRole);


    }
}
