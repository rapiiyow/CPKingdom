CREATE TABLE [dbo].[Inventory]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [ItemId] INT NULL, 
    [SupplierId] INT NULL, 
    [CostPrice] DECIMAL(18, 2) NULL, 
    [DateReceived] DATE NULL, 
    [QtyReceived] INT NULL, 
    [QtyAvailable] INT NULL, 
    [Remarks] NVARCHAR(250) NULL
)
