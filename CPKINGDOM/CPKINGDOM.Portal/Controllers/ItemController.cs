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
        [HttpGet("getbrands")]
        public IActionResult GetBrands()
        {
            return Ok(_itemSvc.GetBrands());
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

        [HttpPost("updateitem")]
        public IActionResult UpdateItem(Item item)
        {
            var result = new JResponse()
            {
                Success = _itemSvc.UpdateItem(item),
                Message = "Item successfully updated!"
            };
            return Ok(result);
        }

        [HttpPost("savenewbrand")]
        public IActionResult SaveNewBrand(Brand brand)
        {
            var result = new JResponse()
            {
                Success = _itemSvc.SaveNewBrand(brand),
                Message = "Brand successfully added!"
            };
            return Ok(result);
        }
        [HttpPost("savenewcategory")]
        public IActionResult SaveNewCategory(Category category)
        {
            var result = new JResponse()
            {
                Success = _itemSvc.SaveNewCategory(category),
                Message = "Category successfully added!"
            };
            return Ok(result);
        }

        [HttpPost("updatebrand")]
        public IActionResult UpdateBrand(Brand brand)
        {
            var result = new JResponse()
            {
                Success = _itemSvc.UpdateBrand(brand),
                Message = "Brand successfully updated!"
            };
            return Ok(result);
        }

        [HttpPost("updatecategory")]
        public IActionResult UpdateCategory(Category category)
        {
            var result = new JResponse()
            {
                Success = _itemSvc.UpdateCategory(category),
                Message = "Category successfully updated!"
            };
            return Ok(result);
        }
    }
}
