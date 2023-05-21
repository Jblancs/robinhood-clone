import React from 'react';
import ConfirmUnlinkModal from './ConfirmUnlinkModal';
import OpenModalButton from '../OpenModalButton';


function BankAccount({ bank }) {
    if (bank.error) return

    let bankList = Object.values(bank)

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
                        {/* <button className='account-unlink-button bold' onClick={(e) => unlinkHandler(e, bank.id)}>
                            Unlink
                        </button> */}
                        <OpenModalButton
                            buttonText="Unlink"
                            modalClass="account-unlink-button bold"
                            modalComponent={<ConfirmUnlinkModal bank={bank} />}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}

export default BankAccount
