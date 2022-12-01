CREATE TABLE [dbo].[TransactionBody]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [HeadId] INT NULL, 
    [InventoryId] INT NULL, 
    [Quantity] INT NULL,
    [Price] DECIMAL(18, 2) NULL, 
    [AmountPaid] DECIMAL(18, 2) NULL, 
    [Notes] NVARCHAR(250) NULL
    
)
