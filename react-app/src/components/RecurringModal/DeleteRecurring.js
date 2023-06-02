import React from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RecurringModal.css"
import "./DeleteRecurring.css"
import { deleteRecurringInv } from '../../store/recurring';

function DeleteRecurringModal({recurId}){
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const onClickDelete = async () => {
        await dispatch(deleteRecurringInv(recurId))
        closeModal()
    }

    return(
        <div className='recur-modal-container'>
        <div className='recur-modal-div'>
            <i className="fas fa-times recur-close-icon" onClick={() => closeModal()} />
            <div className='recur-modal-header'>
                End your AAPL investment?
            </div>
            <div className='delete-recur-text-div'>
            This means your AAPL investment will no longer be scheduled.
            </div>
            <div className='delete-recur-button-div'>
                <button className='delete-recur-button bold' onClick={onClickDelete}>
                    End recurring investment
                </button>
                <button className='delete-recur-button bold delete-recur-cancel' onClick={() => closeModal()}>
                    Keep investment
                </button>
            </div>
        </div>
    </div>
    )
}

export default DeleteRecurringModal
