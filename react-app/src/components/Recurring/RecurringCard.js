import React, { useState } from 'react';
import OpenModalButton from '../OpenModalButton';
import RecurringModal from '../RecurringModal';
import "./recurring.css"
import { getDaysDifference, getDisplayDate, getDisplayDateYear, getFutureDate, getOneYearLater } from '../../Utils';
import DeleteRecurringModal from '../RecurringModal/DeleteRecurring';
import PauseRecurringModal from '../RecurringModal/PauseRecurring';

function RecurringCard({ recurInv, portfolio }) {
    const [showDetail, setShowDetail] = useState(false)

    // Event Handlers ----------------------------------------------------------------------------------------
    const showDetailHandler = () => {
        setShowDetail(!showDetail)
    }

    // Display depending on if investment is paused ----------------------------------------------------------
    let firstOrderDisplay;
    if (!recurInv.paused) {
        firstOrderDisplay = (
            <div className='recur-detail-text-div'>
                <div className='recur-detail-icon-div'>
                    <i className='fa fa-calendar' />
                </div>
                <div className='recur-detail-text'>
                    <b>Your first order</b> is in <b>{getDaysDifference(recurInv.start_date)} days</b> on {getDisplayDate(recurInv.start_date)}
                </div>
            </div>
        )
    } else {
        firstOrderDisplay = (
            <div className='recur-detail-text-pause-div'>
                <div className='recur-detail-icon-pause-div bold'>
                    i
                </div>
                <div className='recur-detail-pause-text'>
                    Your recurring investment is currently paused.
                </div>
            </div>
        )
    }

    let upcomingOrderDisplay;
    if (!recurInv.paused) {
        upcomingOrderDisplay = (
            <div className='recur-up-visual-div'>
                <div className='recur-up-visual-left'>
                    <div className='recur-up-line-div'>
                        <i className='fas fa-dot-circle recur-left-dot' />
                        <img className='recur-line-img' src='/images/recurring-line-icon.png' alt='line' />
                    </div>
                    <div className='recur-up-visual-text bold'>
                        First order
                    </div>
                    <div className='recur-up-visual-info'>
                        {getDisplayDate(recurInv.start_date)} &#8226; 1 share(s)
                    </div>
                </div>
                <div className='recur-up-visual-right'>
                    <div className='recur-right-dot'>
                        <i className='fas fa-circle' />
                    </div>
                    <div className='recur-up-visual-text bold'>
                        Next order
                    </div>
                    <div className='recur-up-visual-info'>
                        {getDisplayDate(getFutureDate(recurInv.start_date, recurInv.frequency))} &#8226; {recurInv.shares} share(s)
                    </div>
                </div>
            </div>
        )
    }

    // Component JSX -----------------------------------------------------------------------------------------
    return (
        <div className={!showDetail ? 'recur-card-container' : 'recur-card-container show-recur-detail'}>
            <div className={!showDetail ? 'recur-card add-hover' : 'recur-card'} onClick={showDetailHandler}>
                <div className='recur-info-div'>
                    <div className='recur-info-stock bold'>
                        {recurInv.ticker} {recurInv.frequency} Buy
                    </div>
                    <div className='recur-info-account'>
                        Brokerage &#8226; {!recurInv.paused ? `Next on ${getDisplayDateYear(recurInv.start_date)}` : "Paused"}
                    </div>
                </div>
                <div className='recur-info-amount bold'>
                    {recurInv.shares} share(s)
                </div>
            </div>
            <div className='recur-detail-div'>
                <div className='recur-detail-info'>
                    {firstOrderDisplay}
                    <div className='recur-detail-text-div'>
                        <div className='recur-detail-icon-div'>
                            <i className='fas fa-sync-alt' />
                        </div>
                        <div className='recur-detail-text'>
                            You'll invest in <b>{recurInv.shares * 12} shares</b> by <b>{getDisplayDateYear(getOneYearLater(recurInv.start_date))}</b> if you keep this recurring investment.
                        </div>
                    </div>
                    <div className='recur-detail-text-div'>
                        <div className='recur-detail-icon-div'>
                            <i className='fas fa-percentage' />
                        </div>
                        <div className='recur-detail-text'>
                            <b>{recurInv.ticker}'s price change</b> will appear here after your first order takes place
                        </div>
                    </div>
                    <div className='recur-up-div'>
                        <div className='recur-up-header'>
                            Upcoming orders
                        </div>
                        <div className='recur-up-text'>
                            {recurInv.paused ? "Your upcoming orders will appear here if you unpause your recurring investment." : "Orders are typically processed between 11:00 PM AT and market close."}
                        </div>
                        {upcomingOrderDisplay}
                    </div>
                </div>
            </div>
            <div className='recur-up-bottom-text'>
                All investments involve risk and loss of principal is possible. Investors should consider their investment objectives and risks carefully before investing.
            </div>
            <div className='recur-button-div'>
                <OpenModalButton
                    buttonText='Edit investment'
                    modalClass='recur-edit-modal-button bold'
                    modalComponent={<RecurringModal updateObj={recurInv} portfolio={portfolio} />}
                />
                <div>
                    <OpenModalButton
                        buttonText={recurInv.paused ? 'Resume investment' : 'Pause investment'}
                        modalClass='recur-other-modal-button bold'
                        modalComponent={<PauseRecurringModal recurInv={recurInv} paused={recurInv.paused} />}
                    />
                    <OpenModalButton
                        buttonText='End investment'
                        modalClass='recur-other-modal-button bold'
                        modalComponent={<DeleteRecurringModal recurId={recurInv.id} />}
                    />
                </div>
            </div>
        </div>
    )
}

export default RecurringCard
