using CPKINGDOM.Core.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Core.Interfaces
{
    public interface IItemSvc
    {
        List<Category> GetCategories();
        List<Item> GetItems();
        List<Brand> GetBrands();
        List<Supplier> GetSuppliers();        
        bool SaveNewItem(Item item);        
        bool SaveNewCategory(Category category);
        bool SaveNewBrand(Brand brand);
        bool SaveNewSupplier(Supplier supplier);        
        bool UpdateItem(Item item);
        bool UpdateBrand(Brand brand);
        bool UpdateCategory(Category category);
        bool UpdateSupplier(Supplier supplier);        
    }
}
