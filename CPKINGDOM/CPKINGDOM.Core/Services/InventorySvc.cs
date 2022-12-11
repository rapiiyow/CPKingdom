using CPKINGDOM.Core.Context;
using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CPKINGDOM.Core.Services
{
    public class InventorySvc : IInventorySvc
    {
        private readonly DbContext _context;

        public InventorySvc(DbContext context) => _context = context;
        public List<Inventory> GetInventories()
        {
            using var connection = _context.CreateConnection();

            var inventories = connection.Query<Inventory>(@"
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
            using var connection = _context.CreateConnection();

            var parameters = new { ItemId = itemId };
            var inventories = connection.Query<Inventory>(@"
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
            using var connection = _context.CreateConnection();

            inventory.QtyAvailable = inventory.QtyReceived;

            int row = connection.Execute(@"
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
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                UPDATE [Inventory] SET 
					   [SupplierId] = @SupplierId,
					   [CostPrice] = @CostPrice,
					   [DateReceived] = @DateReceived,
					   [QtyReceived] = @QtyReceived,
					   [QtyAvailable] = @QtyAvailable
				WHERE 
					   [Id] = @Id;", inventory);

            return row != 0;
        }
        public List<Inventory> GetAvailableItems()
        {
            using var connection = _context.CreateConnection();
            var inventories = connection.Query<Inventory>(@"
                SELECT 
					A.Id, 
					B.Barcode, 
					A.QtyAvailable, 
					c.Name as BrandName, 
					b.Name as ItemName, 
					b.Description, 
					d.Name as SupplierName,
					B.Srp,
					A.CostPrice
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
        public List<Inventory> GetReorderCritical()
        {
            using var connection = _context.CreateConnection();

            var inventory = connection.Query<Inventory>(@"
                select 
	                i.BrandName, 
	                i.Name as ItemName, 
	                i.Description, 
	                i.ReorderPoint, 
	                i.QtyAvailable, 
	                (case when i.CriticalLevel >= i.QtyAvailable then 'Yes' else 'No' end) IsCritical 
                from 
                (
	                select 
		                a.*, 
		                b.Name as BrandName, 
		                (select SUM(QtyAvailable) from Inventory where ItemId = a.Id) as QtyAvailable 
	                from 
		                Item a 
	                inner join Brand b on a.BrandId = b.Id
                ) i
                where 
	                i.ReorderPoint is not null and 
	                i.ReorderPoint >= i.QtyAvailable
                order by i.BrandName, i.Name;
            ");

            return inventory.ToList();
        }
        public bool SaveBulkItems(BulkItems bulkItems)
        {
            bool success = false;
            using var connection = _context.CreateConnection();

            foreach (var item in bulkItems.SelectedItems)
            {
                item.SupplierId = bulkItems.SupplierId;
                item.DateReceived = bulkItems.DateReceived;
                item.QtyAvailable = item.QtyReceived;
                int row = connection.Execute(@"
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
					);", item);

                success = row != 0;
            }

            return success;
        }
		public List<ItemInventoryLog> GetItemInventoryLog(int itemId)
		{
			using var connection = _context.CreateConnection();

			var parameters = new { ItemId = itemId };
			var inventories = connection.Query<ItemInventoryLog>(@"GetItemInventoryLog", parameters, commandType: CommandType.StoredProcedure);

			return inventories.ToList();
		}		
	}
}
