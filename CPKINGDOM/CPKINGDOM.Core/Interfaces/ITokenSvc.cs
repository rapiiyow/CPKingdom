using CPKINGDOM.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPKINGDOM.Core.Interfaces
{
    public interface ITokenSvc
    {
        public string BuildToken(string key, string issuer, User user);

        public bool IsTokenValid(string key, string issuer, string token);
    }
}
