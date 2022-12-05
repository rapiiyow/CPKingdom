using CPKINGDOM.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPKINGDOM.Core.Interfaces
{
    public interface IUserSvc
    {
        public User GetUserCredential(string username, string password);
    }
}
