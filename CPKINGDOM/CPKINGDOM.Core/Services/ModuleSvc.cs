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
        private readonly IConfiguration _config;

        public ModuleSvc(IConfiguration config)
        {
            _config = config;
        }

        public List<Module> GetModuleByRole(int roleId)
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var modules = _context.Query<Module>(@"
                    SELECT
                        m.Id,
                        m.description as ModuleName,
                        m.route,
                        m.parent,
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
