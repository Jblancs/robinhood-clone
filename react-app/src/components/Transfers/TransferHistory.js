import React, { useState } from 'react';
import { getDisplayDateYear } from '../../Utils';


function TransferHistory({ transfers }) {
    const [showDetail, setShowDetail] = useState(false)

    if (transfers.error) return <></>

    let transfersList = Object.values(transfers)

    // event handlers ----------------------------------------------------------------
    const onClickHandler = (e) => {
        e.preventDefault()
        setShowDetail(!showDetail)
    }

    // component JSX -----------------------------------------------------------------
    return (
        <>
            {transfersList.map(transfer => (
                <div key={transfer.id} className={!showDetail ? 'transfer-card-container add-hover' : 'transfer-card-container show-detail'}>
                    <div className={!showDetail ? 'transfer-card' : 'transfer-card'} onClick={onClickHandler}>
                        <div className='transfer-info-div'>
                            <div className='transfer-info-bank bold'>
                                {transfer.type} to brokerage account from {transfer.bank_info.bank}
                            </div>
                            <div className='transfer-info-date'>
                                {getDisplayDateYear(transfer.date)}
                            </div>
                        </div>
                        <div className='transfer-info-amount bold'>
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
            ))}

        </>
    )
}

export default TransferHistory
