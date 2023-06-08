import React, { useState } from 'react';
import { getDisplayDate, firstLetterUpper, getDisplayDateYear, addCommas } from "../../Utils";
import "./Transactions.css"

function TransactionCard({ transaction }) {
    const [showDetail, setShowDetail] = useState(false)

    // event handlers ----------------------------------------------------------------
    const onClickHandler = (e) => {
        e.preventDefault()
        setShowDetail(!showDetail)
    }

    // component JSX -----------------------------------------------------------------
    return (
        <div className={!showDetail ? "trans-card-container" : "trans-card-container show-trans-detail"}>
            <div className={!showDetail ? "trans-hist-card add-hover" : 'trans-hist-card'} onClick={onClickHandler}>
                <div>
                    <div className="trans-hist-info bold">
                        {transaction.ticker} {firstLetterUpper(transaction.type)}
                    </div>
                    <div className="trans-hist-info">
                        {getDisplayDate(transaction.date)}
                    </div>
                </div>
                <div className="trans-price-info">
                    <div className="trans-hist-info bold">
                        ${Number(transaction.total_cost).toFixed(2)}
                    </div>
                    <div className="trans-hist-info">
                        {transaction.shares} share(s) at ${Number(transaction.price_per_share).toFixed(2)}
                    </div>
                </div>
            </div>
            <div className='trans-detail-div'>
                <div className='trans-detail-left'>
                    <div className='trans-detail-info-div pad10'>
                        <div className='bold'>Symbol</div>
                        <div className='bold positive'>{transaction.ticker}</div>
                    </div>
                    <div className='trans-detail-info-div pad10'>
                        <div className='bold'>Submitted</div>
                        <div >{getDisplayDateYear(transaction.date)}</div>
                    </div>
                    <div className='trans-detail-info-div pad10'>
                        <div className='bold'>Filled</div>
                        <div >{getDisplayDateYear(transaction.date)}</div>
                    </div>
                </div>
                <div className='trans-detail-mid'>
                    <div className='trans-detail-info-div pad10'>
                        <div className='bold'>Type</div>
                        <div>{firstLetterUpper(transaction.type)}</div>
                    </div>
                    <div className='trans-detail-info-div pad10'>
                        <div className='bold'>Status</div>
                        <div>Filled</div>
                    </div>
                    <div className='trans-detail-info-div pad10'>
                        <div className='bold'>Filled Quantity</div>
                        <div>{transaction.shares} share(s) at ${Number(transaction.total_cost/transaction.shares).toFixed(2)}</div>
                    </div>
                </div>
                <div className='trans-detail-right'>
                    <div className='trans-detail-info-div pad10'>
                        <div className='bold'>Time in Force</div>
                        <div>Good for day</div>
                    </div>
                    <div className='trans-detail-info-div pad10'>
                        <div className='bold'>Entered Quantity</div>
                        <div >{transaction.shares}</div>
                    </div>
                    <div className='trans-detail-info-div pad10'>
                        <div className='bold'>Filled Notional</div>
                        <div >${addCommas(transaction.total_cost)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard
