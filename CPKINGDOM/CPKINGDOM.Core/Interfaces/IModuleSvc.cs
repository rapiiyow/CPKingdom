using CPKINGDOM.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPKINGDOM.Core.Interfaces
{
    public interface IModuleSvc
    {
        public List<Module> GetModuleByRole(int roleId);
    }
}
