import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useAccountNavSelect } from '../../context/AccountNav';
import "./transfers.css"
import TransferHistory from './TransferHistory';
import { clearBankAccountState, fetchBankAccounts } from '../../store/bankAccount';
import { useHistory } from 'react-router-dom';
import BankAccount from './BankAccount';
import { clearTransferState, fetchTransfers } from '../../store/transfer';

function Transfers() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { setSelectedNav } = useAccountNavSelect()

    const bank = useSelector(state => state.bank.bank)
    const transfer = useSelector(state => state.transfers.transfers)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        setSelectedNav('transfers')
    }, [])

    useEffect(() => {
        dispatch(fetchBankAccounts())
        dispatch(fetchTransfers())
        return () => {
            dispatch(clearBankAccountState())
            dispatch(clearTransferState())
        }
    }, [dispatch])

    if(!user){
        history.push("/login")
    }

    if (!bank || !user || !transfer) return <div>Loading...</div>


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
                    <BankAccount bank={bank}/>
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
                    <TransferHistory transfers={transfer}/>
                </div>
            </div>
        </div>
    )
}

export default Transfers
