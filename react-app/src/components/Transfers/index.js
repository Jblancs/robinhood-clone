import React, { useEffect, useState } from 'react';
import { useAccountNavSelect } from '../../context/AccountNav';
import "./transfers.css"

function Transfers() {
    const { setSelectedNav } = useAccountNavSelect()

    useEffect(() => {
        setSelectedNav('transfers')
    }, [])

    return (
        <div className='transfer-page-container'>
            <div className='transfer-page-div'>
                <div className='transfer-header-div'>
                    <div className='transfer-header-text'>
                        Start a transfer
                    </div>
                    <div className='transfer-button-div'>
                        <button className='transfer-button-money'>
                            <div className='transfer-icon-div'>
                                <i className='fas fa-exchange-alt' />
                            </div>
                            <div className='transfer-button-text bold'>
                                Transfer money
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transfers
