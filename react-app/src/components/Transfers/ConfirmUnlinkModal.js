import React from 'react';
import { useModal } from "../../context/Modal";
import { useDispatch } from 'react-redux';
import { updateBankAccount } from '../../store/bankAccount';

function ConfirmUnlinkModal({bank}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    // event handlers ------------------------------------------------------------------------------------
    const unlinkHandler = async (e, id) => {
        e.preventDefault()
        await dispatch(updateBankAccount(id))
        closeModal()
        }

    // Component JSX -------------------------------------------------------------------------------------
    return (
        <div className='unlink-modal-container'>
            <div className='unlink-modal-div'>
                <h3 className="unlink-modal-header">
                    <div className="unlink-modal-header-text">
                        Unlink Bank Account
                    </div>
                    <i className="fas fa-times" onClick={() => closeModal()} />
                </h3>
                <div className='unlink-modal-text'>
                    Are you sure that you want to unlink your {bank.account_type} account ending in {bank.account_number}?
                </div>
                <button className='link-account-button unlink-button bold' onClick={(e) => unlinkHandler(e, bank.id)}>
                    Unlink
                </button>
                <button className='link-account-button cancel-unlink bold' onClick={() => closeModal()}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ConfirmUnlinkModal
