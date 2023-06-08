import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useAccountNavSelect } from '../../context/AccountNav';
import { useHistory } from 'react-router-dom';
import { clearTransferState, fetchTransfers } from '../../store/transfer';
import { clearTransactionState, fetchAllTransactions } from '../../store/transaction';
import "./History.css"
import TransactionCard from '../Transactions/TransactionCard';
import TransferHistoryCard from '../Transfers/TransferHistoryCard';

function History() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { setSelectedNav } = useAccountNavSelect()

    const user = useSelector(state => state.session.user)
    const transfers = useSelector(state => state.transfers.transfers)
    const transactions = useSelector(state => state.transactions.transactions)

    useEffect(() => {
        setSelectedNav('history')
    }, [])

    useEffect(() => {
        dispatch(fetchTransfers())
        dispatch(fetchAllTransactions())
        return () => {
            dispatch(clearTransferState())
            dispatch(clearTransactionState())
        }
    }, [dispatch])

    if (!user) {
        history.push("/login")
    }

    if (!transfers || !transactions) return <div className='loading-div'><img src='/images/loading.gif' alt='loading' /></div>

    // Order list of transactions and transfers ---------------------------------------------------------
    let transfersList = [];
    let transactionsList = [];

    if (!transfers.error) {
        transfersList = Object.values(transfers)
    }
    if (!transactions.error) {
        transactionsList = Object.values(transactions)
    }

    let combinedList = [...transfersList, ...transactionsList]
    let combinedListSorted = combinedList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

    // Transactions and transfers display function ------------------------------------------------------
    let chooseDisplay = (obj) => {
        if(obj.type === "buy" || obj.type === "sell"){
            return <TransactionCard transaction={obj} />

        }else if(obj.type === "Deposit" || obj.type === "Withdrawal"){
            return <TransferHistoryCard transfer={obj} />
        }
    };

    // component JSX ------------------------------------------------------------------------------------
    return (
        <div className='hist-page-container'>
            <div className='hist-page-div'>
                <div className='hist-header-text'>
                    Older
                </div>
                {combinedListSorted.map(obj => (
                    <div key={JSON.stringify(obj)} className='hist-card-div'>
                        {chooseDisplay(obj)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default History
