truncate table Modules
go

SET NOCOUNT ON

SET IDENTITY_INSERT [dbo].[Modules] ON
GO

MERGE INTO [dbo].[Modules]  AS [target] USING (VALUES 
 (1, 'Dashboard', '/', null, 1, 'fa-home'),
 (2, 'Transactions', '/transactions', null, 2, 'fa-handshake-o'),
 (3, 'Purchases', '/purchase', 2, 3, 'fa-shopping-cart'),
 (4, 'Services', '/service', 2, 4, 'fa-wrench'),
 (5, 'Inventory', '/inventory', null, 5, 'fa-list-alt'),
 (6, 'Technician Monitoring', '/technician', null, 6, 'fa-user'),
 (7, 'Reports', '/reports', null, 7, 'fa-book'),
 (8, 'Reorder Point', '/reorderpoint', 7, 8, 'fa-exclamation-triangle'),
 (9, 'Unpaid Purchase', '/unpaidpurchase', 7, 9, 'fa-money'),
 (10, 'Unpaid Service', '/unpaidservice', 7, 10, 'fa-money'),
 (11, 'Settings', '/settings', null, 11, 'fa-sliders'),
 (12, 'Categories', '/category', 11, 12, 'fa-th-list'),
 (13, 'Brands', '/brand', 11, 13, 'fa-tag'),
 (14, 'Items', '/item', 11, 14, 'fa-cube'),
 (15, 'Suppliers', '/supplier', 11, 15, 'fa-users'),
 (16, 'Staffs', '/staff', 11, 16, 'fa-id-card-o'),
 (17, 'Item Inventory Log', '/inventorylog', 7, 17, 'fa-list-alt')
)  AS [source] (
    [Id],[description],[route],[parentId],[sequence],[icon]
) ON 
    [target].[Id] = [source].[Id]
     
WHEN NOT MATCHED BY TARGET THEN
    INSERT (
          [Id],[description],[route],[parentId],[sequence],[icon]
    ) VALUES (
          [Id],[description],[route],[parentId],[sequence],[icon]
    )WHEN NOT MATCHED BY SOURCE THEN
DELETE;

GO

DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [dbo].[Modules]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[dbo].[Modules] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [dbo].[Modules] OFF
GO
SET NOCOUNT OFF
GO