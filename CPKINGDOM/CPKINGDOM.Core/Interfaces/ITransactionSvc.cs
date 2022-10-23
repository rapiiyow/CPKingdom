using CPKINGDOM.Core.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Core.Interfaces
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
    }
}
