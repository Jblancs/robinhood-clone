import React, { useEffect, useState } from 'react';

function TransferHistory({transfers}) {
    const [showDetail, setShowDetail] = useState(false)

    if(transfers.error) return

    // event handlers ----------------------------------------------------------------
    const onClickHandler = (e) => {
        e.preventDefault()
        setShowDetail(!showDetail)
    }

    // component JSX -----------------------------------------------------------------
    return (
        <>
            <div className={!showDetail ? 'transfer-card-container add-hover' : 'transfer-card-container show-detail'}>
                <div className={!showDetail ? 'transfer-card' : 'transfer-card'} onClick={onClickHandler}>
                    <div className='transfer-info-div'>
                        <div className='transfer-info-bank bold'>
                            (Deposit) to brokerage account from (Wells Fargo)
                        </div>
                        <div className='transfer-info-date'>
                            (Mar 9, 2021)
                        </div>
                    </div>
                    <div className='transfer-info-amount bold'>
                        +$500.00
                    </div>
                </div>
                <div className='transfer-detail-div'>
                    <div className='transfer-detail-left'>
                        <div className='transfer-detail-amount pad10'>
                            <div className='bold'>Amount</div>
                            <div>$500.00</div>
                        </div>
                        <div className='transfer-detail-init pad10'>
                            <div className='bold'>Initiated</div>
                            <div>Mar 9, 2021</div>
                        </div>
                    </div>
                    <div className='transfer-detail-mid'>
                        <div className='transfer-detail-from pad10'>
                            <div className='bold'>From</div>
                            <div>(Checking &#8226;&#8226;&#8226;&#8226;9999)</div>
                        </div>
                        <div className='transfer-detail-updated pad10'>
                            <div className='bold'>Last Updated</div>
                            <div>Mar 9, 2021</div>
                        </div>
                    </div>
                    <div className='transfer-detail-right'>
                        <div className='transfer-detail-to pad10'>
                            <div className='bold'>To</div>
                            <div>Brokerage account</div>
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

export default TransferHistory
