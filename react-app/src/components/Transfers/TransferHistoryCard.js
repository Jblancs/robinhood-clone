import React, { useState } from 'react';
import { getDisplayDateYear } from '../../Utils';
import './transfers.css'

function TransferHistoryCard({ transfer }) {
    const [showDetail, setShowDetail] = useState(false)

    // event handlers ----------------------------------------------------------------
    const onClickHandler = (e) => {
        e.preventDefault()
        setShowDetail(!showDetail)
    }

    // component JSX -----------------------------------------------------------------
    return (
        <>
            <div key={transfer.id} className={!showDetail ? 'transfer-card-container' : 'transfer-card-container show-detail'}>
                <div className={!showDetail ? 'transfer-card add-hover' : 'transfer-card'} onClick={onClickHandler}>
                    <div className='transfer-info-div'>
                        <div className='transfer-info-bank bold'>
                            {transfer.type} to brokerage account from {transfer.bank_info.bank}
                        </div>
                        <div className='transfer-info-date'>
                            {getDisplayDateYear(transfer.date)}
                        </div>
                    </div>
                    <div className={transfer.type === 'Deposit' ? 'transfer-info-amount bold green-text' : 'transfer-info-amount bold red-text'}>
                        {transfer.type === 'Deposit' ? `+$` : `-$`}{Number(transfer.amount).toFixed(2)}
                    </div>
                </div>
                <div className='transfer-detail-div'>
                    <div className='transfer-detail-left'>
                        <div className='transfer-detail-amount pad10'>
                            <div className='bold'>Amount</div>
                            <div>${Number(transfer.amount).toFixed(2)}</div>
                        </div>
                        <div className='transfer-detail-init pad10'>
                            <div className='bold'>Initiated</div>
                            <div>{getDisplayDateYear(transfer.date)}</div>
                        </div>
                    </div>
                    <div className='transfer-detail-mid'>
                        <div className='transfer-detail-from pad10'>
                            <div className='bold'>From</div>
                            {transfer.type === "Deposit" ? <div>{transfer.bank_info.account_type} &#8226;&#8226;&#8226;&#8226;{transfer.bank_info.account_number}</div> : <div>Brokerage Account</div>}
                        </div>
                        <div className='transfer-detail-updated pad10'>
                            <div className='bold'>Last Updated</div>
                            <div>{getDisplayDateYear(transfer.date)}</div>
                        </div>
                    </div>
                    <div className='transfer-detail-right'>
                        <div className='transfer-detail-to pad10'>
                            <div className='bold'>To</div>
                            <div>{transfer.type === "Deposit" ? "Brokerage Account" : `${transfer.bank_info.account_type} Account`}</div>
                        </div>
                        <div className='transfer-detail-status pad10'>
                            <div className='bold'>Status</div>
                            <div>Completed</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransferHistoryCard
