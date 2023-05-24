import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useAccountNavSelect } from '../../context/AccountNav';
import "./transfers.css"
import TransferHistory from './TransferHistory';
import { clearBankAccountState, fetchBankAccounts } from '../../store/bankAccount';
import { useHistory } from 'react-router-dom';
import BankAccount from './BankAccount';
import { clearTransferState, fetchTransfers } from '../../store/transfer';
import OpenModalButton from "../OpenModalButton";
import BankAccountForm from '../BankAccountModal/BankAccountForm';
import TransferForm from './TransferForm';
import { clearPortfolioState, fetchPortfolio } from '../../store/portfolio';

function Transfers() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { setSelectedNav } = useAccountNavSelect()

    const bank = useSelector(state => state.bank.bank)
    const transfer = useSelector(state => state.transfers.transfers)
    const user = useSelector(state => state.session.user)
    const portfolio = useSelector(state => state.portfolio.portfolio)

    useEffect(() => {
        setSelectedNav('transfers')
    }, [])

    useEffect(() => {
        dispatch(fetchBankAccounts())
        dispatch(fetchTransfers())
        dispatch(fetchPortfolio())
        return () => {
            dispatch(clearBankAccountState())
            dispatch(clearTransferState())
            dispatch(clearPortfolioState)
        }
    }, [dispatch])

    if (!user) {
        history.push("/login")
    }

    if (!bank || !user || !transfer || !portfolio) return <div className='loading-div'><img src='/images/loading.gif' alt='loading'/></div>

    // Passed as prop to transfer modal button ---------------------------------------------------
    let transferButton = (
        <>
            <div className='transfer-icon-div'>
                <i className='fas fa-exchange-alt' />
            </div>
            <div className='transfer-button-text bold'>
                Transfer money
            </div>
        </>
    )

    // Component JSX ----------------------------------------------------------------------------
    return (
        <div className='transfer-page-container'>
            <div className='transfer-page-div'>
                <div className='transfer-header-div'>
                    <div className='transfer-header-text'>
                        Start a transfer
                    </div>
                    <div className='transfer-button-div'>
                        <OpenModalButton
                            buttonText={transferButton}
                            modalClass="transfer-button-money"
                            modalComponent={<TransferForm bank={bank} portfolio={portfolio}/>}
                        />
                    </div>
                </div>
                <div className='linked-account-div'>
                    <div className='linked-account-header'>
                        Linked Accounts
                    </div>
                    <BankAccount bank={bank} />
                    <div className='add-account-div'>
                        <div className='add-account-modal-div'>
                            <OpenModalButton
                                buttonText="Add New Account"
                                modalClass="add-account-button bold"
                                modalComponent={<BankAccountForm bank={bank} />}
                            />
                        </div>
                    </div>
                </div>
                <div className='complete-transfer-div'>
                    <div className='complete-transfer-header'>
                        Completed Transfers
                    </div>
                    <TransferHistory transfers={transfer} />
                </div>
            </div>
        </div>
    )
}

export default Transfers
