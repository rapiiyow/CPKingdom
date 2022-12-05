using CPKINGDOM.Core.Context;
using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CPKINGDOM.Core.Services
{
    public class UserSvc : IUserSvc
    {
        private readonly IModuleSvc _moduleSvc;

        private readonly DbContext _context;

        public UserSvc(DbContext context, IModuleSvc moduleSvc)
        {
            _context = context;
            _moduleSvc = moduleSvc;
        }

        public User GetUserCredential(string username, string password)
        {
            using var connection = _context.CreateConnection();

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
                      u.username = '" + username + @"' AND
                      u.password = '" + password + @"' AND
                      u.role_id = r.id;").FirstOrDefault();

            if(user is null)
            {
                throw new NullReferenceException();
            }

            user.Modules = _moduleSvc.GetModuleByRole(user.RoleId);

            return user;
        }
    }
}
