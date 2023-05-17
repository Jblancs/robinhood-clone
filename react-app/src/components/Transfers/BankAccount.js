import React from 'react';

function BankAccount({ bank }) {
    if (bank.error) return

    let bankList = Object.values(bank)

    let linkedAccount = (bank) => {
        return (
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
                    <button className='account-unlink-button bold'>
                        Unlink
                    </button>
                </div>
            </div>
        )
    }


    return (
        <>
            {bankList.map(bank => (
                <>
                    {bank.linked ? linkedAccount(bank) : <></>}
                    {/* <div key={bank.id} className='linked-account-card'>
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
                            <button className='account-unlink-button bold'>
                                Unlink
                            </button>
                        </div>
                    </div> */}
                </>
            ))}
        </>
    )
}

export default BankAccount
