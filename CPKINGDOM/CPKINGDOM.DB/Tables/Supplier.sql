CREATE TABLE [dbo].[Supplier]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(50) NULL, 
    [Address] NVARCHAR(250) NULL, 
    [ContactPerson] NVARCHAR(250) NULL, 
    [ContactNo] NVARCHAR(50) NULL
)
