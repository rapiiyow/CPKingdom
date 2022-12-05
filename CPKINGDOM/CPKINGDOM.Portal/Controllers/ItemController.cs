using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CPKINGDOM.Portal.Controllers
{
    [ApiController]
    [Route("item")]
    public class ItemController : ControllerBase
    {
        private readonly IItemSvc _itemSvc;
        private readonly IStaffSvc _staffSvc;
        public ItemController(IItemSvc categorySvc, IStaffSvc staffSvc)
        {
            _itemSvc = categorySvc;
            _staffSvc = staffSvc;
        }

        [Authorize]
        [HttpGet("getcategories")]
        public IActionResult GetCategories()
        {
            return Ok(_itemSvc.GetCategories());
        }

        [Authorize]
        [HttpGet("getbrands")]
        public IActionResult GetBrands()
        {
            return Ok(_itemSvc.GetBrands());
        }

        [Authorize]
        [HttpGet("getitems")]
        public IActionResult GetItems()
        {
            return Ok(_itemSvc.GetItems());
        }

        [Authorize]
        [HttpGet("getsuppliers")]
        public IActionResult GetSuppliers()
        {
            return Ok(_itemSvc.GetSuppliers());
        }

        [Authorize]
        [HttpGet("getstaffs")]
        public IActionResult GetStaffs()
        {
            return Ok(_staffSvc.GetStaffs());
        }

        [Authorize]
        [HttpGet("getroles")]
        public IActionResult GetRoles()
        {
            return Ok(_staffSvc.GetRoles());
        }

        [Authorize]
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

        [Authorize]
        [HttpPost("savenewsupplier")]
        public IActionResult SaveNewSupplier(Supplier supplier)
        {
            var result = new JResponse()
            {
                Success = _itemSvc.SaveNewSupplier(supplier),
                Message = "Supplier successfully added!"
            };
            return Ok(result);
        }

        [Authorize]
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

        [Authorize]
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

        [Authorize]
        [HttpPost("savenewstaff")]
        public IActionResult SaveNewStaff(Staff staff)
        {
            var result = new JResponse()
            {
                Success = _staffSvc.SaveNewStaff(staff),
                Message = "Staff successfully added!"
            };
            return Ok(result);
        }

        [Authorize]
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

        [Authorize]
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

        [Authorize]
        [HttpPost("updatesupplier")]
        public IActionResult UpdateSupplier(Supplier supplier)
        {
            var result = new JResponse()
            {
                Success = _itemSvc.UpdateSupplier(supplier),
                Message = "Supplier successfully updated!"
            };
            return Ok(result);
        }

        [Authorize]
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

        [Authorize]
        [HttpPost("updatestaff")]
        public IActionResult UpdateStaff(Staff staff)
        {
            var result = new JResponse()
            {
                Success = _staffSvc.UpdateStaff(staff),
                Message = "Staff successfully updated!"
            };
            return Ok(result);
        }
    }
}
