using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace CPKINGDOM.Core.Services
{
    public class InventorySvc : IInventorySvc
    {
        private readonly IConfiguration _config;

        public InventorySvc(IConfiguration config)
        {
            _config = config;
        }

        public List<Inventory> GetInventories()
        {
			using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

			var inventories = _context.Query<Inventory>(@"
                SELECT 
					A.Id AS ItemId, 
					C.Name AS CategoryName, 
					A.Barcode, 
					B.Name AS BrandName, 
					A.Name AS ItemName, 
					A.Description, 
					A.Srp, 
					(SELECT ISNULL(SUM(QtyAvailable),0) FROM Inventory WHERE ItemId = A.Id) AS QtyAvailable 
				FROM [Item] A
				INNER JOIN 
					[Brand] B ON A.[BrandId] = B.[Id]
				INNER JOIN 
					[Category] C ON A.[CategoryId] = C.[Id]
				ORDER BY
					B.Name;
            ");

			return inventories.ToList();
		}

        public List<Inventory> GetItemInventory(int itemId)
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);
			var parameters = new { ItemId = itemId };
			var inventories = _context.Query<Inventory>(@"
                SELECT 
					A.[Id],
					A.[ItemId],
					A.[SupplierId],
					A.[CostPrice],
					A.[DateReceived],
					A.[QtyReceived],
					A.[QtyAvailable],
					A.[Remarks],
					(SELECT Name FROM [Supplier] WHERE Id = A.[SupplierId]) AS SupplierName
				FROM 
					[Inventory] A
				WHERE
					A.[ItemId] = @ItemId
				ORDER BY
					A.[DateReceived];
            ", parameters);

            return inventories.ToList();
        }
        public bool SaveInventory(Inventory inventory)
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

			inventory.QtyAvailable = inventory.QtyReceived;

            int row = _context.Execute(@"
                INSERT INTO [Inventory]
				(
					[ItemId],
					[SupplierId],
					[CostPrice],
					[DateReceived],
					[QtyReceived],
					[QtyAvailable],
					[Remarks]
				)
				VALUES
				(
					@ItemId,
					@SupplierId,
					@CostPrice,
					@DateReceived,
					@QtyReceived,
					@QtyAvailable,
					@Remarks
				);", inventory);

            return row != 0;
        }
		public bool UpdateInventory(Inventory inventory)
		{
			using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

			int row = _context.Execute(@"
                UPDATE [Inventory] SET 
					   [ItemId] = @ItemId
					   [SupplierId] = @SupplierId,
					   [CostPrice] = @CostPrice,
					   [DateReceived] = @DateReceived,
					   [QtyReceived] = @QtyReceived,
					   [QtyAvailable] = @QtyAvailable,
					   [Remarks] = @Remarks
				WHERE 
					   [Id] = @Id;", inventory);

			return row != 0;
		}
		public List<Inventory> GetAvailableItems()
		{
			using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);
			var inventories = _context.Query<Inventory>(@"
                SELECT 
					A.Id, 
					B.Barcode, 
					A.QtyAvailable, 
					c.Name as BrandName, 
					b.Name as ItemName, 
					b.Description, 
					d.Name as SupplierName,
					B.Srp
				FROM 
					Inventory A
				INNER JOIN 
					Item B ON A.ItemId = B.Id
				INNER JOIN 
					Brand C ON B.BrandId = C.Id
				INNER JOIN 
					Supplier d on a.SupplierId = d.Id
				WHERE 
					A.QtyAvailable > 0
				ORDER BY 
					c.Name;
            ");

			return inventories.ToList();
		}
	}
}
