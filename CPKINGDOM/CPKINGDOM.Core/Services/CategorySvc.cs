using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;

namespace CPKINGDOM.Core.Services
{
    public class CategorySvc : ICategorySvc
    {
        private readonly IConfiguration _config;

        public CategorySvc(IConfiguration config)
        {
            _config = config;
        }
        public List<Category> GetCategories()
        {
            using var _context = new SqlConnection(_config["CpKingdom:ConnectionString"]);

            var categories = _context.Query<Category>(@"
                SELECT
                    *
                FROM
                    Category;
            ");

            return categories.ToList();
        }
    }
}
