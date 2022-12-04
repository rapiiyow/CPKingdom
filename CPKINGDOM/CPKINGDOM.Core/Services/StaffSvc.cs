using CPKINGDOM.Core.Context;
using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;

namespace CPKINGDOM.Core.Services
{
    public class StaffSvc : IStaffSvc
    {
        private readonly DbContext _context;

        public StaffSvc(DbContext context) => _context = context;
        public List<Role> GetRoles()
        {
            using var connection = _context.CreateConnection();

            var roles = connection.Query<Role>(@"
                SELECT 
                    *
                FROM 
                    Role
                ORDER BY 
                    Name;
            ");

            return roles.ToList();
        }
        public List<Staff> GetStaffs()
        {
            using var connection = _context.CreateConnection();

            var staffs = connection.Query<Staff>(@"
                SELECT 
                    a.Id,
                    a.FirstName,
                    a.MiddleName,
                    a.LastName,
                    a.Address,
                    a.ContactNo,
                    a.RoleId,
                    b.Name as 'RoleName',
                    CONCAT(a.FirstName, ' ', a.LastName) as 'FullName'
                FROM 
                    Staff a 
                INNER JOIN 
                    Role b 
                ON 
                    a.RoleId = b.Id 
                ORDER BY 
                    a.FirstName;
            ");

            return staffs.ToList();
        }
        public bool SaveNewStaff(Staff staff)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                INSERT INTO [dbo].[Staff]
                (
                    [FirstName],
		            [MiddleName],
		            [LastName],
		            [Address],
		            [ContactNo],
		            [RoleId]
                )
                VALUES
                (
                    @FirstName,
                    @MiddleName,
                    @LastName,
                    @Address,
                    @ContactNo,
                    @RoleId
                );", staff);

            return row != 0;
        }
        public bool UpdateStaff(Staff staff)
        {
            using var connection = _context.CreateConnection();

            int row = connection.Execute(@"
                UPDATE [Staff] SET
	                FirstName = @FirstName,
	                MiddleName = @MiddleName,
	                LastName = @LastName,
	                Address = @Address,
	                ContactNo = @ContactNo,
	                RoleId = @RoleId
                WHERE
	                Id = @Id;", staff);

            return row != 0;
        }
        public List<Staff> GetTechnicians()
        {
            using var connection = _context.CreateConnection();

            var staffs = connection.Query<Staff>(@"
                SELECT 
                    a.Id,
                    a.FirstName,
                    a.MiddleName,
                    a.LastName,
                    a.Address,
                    a.ContactNo,
                    a.RoleId,
                    b.Name as 'RoleName',
                    CONCAT(a.FirstName, ' ', a.LastName) as 'FullName'
                FROM 
                    Staff a 
                INNER JOIN 
                    Role b 
                ON 
                    a.RoleId = b.Id 
                WHERE b.Name = 'Technician'
                ORDER BY 
                    a.FirstName;
            ");

            return staffs.ToList();
        }
    }
}
