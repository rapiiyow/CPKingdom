using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPKINGDOM.Portal.Controllers
{
    [ApiController]
    [Route("transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionSvc _transactionSvc;
        private readonly IStaffSvc _staffSvc;
        public TransactionController(ITransactionSvc transactionSvc, IStaffSvc staffSvc)
        {
            _transactionSvc = transactionSvc;
            _staffSvc = staffSvc;
        }

        [Authorize]
        [HttpGet("getpurchaseno")]
        public IActionResult GetPurchaseNo()
        {
            var result = new JResponse()
            {
                Data = _transactionSvc.GetPurchaseNo()
            };
            return Ok(result);
        }

        [Authorize]
        [HttpGet("getserviceno")]
        public IActionResult GetServiceNo()
        {
            var result = new JResponse()
            {
                Data = _transactionSvc.GetServiceNo()
            };
            return Ok(result);
        }

        [Authorize]
        [HttpGet("gettechnicians")]
        public IActionResult GetTechnicians()
        {
            var result = new JResponse()
            {
                Data = _staffSvc.GetTechnicians()
            };
            return Ok(result);
        }

        [Authorize]
        [HttpPost("savepurchase")]
        public IActionResult SaveNewPurchase(TransactionHead transactionHead)
        {
            var result = new JResponse()
            {
                Success = _transactionSvc.SaveNewPurchase(transactionHead),
                Message = "Purchase successfully saved!"
            };
            return Ok(result);
        }

        [Authorize]
        [HttpGet("getpurchasetransactions")]
        public IActionResult GetPurchaseTransactions()
        {
            return Ok(_transactionSvc.GetPurchaseTransactions());
        }

        [Authorize]
        [HttpGet("getselectedpurchasetransaction")]
        public IActionResult GetSelectedPurchaseTransaction(int id)
        {
            return Ok(_transactionSvc.GetSelectedPurchaseTransaction(id));
        }

        [Authorize]
        [HttpPost("updatepurchasetransaction")]
        public IActionResult UpdatePurchaseTransaction(TransactionHead transactionHead)
        {
            var result = new JResponse()
            {
                Success = _transactionSvc.UpdatePurchaseTransaction(transactionHead),
                Message = "Purchase successfully updated!"
            };
            return Ok(result);
        }

        [Authorize]
        [HttpPost("saveservice")]
        public IActionResult SaveService(TransactionHead transactionHead)
        {
            var result = new JResponse()
            {
                Success = _transactionSvc.SaveNewService(transactionHead),
                Message = "Service successfully saved!"
            };
            return Ok(result);
        }

        [Authorize]
        [HttpGet("getservicetransactions")]
        public IActionResult GetServiceTransactions()
        {
            return Ok(_transactionSvc.GetServiceTransactions());
        }

        [Authorize]
        [HttpGet("getselectedservicetransaction")]
        public IActionResult GetSelectedServiceTransaction(int id)
        {
            return Ok(_transactionSvc.GetSelectedServiceTransaction(id));
        }

        [Authorize]
        [HttpGet("getunpaidpurchase")]
        public IActionResult GetUnpaidPurchase()
        {
            return Ok(_transactionSvc.GetPurchaseUnpaid());
        }

        [Authorize]
        [HttpGet("getunpaidservice")]
        public IActionResult GetUnpaidService()
        {
            return Ok(_transactionSvc.GetServiceUnpaid());
        }

        [Authorize]
        [HttpGet("gettechniciantransaction")]
        public IActionResult GetTechnicianTransaction(int staffId, DateTime fromDate, DateTime toDate)
        {
            return Ok(_transactionSvc.GetTechnicianTransaction(staffId, fromDate, toDate));
        }

        [Authorize]
        [HttpGet("gettransactiondashboard")]
        public IActionResult GetTransactionDashboard()
        {
            return Ok(_transactionSvc.GetTransactionDashboard());
        }
    }
}
