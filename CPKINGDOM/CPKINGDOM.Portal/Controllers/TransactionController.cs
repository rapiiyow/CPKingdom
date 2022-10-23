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
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionSvc _transactionSvc;

        public TransactionController(ITransactionSvc transactionSvc)
        {
            _transactionSvc = transactionSvc;
        }

        [HttpGet("getpurchaseno")]
        public IActionResult GetPurchaseNo()
        {
            var result = new JResponse()
            {
                Data = _transactionSvc.GetPurchaseNo(),
                Message = "Item successfully updated!"
            };
            return Ok(result);
        }

        [HttpPost("savepurchase")]
        public IActionResult UpdateInventory(TransactionHead transactionHead)
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
    }
}
