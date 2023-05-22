import React from 'react';
import TransferHistoryCard from './TransferHistoryCard';


function TransferHistory({ transfers }) {
    if (transfers.error) return <></>

    let transfersList = Object.values(transfers)

    let transferListSorted = transfersList.sort((a, b) => b.id - a.id)

    // component JSX -----------------------------------------------------------------
    return (
        <>
            {transferListSorted.map(transfer => (
                <div key={transfer.id}>
                    <TransferHistoryCard transfer={transfer} />
                </div>
            ))}

        </>
    )
}

export default TransferHistory
