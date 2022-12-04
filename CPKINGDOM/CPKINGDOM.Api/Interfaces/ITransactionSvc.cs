using CPKINGDOM.Api.Models;
using System;
using System.Collections.Generic;

namespace CPKINGDOM.Api.Interfaces
{
    public interface ITransactionSvc
    {
        string GetPurchaseNo();
        string GetServiceNo();
        bool SaveNewPurchase(TransactionHead transactionHead);
        List<TransactionHead> GetPurchaseTransactions();
        TransactionHead GetSelectedPurchaseTransaction(int id);
        bool UpdatePurchaseTransaction(TransactionHead transactionHead);
        bool SaveNewService(TransactionHead transactionHead);
        List<TransactionHead> GetServiceTransactions();
        TransactionHead GetSelectedServiceTransaction(int id);
        List<TransactionHead> GetPurchaseUnpaid();
        List<TransactionHead> GetServiceUnpaid();
        List<TransactionHead> GetTechnicianTransaction(int staffId, DateTime fromDate, DateTime toDate);
    }
}
