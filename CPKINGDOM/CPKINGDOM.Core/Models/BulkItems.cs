using System.Collections.Generic;

namespace CPKINGDOM.Core.Models
{
    public class BulkItems
    {
        public int SupplierId { get; set; }
        public string DateReceived { get; set; }
        public List<Inventory> SelectedItems { get; set; }
    }
}
