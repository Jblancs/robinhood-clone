import React from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RecurringModal.css"
import "./PauseRecurring.css"
import { pauseRecurringInv } from '../../store/recurring';

function PauseRecurringModal({recurInv, paused}){
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const onClickUpdate = async () => {
        await dispatch(pauseRecurringInv(recurInv.id, {type: paused ? "resume" : "pause"}))
        closeModal()
    }

    return(
        <div className='recur-modal-container'>
        <div className='recur-modal-div'>
            <i className="fas fa-times recur-close-icon" onClick={() => closeModal()} />
            <div className='recur-modal-header'>
                {paused ? "Resume" : "Pause"} {recurInv.ticker} investment?
            </div>
            <div className='pause-recur-text-div'>
                {paused ? "This investment will resume today." : "This investment will be paused starting today. You can resume it anytime in your recurring investment overview."}
            </div>
            <div className='pause-recur-button-div'>
                <button className='pause-recur-button bold' onClick={onClickUpdate}>
                    {paused ? "Resume investment" : "Pause investment"}
                </button>
                <button className='pause-recur-button bold pause-recur-cancel' onClick={() => closeModal()}>
                    Keep investment
                </button>
            </div>
        </div>
    </div>
    )
}

export default PauseRecurringModal
