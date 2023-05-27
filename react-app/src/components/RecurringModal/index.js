import React, { useState } from 'react';

function RecurringModal() {
    const [showStockSearch, setShowStockSearch] = useState(true)
    const [stockPick, setStockPick] = useState("")

    // Form Display ---------------------------------------------------------------------------------------
    let formDisplay;

    // Component JSX --------------------------------------------------------------------------------------
    return (
        <div className='recur-modal-container'>
            <div className='recur-modal-div'>

                Recurring Modal
            </div>
        </div>
    )
}

export default RecurringModal
