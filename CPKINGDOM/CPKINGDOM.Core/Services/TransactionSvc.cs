using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace CPKINGDOM.Core.Services
{
    public class TransactionSvc : ITransactionSvc
    {
        private readonly IConfiguration _config;

        public TransactionSvc(IConfiguration config)
        {
            _config = config;
        }

        public string GetPurchaseNo()
        {
            string purchaseNo = "";

            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            string count = _context.QuerySingle<string>(@"SELECT COUNT(*)+1 AS CNT FROM TransactionHead WHERE IsService = 0;").ToString();

            switch (count.Length)
            {
                case 1:
                    purchaseNo = "P00000";
                    break;
                case 2:
                    purchaseNo = "P0000";
                    break;
                case 3:
                    purchaseNo = "P000";
                    break;
                case 4:
                    purchaseNo = "P00";
                    break;
                case 5:
                    purchaseNo = "P0";
                    break;
                case 6:
                    purchaseNo = "P";
                    break;
            }

            return purchaseNo + count;
        }
        public string GetServiceNo()
        {
            string serviceNo = "";

            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            string count = _context.QuerySingle<string>(@"SELECT COUNT(*)+1 AS CNT FROM TransactionHead WHERE IsService = 1;").ToString();

            switch (count.Length)
            {
                case 1:
                    serviceNo = "S00000";
                    break;
                case 2:
                    serviceNo = "S0000";
                    break;
                case 3:
                    serviceNo = "S000";
                    break;
                case 4:
                    serviceNo = "S00";
                    break;
                case 5:
                    serviceNo = "S0";
                    break;
                case 6:
                    serviceNo = "S";
                    break;
            }

            return serviceNo + count;
        }
        public bool SaveNewPurchase(TransactionHead transactionHead)
        {
            bool success = false;
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            transactionHead.IsService = false;

            var headId = _context.QuerySingle<int>(@"
                INSERT INTO [TransactionHead]
				(
					[TransactionNo],
					[CustomerName],
					[CustomerContactNo],
					[Status],
					[IsService],
					[CreatedDate],
                    [Notes],
                    [TranDateTime]
				)
                OUTPUT INSERTED.Id
				VALUES
				(
					@TransactionNo,
					@CustomerName,
					@CustomerContactNo,
					@Status,
					@IsService,
					@CreatedDate,
                    @Notes,
                    @TranDateTime
				);", transactionHead);

            foreach (var item in transactionHead.Inventory)
            {
                var transactionBodyModel = new TransactionBody();
                transactionBodyModel.HeadId = headId;
                transactionBodyModel.InventoryId = item.Id;
                transactionBodyModel.Quantity = item.QtyPurchased;
                transactionBodyModel.Price = item.Srp;
                transactionBodyModel.AmountPaid = item.AmountPaid;

                int tranBody = _context.Execute(@"
                INSERT INTO [TransactionBody]
				(
					[HeadId],
					[InventoryId],
					[Quantity],
					[Price],
					[AmountPaid]
				)
				VALUES
				(
					@HeadId,
					@InventoryId,
					@Quantity,
					@Price,
					@AmountPaid
				);", transactionBodyModel);

                var inventoryParam = new { QtyPurchased = item.QtyPurchased, Id = item.Id };
                int updateQty = _context.Execute(@"
                UPDATE Inventory SET
                    QtyAvailable = QtyAvailable - @QtyPurchased
                WHERE
                    Id = @Id;", inventoryParam);

                success = updateQty != 0;
            }

            return success;
        }
        public List<TransactionHead> GetPurchaseTransactions()
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var transactionHeads = _context.Query<TransactionHead>(@"
                SELECT 
	                A.*,
	                (SELECT SUM(Price) FROM TransactionBody WHERE HeadId = A.Id) AS TotalAmount, 
	                (SELECT SUM(AmountPaid) FROM TransactionBody WHERE HeadId = A.Id) AS TotalPaid 
                FROM 
	                TransactionHead A
                WHERE 
                    IsService = 0
                ORDER BY 
	                CAST(A.TranDateTime AS date), 
	                A.Id;
            ");

            return transactionHeads.ToList();
        }
        public TransactionHead GetSelectedPurchaseTransaction(int id)
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);
            var parameters = new { Id = id };
            var transactionHeads = _context.QuerySingle<TransactionHead>(@"
                SELECT * FROM TransactionHead WHERE Id = @Id;
            ", parameters);

            var inventory = _context.Query<Inventory>(@"
                	SELECT 
		                a.Id AS TranBodyId,
		                a.Id,
		                a.Quantity AS QtyPurchased,
		                a.Price AS Srp,
		                a.AmountPaid,
		                D.Name AS BrandName,
		                C.Name AS ItemName,
		                C.Description
	                FROM TransactionBody A 	
	                INNER JOIN Inventory B ON A.InventoryId = B.Id
	                INNER JOIN Item C ON B.ItemId = C.Id
	                INNER JOIN Brand D ON C.BrandId = D.Id
	                WHERE
		                HeadId = @Id;
            ", parameters);

            transactionHeads.Inventory = inventory.ToList();

            return transactionHeads;
        }
        public bool UpdatePurchaseTransaction(TransactionHead transactionHead)
        {
            bool success = false;
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            int row = _context.Execute(@"
                UPDATE [TransactionHead] SET 
					   [Status] = @Status,
                       [Notes] = @Notes
				WHERE 
					   [Id] = @Id;", transactionHead);

            foreach (var item in transactionHead.Inventory)
            {
                var transactionBodyModel = new TransactionBody();
                transactionBodyModel.Id = item.TranBodyId;
                transactionBodyModel.AmountPaid = item.AmountPaid;

                int tranBody = _context.Execute(@"
                    UPDATE TransactionBody SET
                        AmountPaid = @AmountPaid
                    WHERE
                        Id = @Id;
                ", transactionBodyModel);

                success = tranBody != 0;
            }

            return success;
        }
        public bool SaveNewService(TransactionHead transactionHead)
        {
            bool success = false;
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            transactionHead.IsService = true;

            var headId = _context.QuerySingle<int>(@"
                INSERT INTO [TransactionHead]
				(
					[TransactionNo],
					[CustomerName],
					[CustomerContactNo],
                    [Technician],
					[Status],
					[IsService],
                    [ServiceFee],
					[CreatedDate],
                    [Notes],
                    [TranDateTime]
				)
                OUTPUT INSERTED.Id
				VALUES
				(
					@TransactionNo,
					@CustomerName,
					@CustomerContactNo,
                    @Technician,
					@Status,
					@IsService,
                    @ServiceFee,
					@CreatedDate,
                    @Notes,
                    @TranDateTime
				);", transactionHead);

            foreach (var item in transactionHead.Inventory)
            {
                var transactionBodyModel = new TransactionBody();
                transactionBodyModel.HeadId = headId;
                transactionBodyModel.InventoryId = item.Id;
                transactionBodyModel.Quantity = item.QtyPurchased;
                transactionBodyModel.Price = item.Srp;
                transactionBodyModel.AmountPaid = item.AmountPaid;

                if (item.IsService)
                {
                    transactionBodyModel.Notes = item.Description;
                }
                

                int tranBody = _context.Execute(@"
                INSERT INTO [TransactionBody]
				(
					[HeadId],
					[InventoryId],
					[Quantity],
					[Price],
					[AmountPaid],
                    [Notes]
				)
				VALUES
				(
					@HeadId,
					@InventoryId,
					@Quantity,
					@Price,
					@AmountPaid,
                    @Notes
				);", transactionBodyModel);

                var inventoryParam = new { QtyPurchased = item.QtyPurchased, Id = item.Id };
                int updateQty = _context.Execute(@"
                UPDATE Inventory SET
                    QtyAvailable = QtyAvailable - @QtyPurchased
                WHERE
                    Id = @Id;", inventoryParam);

                success = tranBody != 0;
            }

            return success;
        }
        public List<TransactionHead> GetServiceTransactions()
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var transactionHeads = _context.Query<TransactionHead>(@"
                SELECT 
	                A.*,
	                (SELECT SUM(Price) FROM TransactionBody WHERE HeadId = A.Id) AS TotalAmount, 
	                (SELECT SUM(AmountPaid) FROM TransactionBody WHERE HeadId = A.Id) AS TotalPaid 
                FROM 
	                TransactionHead A
                WHERE 
                    IsService = 1
                ORDER BY 
	                CAST(A.CreatedDate AS date), 
	                A.Id;
            ");

            return transactionHeads.ToList();
        }
        public TransactionHead GetSelectedServiceTransaction(int id)
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);
            var parameters = new { Id = id };
            var transactionHeads = _context.QuerySingle<TransactionHead>(@"
                SELECT * FROM TransactionHead WHERE Id = @Id;
            ", parameters);

            var inventory = _context.Query<Inventory>(@"
                	SELECT 
		                a.Id AS TranBodyId,
		                b.Id,
		                a.Quantity AS QtyPurchased,
		                a.Price AS Srp,
		                a.AmountPaid,
		                ISNULL(D.Name,'- - - - -') AS BrandName,
		                ISNULL(C.Name,'Service') AS ItemName,
		                ISNULL(C.Description, A.Notes) AS Description,
                        A.Notes
	                FROM TransactionBody A 	
	                LEFT JOIN Inventory B ON A.InventoryId = B.Id
	                LEFT JOIN Item C ON B.ItemId = C.Id
	                LEFT JOIN Brand D ON C.BrandId = D.Id
	                WHERE
		                HeadId = @Id;
            ", parameters);

            transactionHeads.Inventory = inventory.ToList();

            return transactionHeads;
        }        
        public List<TransactionHead> GetPurchaseUnpaid()
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var transactionHeads = _context.Query<TransactionHead>(@"
                select 
	                a.*, 
	                (select SUM(Price) from TransactionBody where HeadId = a.Id) as TotalAmount, 
	                (select SUM(AmountPaid) from TransactionBody where HeadId = a.Id) as TotalPaid 
                from 
	                TransactionHead a 
                where 
	                a.IsService = 0 and 
	                a.Status in ('Partial Payment', 'Unpaid')
                order by
	                a.TranDateTime;
            ");

            return transactionHeads.ToList();
        }
        public List<TransactionHead> GetServiceUnpaid()
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var transactionHeads = _context.Query<TransactionHead>(@"
                select 
	                a.*, 
	                (select SUM(Price) from TransactionBody where HeadId = a.Id) as TotalAmount, 
	                (select SUM(AmountPaid) from TransactionBody where HeadId = a.Id) as TotalPaid,
	                (select CONCAT(FirstName, ' ', LastName) from Staff where Id = a.Technician) as StaffName
                from 
	                TransactionHead a 
                where 
	                a.IsService = 1 and 
	                a.Status in ('Partial Payment', 'Unpaid')
                order by
	                a.TranDateTime;
            ");

            return transactionHeads.ToList();
        }
    }
}
