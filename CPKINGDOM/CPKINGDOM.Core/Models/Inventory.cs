namespace CPKINGDOM.Core.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int SupplierId { get; set; }
        public decimal CostPrice { get; set; }
        public string DateReceived { get; set; }
        public int QtyReceived { get; set; }
        public int QtyAvailable { get; set; }
        public string Remarks { get; set; }
        public string Barcode { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public decimal Srp { get; set; }
        public string SupplierName { get; set; }
        public string CategoryName { get; set; }
        public string BrandName { get; set; }
        public string ItemFullName { get; set; }
        public decimal AmountPaid { get; set; }
        public int QtyPurchased { get; set; }
        public int TranBodyId { get; set; }
        public bool IsService { get; set; }
        public string Notes { get; set; }
        public int ReorderPoint { get; set; }
        public string IsCritical { get; set; }
    }
}
