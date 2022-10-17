using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace CPKINGDOM.Core.Services
{
    public class StaffSvc : IStaffSvc
    {
        private readonly IConfiguration _config;

        public StaffSvc(IConfiguration config)
        {
            _config = config;
        }

        public List<Role> GetRoles()
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var roles = _context.Query<Role>(@"
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
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var staffs = _context.Query<Staff>(@"
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
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            int row = _context.Execute(@"
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
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            int row = _context.Execute(@"
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
    }
}
