using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace CPKINGDOM.Core.Services
{
    public class ItemSvc : IItemSvc
    {
        private readonly IConfiguration _config;

        public ItemSvc(IConfiguration config)
        {
            _config = config;
        }
        public List<Category> GetCategories()
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var categories = _context.Query<Category>(@"
                SELECT
                    *
                FROM
                    Category
                ORDER BY
                    Name;
            ");

            return categories.ToList();
        }
        public List<Item> GetItems()
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var items = _context.Query<Item>(@"
                SELECT
	                a.[Id],
	                a.[Barcode],
	                a.[Name],
	                a.[Description],
	                a.[Srp],
	                a.[CategoryId],
	                b.[Name] AS CategoryName
                FROM
	                [Item] a
                INNER JOIN
	                [Category] b
                ON
	                a.[CategoryId] = b.[Id]
                ORDER BY
	                a.[Name];
            ");

            return items.ToList();
        }
        public bool SaveNewItem(Item item)
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            int row = _context.Execute(@"
                INSERT INTO [Item] 
                (
                    [Barcode],
                    [Name],
                    [Description],
                    [Srp],
                    [CategoryId]
                )
                VALUES 
                (
                    @Barcode,
                    @Name,
                    @Description,
                    @Srp,
                    @CategoryId
                )", item);

            return row != 0;
        }
    }
}
