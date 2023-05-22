import React, { useState } from 'react';
import BankAccountForm from '../BankAccountModal/BankAccountForm';
import "./TransferForm.css"

function TransferForm({ bank, user }) {
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [type, setType] = useState("Deposit")

    // Show bank account form if no bank accounts
    if (bank.error) {
        return (
            <BankAccountForm />
        )
    }

    let bankAccountList = Object.values(bank)

    // Event Handlers ------------------------------------------------------------------------------------
    const typeFromOnChange = (e) => {
        setFrom(e.target.value)
        if(e.target.selectedIndex === 0){
            setType("Withdrawal")
        }else{
            setType("Deposit")
        }
    }

    const toOnChange = (e) => {
        setTo(e.target.value)
    }

    const inputOnChange = (e) => {
        setAmount(e.target.value)
    }

    // Submit Handler ------------------------------------------------------------------------------------
    const onSubmitHandler = (e) => {
        e.preventDefault()
    }

    // Change to options based on transfer type ----------------------------------------------------------
    let toOptions;
    if (type === "Deposit") {
        toOptions = (
            <option value="brokerage">
                Brokerage ${Number(user.portfolio.buying_power).toFixed(2)}
            </option>
        )
    } else {
        toOptions = (
            <>
                {bankAccountList.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                        {bank.bank} &#8226; {bank.account_type} {bank.account_number}
                    </option>
                ))}
            </>
        )
    }

    // Component JSX --------------------------------------------------------------------------------------
    return (
        <div className='transfer-modal-container'>
            <div className='transfer-modal-div'>
                <h2>
                    Transfer Money
                </h2>
                <form onSubmit={onSubmitHandler}>
                    <div className='transfer-field-div'>
                        <div className='transfer-field-text'>
                            Amount
                        </div>
                        <input
                            className='transfer-field'
                            type='text'
                            value={amount}
                            onChange={inputOnChange}
                            required
                        />
                    </div>
                    <div className='transfer-field-div'>
                        <div className='transfer-field-text'>
                            From
                        </div>
                        <select onChange={typeFromOnChange} defaultValue={bankAccountList[0].id}>
                            {bankAccountList.map((bank) => (
                                <option key={bank.id} value={bank.id}>
                                    {bank.bank} &#8226; {bank.account_type} {bank.account_number}
                                </option>
                            ))}
                            <option value={user.portfolio.id}>
                                Brokerage ${Number(user.portfolio.buying_power).toFixed(2)}
                            </option>
                        </select>
                    </div>
                    <div className='transfer-field-div'>
                        <div className='transfer-field-text'>
                            To
                        </div>
                        <select defaultValue={type === "Deposit" ? user.portfolio.id : bankAccountList[0].id} onChange={toOnChange}>
                                {toOptions}
                        </select>
                    </div>
                    {type === "Deposit" ? <div>Deposit limit: $50,000</div> : ""}
                    <button>
                        Review Transfer
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TransferForm
