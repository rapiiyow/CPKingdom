using CPKINGDOM.Core.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Core.Interfaces
{
    public interface ICategorySvc
    {
        List<Category> GetCategories(); 
    }
}
