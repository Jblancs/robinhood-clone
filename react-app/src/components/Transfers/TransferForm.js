import React, { useState } from 'react';
import BankAccountForm from '../BankAccountModal/BankAccountForm';
import { useModal } from "../../context/Modal";
import "./TransferForm.css"
import { addCommas } from '../../Utils';
import { useDispatch } from 'react-redux';
import { createTransfer } from '../../store/transfer';
import { transferPortfolio } from '../../store/portfolio';

function TransferForm({ bank, portfolio }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    let bankAccountList = !bank.error ? Object.values(bank) : []

    const [amount, setAmount] = useState("")
    const [from, setFrom] = useState(bankAccountList.length ? bankAccountList[0].id : "")
    const [to, setTo] = useState(portfolio.id)
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


    // Event Handlers ------------------------------------------------------------------------------------
    const typeFromOnChange = (e) => {
        setFrom(e.target.value)
        if (e.target.selectedIndex === 0) {
            setType("Deposit")
        } else {
            setType("Withdrawal")
        }
    }

    const toOnChange = (e) => {
        setTo(e.target.value)
    }

    const inputOnChange = (e) => {
        setAmount(Number(e.target.value))
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

        if (amount <= 0 || !amount) {
            errorObj.push("Invalid transfer amount $0.00 provided.")
        }

        if (type === "Withdrawal" && amount > portfolio.buying_power) {
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
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const transferData = {
            bank_account_id: (type === "Deposit" ? from : to),
            amount: Number(amount).toFixed(2),
            type: type
        }

        await dispatch(createTransfer(transferData))
        await dispatch(transferPortfolio(transferData))
        closeModal()
    }

    // Transfer Review Buttons ----------------------------------------------------------------------------
    let confirmBtn;
    if (!confirm && !errors.length) {
        confirmBtn = (
            <div className='review-button-div'>
                <button className='transfer-review-button bold' onClick={reviewHandler}>
                    Review Transfer
                </button>
            </div>
        )
    }

    if (errors.length) { // show errors if any
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
                    {<button className="transfer-review-button bold" type="button" onClick={onClickCancelHandler}>Cancel</button>}
                </div>
            </div>
        )
    }

    if (confirm) { // confirm transfer amount if there are no errors
        confirmBtn = (
            <div>
                <div className="review-button-div">
                    {<button className="transfer-review-button bold">{`Transfer $${addCommas(Number(amount).toFixed(2))}`}</button>}
                </div>
                <div className="review-button-div">
                    <button className="transfer-review-button transfer-edit-button bold" onClick={onClickEditHandler}>Cancel</button>
                </div>
            </div>
        )
    }

    // Change to options based on transfer type ----------------------------------------------------------
    let toOptions;
    if (type === "Deposit") {
        toOptions = (
            <option value="brokerage">
                Brokerage ${addCommas(Number(portfolio.buying_power).toFixed(2))}
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

    console.log(from)
    // Component JSX --------------------------------------------------------------------------------------
    return (
        <div className='transfer-modal-container'>
            <div className='transfer-modal-div'>
                <i className="fas fa-times transfer-close-icon" onClick={() => closeModal()} />
                <div className='transfer-modal-header'>
                    Transfer money
                </div>
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
                        <select className='transfer-field-select' onChange={typeFromOnChange} defaultValue={bankAccountList[0].id} disabled={disableField}>
                            {bankAccountList.map((bank) => (
                                <option key={bank.id} value={bank.id}>
                                    {bank.bank} &#8226; {bank.account_type} {bank.account_number}
                                </option>
                            ))}
                            <option value={portfolio.id}>
                                Brokerage ${addCommas(Number(portfolio.buying_power).toFixed(2))}
                            </option>
                        </select>
                    </div>
                    <div className='transfer-field-div'>
                        <div className='transfer-field-text'>
                            To
                        </div>
                        <select className='transfer-field-select' onChange={toOnChange} defaultValue={type === "Deposit" ? portfolio.id : bankAccountList[0].id} disabled={disableField}>
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
