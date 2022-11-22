CREATE TABLE [dbo].[TransactionHead]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [TransactionNo] NVARCHAR(50) NULL, 
    [CustomerName] NVARCHAR(50) NULL, 
    [CustomerContactNo] NVARCHAR(50) NULL, 
    [Notes] NVARCHAR(250) NULL, 
    [Technician] INT NULL,         
    [Status] NVARCHAR(50) NULL, 
    [IsService] BIT NULL,
    [ServiceFee] DECIMAL(18, 2) NULL, 
    [CreatedBy] INT NULL, 
    [CreatedDate] DATETIME NULL, 
    [TranDateTime] DATETIME NULL 
)
