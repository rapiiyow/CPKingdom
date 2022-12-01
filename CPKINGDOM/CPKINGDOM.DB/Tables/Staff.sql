CREATE TABLE [dbo].[Staff]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FirstName] NVARCHAR(50) NULL, 
    [MiddleName] NVARCHAR(50) NULL, 
    [LastName] NVARCHAR(50) NULL, 
    [Address] NVARCHAR(250) NULL, 
    [ContactNo] NVARCHAR(50) NULL, 
    [RoleId] INT NULL
)
