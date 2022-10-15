CREATE TABLE [dbo].[Item](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Barcode] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[Description] [nvarchar](50) NULL,
	[Srp] [decimal](18, 2) NULL,
	[CategoryId] [int] NULL, 
    [BrandId] INT NULL
) ON [PRIMARY]