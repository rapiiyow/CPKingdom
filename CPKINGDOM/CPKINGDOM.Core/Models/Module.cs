using System;
using System.Collections.Generic;
using System.Text;

namespace CPKINGDOM.Core.Models
{
    public class Module
    {
        public int ModuleId { get; set; }

        public string ModuleName { get; set; }

        public string Route { get; set; }

        public int ParentId { get; set; }

        public int Sequence { get; set; }

        public string Icon { get; set; }
    }
}
