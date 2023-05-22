import React from "react";
import { getDisplayDate, firstLetterUpper } from "../../Utils";

function TransactionHistory({ transactions, stockTicker }) {
    if (!transactions) return <div></div>

    let transactionsList = Object.values(transactions)
    let sortedTransactions = transactionsList.sort((a, b) => b.id - a.id)

    return (
        <div className="trans-hist-container">
            {sortedTransactions.map(trans => (
                <div key={trans.id} className="trans-hist-card">
                    <div>
                        <div className="trans-hist-info bold">
                            {stockTicker} {firstLetterUpper(trans.type)}
                        </div>
                        <div className="trans-hist-info">
                            {getDisplayDate(trans.date)}
                        </div>
                    </div>
                    <div className="trans-price-info">
                        <div className="trans-hist-info bold">
                            ${Number(trans.total_cost).toFixed(2)}
                        </div>
                        <div className="trans-hist-info">
                            {trans.shares} share(s) at ${Number(trans.price_per_share).toFixed(2)}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default TransactionHistory
