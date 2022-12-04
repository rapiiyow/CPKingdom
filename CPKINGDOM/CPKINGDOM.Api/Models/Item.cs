namespace CPKINGDOM.Api.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Barcode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Srp { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int BrandId { get; set; }
        public string BrandName { get; set; }
        public int ReorderPoint { get; set; }
        public int CriticalLevel { get; set; }
    }
}
