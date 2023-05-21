import React from 'react';
import { useDispatch } from 'react-redux';
import { updateBankAccount } from '../../store/bankAccount';

function BankAccount({ bank }) {
    const dispatch = useDispatch()

    if (bank.error) return

    let bankList = Object.values(bank)

    // event handlers ------------------------------------------------------------------------------------
    const unlinkHandler = async (e, id) => {
        e.preventDefault()
        await dispatch(updateBankAccount(id))
    }

    // component JSX ------------------------------------------------------------------------------------
    return (
        <>
            {bankList.map(bank => (
                <div key={bank.id} className='linked-account-card'>
                    <div className='linked-account-info-div'>
                        <i className="fas fa-university linked-account-icon" />
                        <div className='account-info-div'>
                            <div className='account-info-bank bold'>
                                {bank.bank}
                            </div>
                            <div className='account-info-div'>
                                {bank.account_type} &#8226;&#8226;&#8226;&#8226;{bank.account_number}
                            </div>
                        </div>
                    </div>
                    <div className='account-info-linked-div'>
                        <div className='account-info-verified bold'>
                            Verified
                        </div>
                        <button className='account-unlink-button bold' onClick={(e) => unlinkHandler(e, bank.id)}>
                            Unlink
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default BankAccount
