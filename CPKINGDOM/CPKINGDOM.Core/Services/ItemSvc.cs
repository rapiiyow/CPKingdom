using CPKINGDOM.Core.Context;
using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;

namespace CPKINGDOM.Core.Services
{
    public class ItemSvc : IItemSvc
    {
        private readonly DbContext _context;

        public ItemSvc(DbContext context) => _context = context;
        public List<Category> GetCategories()
        {
            using var connection = _context.CreateConnection();

            var categories = connection.Query<Category>(@"
                SELECT
                    *
                FROM
                    Category
                ORDER BY
                    Name;
            ");

            return categories.ToList();
        }
        public List<Brand> GetBrands()
        {
            using var connection = _context.CreateConnection();

            var brands = connection.Query<Brand>(@"
                SELECT
                    *
                FROM
                    Brand
                ORDER BY
                    Name;
            ");

            return brands.ToList();
        }
        public List<Item> GetItems()
        {
            using var connection = _context.CreateConnection();

            var items = connection.Query<Item>(@"
                SELECT
	                a.[Id],
	                a.[Barcode],
	                a.[Name],
	                a.[Description],
	                a.[Srp],
	                a.[CategoryId],
                    a.[BrandId],
	                b.[Name] AS BrandName,
                    a.[ReorderPoint],
                    a.[CriticalLevel]
                FROM
	                [Item] a
                INNER JOIN
	                [Brand] b
                ON
	                a.[BrandId] = b.[Id]
                ORDER BY
	                a.[Name];
            ");

            return items.ToList();
        }
        public List<Supplier> GetSuppliers()
        {
            using var connection = _context.CreateConnection();

            var suppliers = connection.Query<Supplier>(@"
                SELECT
	                *
                FROM
	                [Supplier] 
                ORDER BY
	                [Name];
            ");

            return suppliers.ToList();

        }
        public bool SaveNewItem(Item item)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                INSERT INTO [Item] 
                (
                    [Barcode],
                    [Name],
                    [Description],
                    [Srp],
                    [CategoryId],
                    [BrandId],
                    [ReorderPoint],
                    [CriticalLevel]
                )
                VALUES 
                (
                    @Barcode,
                    @Name,
                    @Description,
                    @Srp,
                    @CategoryId,
                    @BrandId,
                    @ReorderPoint,
                    @CriticalLevel
                )", item);

            return row != 0;
        }
        public bool SaveNewCategory(Category category)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                INSERT INTO [Category] 
                (
                    [Name]
                )
                VALUES 
                (
                    @Name
                )", category);

            return row != 0;
        }
        public bool SaveNewBrand(Brand brand)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                INSERT INTO [Brand] 
                (
                    [Name]
                )
                VALUES 
                (
                    @Name
                )", brand);

            return row != 0;
        }
        public bool SaveNewSupplier(Supplier supplier)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                INSERT INTO [Supplier] 
                (
                    [Name],
                    [Address],
                    [ContactPerson],
                    [ContactNo]
                )
                VALUES 
                (
                    @Name,
                    @Address,
                    @ContactPerson,
                    @ContactNo
                )", supplier);

            return row != 0;
        }
        public bool UpdateBrand(Brand brand)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                UPDATE [Brand] SET
                    [Name] = @Name
                WHERE
                    [Id] = @Id;", brand);

            return row != 0;
        }
        public bool UpdateCategory(Category category)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                UPDATE [Category] SET
                    [Name] = @Name
                WHERE
                    [Id] = @Id;", category);

            return row != 0;
        }
        public bool UpdateSupplier(Supplier supplier)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                UPDATE [Supplier] SET
                    [Name] = @Name,
                    [Address] = @Address,
                    [ContactPerson] = @ContactPerson,
                    [ContactNo] = @ContactNo
                WHERE
                    [Id] = @Id;", supplier);

            return row != 0;
        }
        public bool UpdateItem(Item item)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                UPDATE [dbo].[Item] SET 
                    [Barcode] = @Barcode, 
                    [Name] = @Name, 
                    [Description] = @Description, 
                    [Srp] = @Srp,
                    [CategoryId] = @CategoryId,
                    [BrandId] = @BrandId,
                    [ReorderPoint] = @ReorderPoint,
                    [CriticalLevel] = @CriticalLevel
                WHERE 
                    [Id] = @Id;", item);

            return row != 0;
        }
    }
}
