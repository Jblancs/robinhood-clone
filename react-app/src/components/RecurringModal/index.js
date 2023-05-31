import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import SearchComponent from '../SearchComponent/SearchComponent';
import { useModal } from "../../context/Modal";
import { addCommas, formatDate, getDisplayDateYear, getTomorrow11EST } from "../../Utils"
import "./RecurringModal.css"
import CalendarComponent from '../Calendar';
import { createRecurringInv, updateRecurringInv } from '../../store/recurring';

function RecurringModal({ portfolio, updateObj }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const [showStockSearch, setShowStockSearch] = useState(true)

    const [stockPick, setStockPick] = useState(!updateObj ? "" : updateObj.ticker)
    const [shares, setShares] = useState(!updateObj ? "" : updateObj.shares)
    const [startDate, setStartDate] = useState(getTomorrow11EST())
    const [frequency, setFrequency] = useState(!updateObj ? "" : updateObj.frequency)
    const [account, setPayment] = useState(portfolio.id)

    const [showCalendar, setShowCalendar] = useState(false)
    const [errors, setErrors] = useState([])
    const [disableField, setDisableField] = useState(false)
    const [confirm, setConfirm] = useState(false)

    // Event Handlers -------------------------------------------------------------------------------------
    const sharesOnChange = (e) => {
        setShares(Number(e.target.value))
    }

    const startOnChange = (e) => {
        setStartDate(e.target.value)
    }

    const frequencyOnChange = (e) => {
        setFrequency(e.target.value)
    }

    const paymentOnChange = (e) => {
        setPayment(e.target.value)
    }

    const onClickEditHandler = () => {
        setConfirm(false)
        setDisableField(false)
    }

    const onClickShowCalender = (e) => {
        e.stopPropagation()
        setShowCalendar(!showCalendar)
    }

    const reviewHandler = (e) => {
        e.preventDefault()

        let errorObj = []

        if (shares <= 0 || !shares) {
            errorObj.push("Please enter a valid number of shares")
        }

        if (errorObj.length) {
            setErrors(errorObj)
        } else {
            setErrors([])
            setConfirm(true)
            setDisableField(true)
        }
    }

    // onSubmit handler -----------------------------------------------------------------------------------
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        let recurringInvData = {
            ticker: stockPick,
            shares: shares,
            start_date: startDate.toUTCString(),
            frequency: frequency
        }

        if(!updateObj){
            await dispatch(createRecurringInv(recurringInvData))
        }else{
            await dispatch(updateRecurringInv(updateObj.id, recurringInvData))
        }

        closeModal()
    }

    // Error Display --------------------------------------------------------------------------------------
    let errorDisplay;
    if (errors.length) { // show errors if any
        errorDisplay = (
            <div className='recur-error-message-container'>
                <div className="recur-error-message-div bold">
                    <span className="recur-info-icon recur-error-icon bold">!</span>
                    Error
                </div>
                <div className="recur-error-message-div">
                    {errors.map(message => (
                        <div key={message} className="recur-error-message-div">&#8226; {message}</div>
                    ))}
                </div>
            </div>
        )
    }

    // Recurring Inv Review Buttons -----------------------------------------------------------------------
    let confirmBtn;
    if (!confirm) {
        confirmBtn = (
            <div className='recur-form-button-div'>
                <button className='recur-form-button bold' onClick={reviewHandler}>
                    Review
                </button>
                <button className='recur-form-button recur-form-cancel bold' onClick={() => closeModal()}>
                    Cancel
                </button>
            </div>
        )
    }


    if (confirm) { // submit recurring investment if there are no errors
        confirmBtn = (
            <div>
                <div className='recur-form-submit-text'>
                You'll buy <b>{shares} share(s)</b> of <b>{stockPick} {frequency}</b>. Your first order will be placed on <b>{startDate}</b> at 11:00 AM ET in a batch order with other Robinhood recurring investment orders for <b>{stockPick}</b>.
                </div>
                <div className="recur-form-button-div">
                    {<button className="recur-form-button bold">Submit</button>}
                    <button className="recur-form-button recur-form-cancel bold" onClick={onClickEditHandler}>Edit</button>
                </div>
            </div>
        )
    }

    // Form Display ---------------------------------------------------------------------------------------
    let formDisplay;

    if (showStockSearch) {
        formDisplay = (
            <>
                <SearchComponent type="recur" setShowStockSearch={setShowStockSearch} setStockPick={setStockPick} />
                <div className='recur-modal-button-div'>
                    <button className='recur-modal-cancel bold' onClick={() => closeModal()}>
                        Cancel
                    </button>
                </div>
            </>
        )
    } else {
        formDisplay = (
            <form onSubmit={onSubmitHandler}>
                <div className='recur-form-section-div'>
                    <div className='recur-form-field-text'>
                        Invest in
                    </div>
                    <div className='recur-form-field-div'>
                        <input
                            className='recur-form-field recur-input'
                            value={stockPick}
                            type='text'
                            disabled
                        />
                    </div>
                </div>
                <div className='recur-form-section-div'>
                    <div className='recur-form-field-text'>
                        Shares
                    </div>
                    <div className='recur-form-field-div'>
                        <input
                            className='recur-form-field recur-input-shares'
                            placeholder="0 shares"
                            type="number"
                            step="any"
                            value={shares}
                            onChange={sharesOnChange}
                            required
                            disabled={disableField}
                        />
                    </div>
                </div>
                <div className='recur-form-section-div'>
                    <div className='recur-form-field-text'>
                        Starts
                    </div>
                    <div className='recur-form-field-div recur-calendar-field-div'>
                        <input
                        className='recur-form-field recur-input-date'
                        type='text'
                        value={startDate ? getDisplayDateYear(startDate) : ""}
                        onChange={startOnChange}
                        onClick={onClickShowCalender}
                        disabled={disableField}
                        readOnly
                        />
                        {showCalendar ? <CalendarComponent setStartDate={setStartDate} startDate={startDate} setShowCalendar={setShowCalendar} showCalendar={showCalendar}/> : ""}
                    </div>
                </div>
                <div className='recur-form-section-div'>
                    <div className='recur-form-field-text'>
                        Frequency
                    </div>
                    <div className='recur-form-field-div'>
                        <select className='recur-form-field recur-select' onChange={frequencyOnChange} defaultValue="Weekly"  disabled={disableField}>
                            <option value="Daily">
                                Every Market Day
                            </option>
                            <option value="Weekly">
                                Every Week
                            </option>
                            <option value="Bi-Weekly">
                                Every two weeks
                            </option>
                            <option value="Monthly">
                                Every Month
                            </option>
                        </select>
                    </div>
                </div>
                <div className='recur-form-section-div'>
                    <div className='recur-form-field-text'>
                        Payment
                    </div>
                    <div className='recur-form-field-div'>
                        <select className='recur-form-field recur-select' onChange={paymentOnChange} disabled={disableField}>
                            <option value={portfolio.id}>
                                Buying Power
                            </option>
                        </select>
                    </div>
                </div>
                {errorDisplay}
                {confirmBtn}
            </form>
        )
    }

    // Component JSX --------------------------------------------------------------------------------------
    return (
        <div className='recur-modal-container'>
            <div className='recur-modal-div'>
                <i className="fas fa-times recur-close-icon" onClick={() => closeModal()} />
                <div className='recur-modal-header'>
                    Start a recurring investment
                </div>
                <div className='recur-modal-buy-power'>
                    {showStockSearch ? "" : `$${addCommas(Number(portfolio.buying_power).toFixed(2))} buying power available`}
                </div>
                {formDisplay}
            </div>
        </div>
    )
}

export default RecurringModal
