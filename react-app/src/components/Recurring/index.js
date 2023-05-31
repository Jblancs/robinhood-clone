import React, { useEffect, useState } from 'react';
import { useAccountNavSelect } from '../../context/AccountNav';
import OpenModalButton from '../OpenModalButton';
import RecurringModal from '../RecurringModal';
import "./recurring.css"
import { useDispatch, useSelector } from 'react-redux';
import { clearPortfolioState, fetchPortfolio } from '../../store/portfolio';
import { clearRecurringState, fetchRecurringInv } from '../../store/recurring';
import RecurringCard from './RecurringCard';

function Recurring() {
    const dispatch = useDispatch()
    const { setSelectedNav } = useAccountNavSelect()
    const portfolio = useSelector(state => state.portfolio.portfolio)
    const recurring = useSelector(state => state.recurring.recurring)

    useEffect(() => {
        setSelectedNav('recurring')
    }, [])

    useEffect(() => {
        dispatch(fetchPortfolio())
        dispatch(fetchRecurringInv())
        return () => {
            dispatch(clearPortfolioState())
            dispatch(clearRecurringState())
        }
    }, [dispatch])

    if (!portfolio || !recurring) return <div className='loading-div'><img src='/images/loading.gif' alt='loading' /></div>

    // If any, display recurring investment cards -----------------------------------------------------------
    let recurringList = [];
    let recurringCards;

    if (!recurring && !recurring.error) {
        recurringList = Object.values(recurring)
        recurringCards = (
            <>
                {recurringList.map(recurInv => (
                    <div key={recurInv.id}>
                        <RecurringCard recurInv={recurInv} />
                    </div>
                ))}
            </>
        )
    }

    // Event Handlers ----------------------------------------------------------------------------------------

    // Create button if no recurring inv ---------------------------------------------------------------------
    let noRecurCreateButton;
    if (recurring.error) {
        noRecurCreateButton = (
            <div className='no-recur-div'>
                <img className='no-recur-img' src='/images/recurring-icon.png' alt='recurring icon' />
                <div className='no-recur-text'>
                    Create a recurring investment in a stock and it'll appear here!
                </div>
                <OpenModalButton
                    buttonText='Create recurring investment'
                    modalClass='recur-modal-button bold'
                    modalComponent={<RecurringModal portfolio={portfolio} />}
                />
            </div>
        )
    }

    // Create button if there are recurring inv -------------------------------------------------------------
    let recurCreateButton;
    if (!recurring.error) {
        recurCreateButton = (
            <div>
                <OpenModalButton
                    buttonText='Create recurring investment'
                    modalClass='recur-modal-button bold'
                    modalComponent={<RecurringModal portfolio={portfolio} />}
                />
            </div>
        )
    }

    // Component JSX -----------------------------------------------------------------------------------------
    return (
        <div className='recur-page-container'>
            <div className='recur-page-div'>
                <div className='recur-header-div'>
                    <div className='recur-header-text'>
                        Recurring Investments
                    </div>
                </div>
                <div className='recur-body-div'>
                    {noRecurCreateButton}
                    {recurringCards}
                    {recurCreateButton}
                </div>
            </div>
        </div>
    )
}

export default Recurring
