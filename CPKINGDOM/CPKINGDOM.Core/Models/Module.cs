using System;
using System.Collections.Generic;
using System.Text;

namespace CPKINGDOM.Core.Models
{
    public class Module
    {
        public int Id { get; set; }

        public string ModuleName { get; set; }

        public string Route { get; set; }

        public string Parent { get; set; }

        public int Sequence { get; set; }

        public string Icon { get; set; }
    }
}
