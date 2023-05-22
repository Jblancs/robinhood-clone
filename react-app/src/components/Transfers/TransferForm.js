import React, { useEffect, useState } from 'react';
import BankAccountForm from '../BankAccountModal/BankAccountForm';
import "./TransferForm.css"
import { addCommas } from '../../Utils';

function TransferForm({ bank, user }) {
    const [amount, setAmount] = useState()
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [type, setType] = useState("Deposit")
    const [confirm, setConfirm] = useState(false)
    const [errors, setErrors] = useState([])
    const [disableField, setDisableField] = useState(false)

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
        if (e.target.selectedIndex === 0) {
            setType("Withdrawal")
        } else {
            setType("Deposit")
        }
    }

    const toOnChange = (e) => {
        setTo(e.target.value)
    }

    const inputOnChange = (e) => {
        setAmount(e.target.value)
    }

    const onClickCancelHandler = () => {
        setDisableField(false)
        setErrors({})
    }

    const onClickEditHandler = () => {
        setConfirm(false)
        setDisableField(false)
    }

    const reviewHandler = () => {

        let errorObj = []

        if (amount > 50000) {
            errorObj.push("Transfers may not exceed $50,000.00.")
        }

        if (amount <= 0 || !amount){
            errorObj.push("Invalid transfer amount $0.00 provided.")
        }

        if (type === "Withdrawal" && amount > user.portfolio.buying_power){
            errorObj.push("Withdrawal amount exceeds brokerage balance")
        }

        if (errorObj.length) {
            setErrors(errorObj)
        } else {
            setConfirm(true)
        }
        setDisableField(true)
    }

    // Submit Handler ------------------------------------------------------------------------------------
    const onSubmitHandler = (e) => {
        e.preventDefault()

        const transferData = {
            bank_account_id: (type === "Deposit" ? from : to),
            amount: amount,
            type: type
        }
    }

    // Transfer Review Button ----------------------------------------------------------------------------
    let confirmBtn;
    if (!confirm && !errors.length) {
        confirmBtn = (
            <div className='review-button-div'>
                <button className='review-button bold' onClick={reviewHandler}>
                    Review Transfer
                </button>
            </div>
        )
    }

    if (errors.length){ // show errors if any
        confirmBtn = (
            <div>
                <div>
                    <div className="error-message-div bold">
                        <span className="info-icon error-icon bold">!</span>
                        Error
                    </div>
                    <div className="error-message-div">
                        {errors.map(message => (
                            <div key={message} className="acct-error-message-div">&#8226; {message}</div>
                        ))}
                    </div>
                </div>
                <div className="review-button-div">
                    {<button className="review-button bold" type="button" onClick={onClickCancelHandler}>Cancel</button>}
                </div>
            </div>
        )
    }

    if (confirm) { // confirm if there are no errors
        confirmBtn = (
            <div>
                <div>
                    Order Summary
                    <span className="info-icon bold">?</span>
                </div>
                <div className="review-button-div">
                    {<button className="review-button">{`Transfer $${addCommas(amount)}`}</button>}
                </div>
                <div className="review-button-div">
                    <button className="review-button edit-button" onClick={onClickEditHandler}>Cancel</button>
                </div>
            </div>
        )
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
                            placeholder="$0.00"
                            type="number"
                            step="any"
                            value={amount}
                            onChange={inputOnChange}
                            required
                            disabled={disableField}
                        />
                    </div>
                    <div className='transfer-field-div'>
                        <div className='transfer-field-text'>
                            From
                        </div>
                        <select onChange={typeFromOnChange} defaultValue={bankAccountList[0].id} disabled={disableField}>
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
                        <select onChange={toOnChange} defaultValue={type === "Deposit" ? user.portfolio.id : bankAccountList[0].id} onChange={toOnChange} disabled={disableField}>
                            {toOptions}
                        </select>
                    </div>
                    {type === "Deposit" ? <div className="deposit-limit">Deposit limit: $50,000</div> : ""}
                    {confirmBtn}
                </form>
            </div>
        </div>
    )
}

export default TransferForm
