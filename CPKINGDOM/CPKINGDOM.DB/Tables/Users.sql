CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [firstname] NVARCHAR(MAX) NULL, 
    [middlename] NVARCHAR(MAX) NULL, 
    [lastname] NVARCHAR(MAX) NULL, 
    [address] NVARCHAR(MAX) NULL, 
    [contact] VARCHAR(MAX) NULL, 
    [role_id] INT NULL, 
    [username] VARCHAR(MAX) NULL, 
    [password] VARCHAR(MAX) NULL
)
