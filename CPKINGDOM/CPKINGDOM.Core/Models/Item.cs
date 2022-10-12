using System;
using System.Collections.Generic;
using System.Text;

namespace CPKINGDOM.Core.Models
{
    class Item
    {
        public int Id { get; set; }
        public string Barcode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Srp { get; set; }
        public int CategoryId { get; set; }
    }
}
