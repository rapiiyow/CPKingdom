using CPKINGDOM.Core.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Core.Interfaces
{
    public interface IItemSvc
    {
        List<Category> GetCategories();
        List<Item> GetItems();
        bool SaveNewItem(Item item);
    }
}
