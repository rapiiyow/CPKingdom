using System;
using System.Collections.Generic;
using System.Text;

namespace CPKINGDOM.Core.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string Contact { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public List<Module> Modules { get; set; }
    }
}
