import React, { useState } from 'react';
import BankAccountForm from '../BankAccountModal/BankAccountForm';
import "./transfers.css"

function TransferForm({ bank }) {
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    if (bank.error) {
        return (
            <BankAccountForm />
        )
    }

    return (
        <div className='transfer-modal-container'>
            <div className='transfer-modal-div'>
                <h2>
                    Transfer Money
                </h2>
                <form>
                    <div className='transfer-field-div'>
                        <div className='transfer-field-text'>
                            Amount
                        </div>
                        <input
                            className='transfer-field'
                            type='text'
                            value={amount}
                            required
                        />
                    </div>
                    <div className='transfer-field-div'>
                        <div className='transfer-field-text'>
                            From
                        </div>
                        <select>

                        </select>
                    </div>
                    <div className='transfer-field-div'>
                        <div className='transfer-field-text'>
                            To
                        </div>
                        <select>

                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TransferForm
