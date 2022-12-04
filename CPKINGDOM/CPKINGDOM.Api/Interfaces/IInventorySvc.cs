using CPKINGDOM.Api.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Api.Interfaces
{
    public interface IInventorySvc
    {
        List<Inventory> GetInventories();
        bool SaveInventory(Inventory inventory);
        bool UpdateInventory(Inventory inventory);
        List<Inventory> GetItemInventory(int itemId);
        List<Inventory> GetAvailableItems();
        List<Inventory> GetReorderCritical();
    }
}
