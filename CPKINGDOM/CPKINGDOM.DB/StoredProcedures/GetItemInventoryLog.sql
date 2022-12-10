CREATE PROCEDURE [dbo].[GetItemInventoryLog]
	@ItemId int
AS
declare @temp table (
	ItemId int,
	StockType nvarchar(10),
	TranDate date,
	[Name] nvarchar(250),
	Quantity int
)


insert into @temp
select i.ItemId, 'IN', i.DateReceived, s.Name, i.QtyReceived from Inventory i inner join Supplier s on i.SupplierId = s.Id where i.ItemId = @ItemId
UNION
select c.ItemId, 'OUT', cast(a.TranDateTime as date), a.CustomerName, b.Quantity from TransactionHead a inner join TransactionBody b on a.Id = b.HeadId inner join Inventory c on b.InventoryId = c.Id where c.ItemId = @ItemId


select 
	a.TranDate,
	a.StockType,
	a.Quantity,
	c.Name as BrandName,
	b.Name as ItemName,
	b.Description as ItemDescription,
	a.Name as CustomerSupplier
from 
	@temp a 
inner join 
	Item b on a.ItemId = b.Id 
inner join 
	Brand c on b.BrandId = c.Id
order by
	a.TranDate