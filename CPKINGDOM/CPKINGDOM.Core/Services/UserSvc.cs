using CPKINGDOM.Core.Context;
using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using System;
using System.Linq;

namespace CPKINGDOM.Core.Services
{
    public class UserSvc : IUserSvc
    {
        private readonly DbContext _context;
        private readonly IModuleSvc _moduleSvc;

        public UserSvc(DbContext context, IModuleSvc moduleSvc)
        {
            _moduleSvc = moduleSvc;
            _context = context;
        }

        public User GetUserCredential(string username, string password)
        {
            using var connection = _context.CreateConnection();

            var parameters = new { Username = username, Password = password };

            var user = connection.Query<User>(@"
                    SELECT
                      u.id as userId,
                      u.username,
                      u.firstname,
                      u.middlename,
                      u.lastname,
                      u.address,
                      u.contact,
                      r.id as roleId,
                      r.name as roleName
                    FROM
                      Users u,
                      Role r,
                      RoleAccess ra
                    WHERE
                      u.username = @Username AND
                      u.password = @Password AND
                      u.role_id = r.id;", parameters).FirstOrDefault();

            if (user is null)
            {
                throw new NullReferenceException();
            }

            user.Modules = _moduleSvc.GetModuleByRole(user.RoleId);

            return user;
        }
    }
}
