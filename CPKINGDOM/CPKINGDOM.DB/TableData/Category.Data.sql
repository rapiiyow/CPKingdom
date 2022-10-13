truncate table Category
go

SET NOCOUNT ON

SET IDENTITY_INSERT [dbo].[Category] ON
GO

MERGE INTO [dbo].[Category]  AS [target] USING (VALUES 
 (1, 'Cellphone'),
 (2, 'Computer'),
 (3, 'Accessories'),
 (4, 'Parts')
)  AS [source] (
    [Id],[Name]
) ON 
    [target].[Id] = [source].[Id]
AND [target].[Name] = [source].[Name]
     
WHEN NOT MATCHED BY TARGET THEN
    INSERT (
          [Id],[Name]
    ) VALUES (
          [Id],[Name]
    )WHEN NOT MATCHED BY SOURCE THEN
DELETE;

GO

DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [dbo].[Category]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[dbo].[Category] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [dbo].[Category] OFF
GO
SET NOCOUNT OFF
GO