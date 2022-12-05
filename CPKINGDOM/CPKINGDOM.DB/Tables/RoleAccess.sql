CREATE TABLE [dbo].[RoleAccess]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [module_id] INT NULL, 
    [role_id] INT NULL
)
