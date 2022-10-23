namespace CPKINGDOM.Core.Models
{
    public class TransactionBody
    {
        public int Id { get; set; }
        public int HeadId { get; set; }
        public int InventoryId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal AmountPaid { get; set; }
        public string Notes { get; set; }
    }
}
