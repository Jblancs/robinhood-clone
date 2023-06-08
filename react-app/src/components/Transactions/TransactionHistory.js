import React from "react";
import TransactionCard from "./TransactionCard";

function TransactionHistory({ transactions, stockTicker }) {
    if (transactions.error) return <></>

    let transactionsList = Object.values(transactions)
    let sortedTransactions = transactionsList.sort((a, b) => b.id - a.id)

    return (
        <div className="trans-hist-container">
            {sortedTransactions.map(trans => (
                <div key={trans.id}>
                    <TransactionCard transaction={trans} />
                </div>
            ))}

        </div>
    )
}

export default TransactionHistory
