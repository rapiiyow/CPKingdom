using CPKINGDOM.Core.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Core.Interfaces
{
    public interface IInventorySvc
    {
        List<Inventory> GetInventories();
        bool SaveInventory(Inventory inventory);
        bool UpdateInventory(Inventory inventory);
        List<Inventory> GetItemInventory(int itemId);
    }
}
