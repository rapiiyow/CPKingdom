﻿CREATE TABLE [dbo].[Modules]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [description] NVARCHAR(MAX) NULL, 
    [route] NVARCHAR(MAX) NULL, 
    [parentId] INT NULL, 
    [sequence] INT NULL, 
    [icon] VARCHAR(50) NULL
)