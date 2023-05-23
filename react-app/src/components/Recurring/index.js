import React, { useEffect } from 'react';
import { useAccountNavSelect } from '../../context/AccountNav';
import OpenModalButton from '../OpenModalButton';
import RecurringModal from '../RecurringModal';
import "./recurring.css"

function Recurring() {
    const { setSelectedNav } = useAccountNavSelect()

    useEffect(() => {
        setSelectedNav('recurring')
    }, [])

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
                            buttonText="Create recurring investment"
                            modalClass="recur-modal-button bold"
                            modalComponent={<RecurringModal />}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Recurring
