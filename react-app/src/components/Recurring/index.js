import React, { useEffect, useState } from 'react';
import { useAccountNavSelect } from '../../context/AccountNav';
import OpenModalButton from '../OpenModalButton';
import RecurringModal from '../RecurringModal';
import "./recurring.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from '../../store/portfolio';

function Recurring() {
    const dispatch = useDispatch()
    const [showDetail, setShowDetail] = useState(false)
    const { setSelectedNav } = useAccountNavSelect()
    const portfolio = useSelector(state => state.portfolio.portfolio)

    useEffect(() => {
        setSelectedNav('recurring')
    }, [])

    useEffect(() => {
        dispatch(fetchPortfolio())
    }, [dispatch])

    if(!portfolio) return <div className='loading-div'><img src='/images/loading.gif' alt='loading'/></div>

    // Event Handlers ----------------------------------------------------------------------------------------
    const showDetailHandler = () => {
        setShowDetail(!showDetail)
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
                    <div className='no-recur-div'>
                        <img className='no-recur-img' src='/images/recurring-icon.png' alt='recurring icon' />
                        <div className='no-recur-text'>
                            Create a recurring investment in a stock and it'll appear here!
                        </div>
                        <OpenModalButton
                            buttonText='Create recurring investment'
                            modalClass='recur-modal-button bold'
                            modalComponent={<RecurringModal portfolio={portfolio}/>}
                        />
                    </div>
                    <div className={!showDetail ? 'recur-card-container' : 'recur-card-container show-recur-detail'}>
                        <div className={!showDetail ? 'recur-card add-hover' : 'recur-card'} onClick={showDetailHandler}>
                            <div className='recur-info-div'>
                                <div className='recur-info-stock bold'>
                                    (AAPL Monthly Buy)
                                </div>
                                <div className='recur-info-account'>
                                    (Brokerage) &#8226; Next on (Apr 17, 2023)
                                </div>
                            </div>
                            <div className='recur-info-amount bold'>
                                1 share(s)
                            </div>
                        </div>
                        <div className='recur-detail-div'>
                            <div className='recur-detail-info'>
                                <div className='recur-detail-text-div'>
                                    <div className='recur-detail-icon-div'>
                                        <i className='fa fa-calendar' />
                                    </div>
                                    <div className='recur-detail-text'>
                                        <b>Your first order</b> is in <b>x days</b> on (Apr 17, 2023)
                                    </div>
                                </div>
                                <div className='recur-detail-text-div'>
                                    <div className='recur-detail-icon-div'>
                                        <i className='fas fa-sync-alt' />
                                    </div>
                                    <div className='recur-detail-text'>
                                        You'll invest in <b>12 shares</b> by <b>Apr 17,2024</b> if you keep this recurring investment.
                                    </div>
                                </div>
                                <div className='recur-detail-text-div'>
                                    <div className='recur-detail-icon-div'>
                                        <i className='fas fa-percentage' />
                                    </div>
                                    <div className='recur-detail-text'>
                                        <b>AAPL's price change</b> will appear here after your first order takes place
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
                </div>
            </div>
        </div>
    )
}

export default Recurring
