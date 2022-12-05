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

namespace CPKINGDOM.Core.Services
{
    public class ModuleSvc : IModuleSvc
    {
        private readonly DbContext _context;

        public ModuleSvc(DbContext context) => _context = context;

        public List<Module> GetModuleByRole(int roleId)
        {
            using var connection = _context.CreateConnection();

            var modules = connection.Query<Module>(@"
                    SELECT
                        m.Id moduleId,
                        m.description as ModuleName,
                        m.route,
                        m.parentId,
                        m.sequence,
                        m.icon
                    FROM
                        Modules m 
                    LEFT JOIN
                        roleAccess ra
                    ON
                        m.id = ra.module_id
                    LEFT JOIN
                        role r
                    ON ra.role_id = r.id
                    WHERE ra.role_id = " + roleId + @"
                    ORDER BY m.sequence");

            return modules.ToList();
        }
    }
}
