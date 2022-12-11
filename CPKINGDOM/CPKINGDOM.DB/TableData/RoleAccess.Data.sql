truncate table RoleAccess
go

SET NOCOUNT ON

SET IDENTITY_INSERT [dbo].[RoleAccess] ON
GO

MERGE INTO [dbo].[RoleAccess]  AS [target] USING (VALUES 
(1,1,3),
(2,2,3),
(3,3,3),
(4,4,3),
(5,5,3),
(6,6,3),
(7,7,3),
(8,8,3),
(9,9,3),
(10,10,3),
(11,11,3),
(12,12,3),
(13,13,3),
(14,14,3),
(15,15,3),
(16,16,3),
(17,17,3)
)  AS [source] (
    [Id],[module_id],[role_id]
) ON 
    [target].[Id] = [source].[Id]
     
WHEN NOT MATCHED BY TARGET THEN
    INSERT (
          [Id],[module_id],[role_id]
    ) VALUES (
          [Id],[module_id],[role_id]
    )WHEN NOT MATCHED BY SOURCE THEN
DELETE;

GO

DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [dbo].[RoleAccess]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[dbo].[RoleAccess] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [dbo].[RoleAccess] OFF
GO
SET NOCOUNT OFF
GO