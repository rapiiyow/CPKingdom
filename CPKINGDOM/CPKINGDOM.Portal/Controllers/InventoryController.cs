using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CPKINGDOM.Portal.Controllers
{
    [ApiController]
    [Route("inventory")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventorySvc _inventorySvc;

        public InventoryController(IInventorySvc inventorySvc) => _inventorySvc = inventorySvc;

        [Authorize]
        [HttpGet("getinventories")]
        public IActionResult GetInventories()
        {
            return Ok(_inventorySvc.GetInventories());
        }

        [Authorize]
        [HttpGet("getiteminventory")]
        public IActionResult GetItemInventory(int itemId)
        {
            return Ok(_inventorySvc.GetItemInventory(itemId));
        }
        [Authorize]
        [HttpPost("saveinventory")]
        public IActionResult SaveInventory(Inventory inventory)
        {
            var result = new JResponse()
            {
                Success = _inventorySvc.SaveInventory(inventory),
                Message = "Item successfully added!"
            };
            return Ok(result);
        }

        [Authorize]
        [HttpPost("updateinventory")]
        public IActionResult UpdateInventory(Inventory inventory)
        {
            var result = new JResponse()
            {
                Success = _inventorySvc.UpdateInventory(inventory),
                Message = "Item successfully updated!"
            };
            return Ok(result);
        }

        [HttpGet("getavailableitems")]
        public IActionResult GetAvailableItems()
        {
            return Ok(_inventorySvc.GetAvailableItems());
        }

        [HttpGet("getreorderpoint")]
        public IActionResult GetReorderPoint()
        {
            return Ok(_inventorySvc.GetReorderCritical());
        }
    }
}
