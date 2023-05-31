import React, { useState } from 'react';
import OpenModalButton from '../OpenModalButton';
import RecurringModal from '../RecurringModal';
import "./recurring.css"
import { getDaysDifference, getOneYearLater } from '../../Utils';

function RecurringCard({recurInv}) {
    const [showDetail, setShowDetail] = useState(false)

    // Event Handlers ----------------------------------------------------------------------------------------
    const showDetailHandler = () => {
        setShowDetail(!showDetail)
    }

    // Component JSX -----------------------------------------------------------------------------------------
    return (
        <div className={!showDetail ? 'recur-card-container' : 'recur-card-container show-recur-detail'}>
            <div className={!showDetail ? 'recur-card add-hover' : 'recur-card'} onClick={showDetailHandler}>
                <div className='recur-info-div'>
                    <div className='recur-info-stock bold'>
                        {recurInv.ticker} {recurInv.frequency} Buy
                        Test
                    </div>
                    <div className='recur-info-account'>
                        Brokerage &#8226; Next on {recurInv.start_date}
                    </div>
                </div>
                <div className='recur-info-amount bold'>
                    {recurInv.shares} share(s)
                </div>
            </div>
            <div className='recur-detail-div'>
                <div className='recur-detail-info'>
                    <div className='recur-detail-text-div'>
                        <div className='recur-detail-icon-div'>
                            <i className='fa fa-calendar' />
                        </div>
                        <div className='recur-detail-text'>
                            <b>Your first order</b> is in <b>{getDaysDifference(recurInv.start_date)} days</b> on {recurInv.start_date}
                        </div>
                    </div>
                    <div className='recur-detail-text-div'>
                        <div className='recur-detail-icon-div'>
                            <i className='fas fa-sync-alt' />
                        </div>
                        <div className='recur-detail-text'>
                            You'll invest in <b>{recurInv.shares * 12} shares</b> by <b>{getOneYearLater(recurInv.start_date)}</b> if you keep this recurring investment.
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
                            Orders are typically processed between 11:00 PM AT and market close.
                        </div>
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
                                    Apr 17 &#8226; 1 share(s)
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
                                    May 17 &#8226; 1 share(s)
                                </div>
                            </div>
                        </div>
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
                    modalComponent={<RecurringModal />}
                />
                <div>
                    <OpenModalButton
                        buttonText='Pause investment'
                        modalClass='recur-other-modal-button bold'
                        modalComponent={<RecurringModal />}
                    />
                    <OpenModalButton
                        buttonText='End investment'
                        modalClass='recur-other-modal-button bold'
                        modalComponent={<RecurringModal />}
                    />
                </div>
            </div>
        </div>
    )
}

export default RecurringCard
