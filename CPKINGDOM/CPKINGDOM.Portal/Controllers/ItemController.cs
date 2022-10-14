using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace CPKINGDOM.Portal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly IItemSvc _itemSvc;
        public ItemController(IItemSvc categorySvc)
        {
            _itemSvc = categorySvc;
        }

        [HttpGet("getcategories")]
        public IActionResult GetCategories()
        {
            return Ok(_itemSvc.GetCategories());
        }

        [HttpGet("getitems")]
        public IActionResult GetItems()
        {
            return Ok(_itemSvc.GetItems());
        }

        [HttpPost("savenewitem")]
        public IActionResult SaveNewItem(Item item)
        {
            var result = new JResponse()
            {
                Success = _itemSvc.SaveNewItem(item),
                Message = "Item successfully added!"
            };
            return Ok(result);
        }
    }
}
