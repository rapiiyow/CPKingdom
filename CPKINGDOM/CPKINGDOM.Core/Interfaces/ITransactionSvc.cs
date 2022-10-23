using CPKINGDOM.Core.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Core.Interfaces
{
    public interface ITransactionSvc
    {
        string GetPurchaseNo();
        bool SaveNewPurchase(TransactionHead transactionHead);
        List<TransactionHead> GetPurchaseTransactions();
        TransactionHead GetSelectedPurchaseTransaction(int id);
        bool UpdatePurchaseTransaction(TransactionHead transactionHead);
    }
}
