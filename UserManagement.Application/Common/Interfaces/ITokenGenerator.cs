﻿namespace UserManagement.Application.Common.Interfaces
{
    public interface ITokenGenerator
    {
        //public string GenerateToken(string userName, string password);
        public string GenerateJWTToken((string userId, string userName, IList<string> roles, string image) userDetails);
    }
}
