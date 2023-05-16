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
                <div className='linked-account-div'>
                    <div className='linked-account-header'>
                        Linked Accounts
                    </div>
                    <div className='linked-account-card'>
                        <div className='linked-account-info-div'>
                            <i className="fas fa-university linked-account-icon" />
                            <div className='account-info-div'>
                                <div className='account-info-bank bold'>
                                    Wells Fargo (placeholder)
                                </div>
                                <div className='account-info-div'>
                                    Checking &#8226;&#8226;&#8226;&#8226;9999 (placeholder)
                                </div>
                            </div>
                        </div>
                        <div className='account-info-linked-div'>
                            <div className='account-info-verified bold'>
                                Verified
                            </div>
                            <button className='account-unlink-button bold'>
                                Unlink
                            </button>
                        </div>
                    </div>
                    <div className='add-account-div'>
                        <div className='add-account-button bold'>
                            Add New Account
                        </div>
                    </div>
                </div>
                <div className='complete-transfer-div'>
                    <div className='complete-transfer-header'>
                        Completed Transfers
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transfers
