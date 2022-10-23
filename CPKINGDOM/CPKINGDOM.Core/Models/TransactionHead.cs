using System;
using System.Collections.Generic;

namespace CPKINGDOM.Core.Models
{
    public class TransactionHead
    {
        public int Id { get; set; }
        public string TransactionNo { get; set; }
        public string CustomerName { get; set; }
        public string CustomerContactNo { get; set; }
        public string Notes { get; set; }
        public int Technichian { get; set; }
        public string Status { get; set; }
        public bool IsService { get; set; }
        public decimal ServiceFee { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<Inventory> Inventory { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalPaid { get; set; }
    }
}
