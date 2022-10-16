using CPKINGDOM.Core.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Core.Interfaces
{
    public interface IItemSvc
    {
        List<Category> GetCategories();
        List<Item> GetItems();
        List<Brand> GetBrands();
        bool SaveNewItem(Item item);
        bool UpdateItem(Item item);
        bool SaveNewCategory(Category category);
        bool SaveNewBrand(Brand brand);
        bool UpdateBrand(Brand brand);
        bool UpdateCategory(Category category);
    }
}
