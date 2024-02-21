﻿using UserManagement.Core.Entities.Base;

namespace UserManagement.Core.Entities
{
    // Customer entity 
    public class Customer : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string Address { get; set; }
    }
}
