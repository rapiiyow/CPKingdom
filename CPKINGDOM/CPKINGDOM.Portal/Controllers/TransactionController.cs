using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
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

        [HttpGet("getpurchaseno")]
        public IActionResult GetPurchaseNo()
        {
            var result = new JResponse()
            {
                Data = _transactionSvc.GetPurchaseNo()
            };
            return Ok(result);
        }

        [HttpGet("getserviceno")]
        public IActionResult GetServiceNo()
        {
            var result = new JResponse()
            {
                Data = _transactionSvc.GetServiceNo()
            };
            return Ok(result);
        }

        [HttpGet("gettechnicians")]
        public IActionResult GetTechnicians()
        {
            var result = new JResponse()
            {
                Data = _staffSvc.GetTechnicians()
            };
            return Ok(result);
        }

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

        [HttpGet("getpurchasetransactions")]
        public IActionResult GetPurchaseTransactions()
        {
            return Ok(_transactionSvc.GetPurchaseTransactions());
        }

        [HttpGet("getselectedpurchasetransaction")]
        public IActionResult GetSelectedPurchaseTransaction(int id)
        {
            return Ok(_transactionSvc.GetSelectedPurchaseTransaction(id));
        }

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

        [HttpGet("getservicetransactions")]
        public IActionResult GetServiceTransactions()
        {
            return Ok(_transactionSvc.GetServiceTransactions());
        }

        [HttpGet("getselectedservicetransaction")]
        public IActionResult GetSelectedServiceTransaction(int id)
        {
            return Ok(_transactionSvc.GetSelectedServiceTransaction(id));
        }

        [HttpGet("getunpaidpurchase")]
        public IActionResult GetUnpaidPurchase()
        {
            return Ok(_transactionSvc.GetPurchaseUnpaid());
        }

        [HttpGet("getunpaidservice")]
        public IActionResult GetUnpaidService()
        {
            return Ok(_transactionSvc.GetServiceUnpaid());
        }

        [HttpGet("gettechniciantransaction")]
        public IActionResult GetTechnicianTransaction(int staffId, DateTime fromDate, DateTime toDate)
        {
            return Ok(_transactionSvc.GetTechnicianTransaction(staffId, fromDate, toDate));
        }
    }
}
