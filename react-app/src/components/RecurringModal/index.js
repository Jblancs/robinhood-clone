import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import SearchComponent from '../SearchComponent/SearchComponent';
import { useModal } from "../../context/Modal";
import { addCommas, getDisplayDateYear, getTomorrow, getStockInfo, get9amEst } from "../../Utils"
import "./RecurringModal.css"
import CalendarComponent from '../Calendar';
import { createRecurringInv, updateRecurringInv } from '../../store/recurring';
import { clearStockState, fetchStock, addStock } from '../../store/stock';

function RecurringModal({ portfolio, updateObj }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const [stockAboutInfo, setStockAboutInfo] = useState()
    const [showStockSearch, setShowStockSearch] = useState(!updateObj ? true : false)

    const [stockPick, setStockPick] = useState(!updateObj ? "" : updateObj.ticker)
    const [shares, setShares] = useState(!updateObj ? "" : updateObj.shares)
    const [startDate, setStartDate] = useState(!updateObj ? getTomorrow() : updateObj.start_date)
    const [frequency, setFrequency] = useState(!updateObj ? "Weekly" : updateObj.frequency)
    const [payment, setPayment] = useState(portfolio.id)

    const [showCalendar, setShowCalendar] = useState(false)
    const [errors, setErrors] = useState([])
    const [disableField, setDisableField] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const stock = useSelector(state => state.stock.stock)

    useEffect(() => {
        if(!updateObj && !showStockSearch && stockPick){
            dispatch(fetchStock(stockPick))
            getStockInfo(stockPick, setStockAboutInfo)
        }

        return () => {
            dispatch(clearStockState())
        }
    }, [stockPick, dispatch])

    if(!stock && !updateObj && !showStockSearch) return <div className='loading-div'><img src='/images/loading.gif' alt='loading' /></div>

    // if stock is not in db then add it ------------------------------------------------------------------------
    if (stock?.error && !updateObj && !showStockSearch) {
        let stockInfo = {
            ticker: stockPick,
            name: stockAboutInfo?.name,
            description: stockAboutInfo?.description,
            employees: stockAboutInfo?.total_employees,
            listed: stockAboutInfo?.list_date,
        }

        const addStockInfo = async (stockPayload) => {
            await dispatch(addStock(stockPayload))
        }

        addStockInfo(stockInfo)
    }

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
            start_date: (get9amEst(startDate)).toUTCString(),
            frequency: frequency,
            portfolio_id: portfolio.id,
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

        // confirm message based on create or update
        let reviewMessage;
        if(!updateObj){
            reviewMessage = (
                <>
                    You'll buy <b>{shares} share(s)</b> of <b>{stockPick} {frequency}</b>. Your first order will be placed on <b>{getDisplayDateYear(startDate)}</b> at 11:00 AM ET in a batch order with other Robinhood recurring investment orders for <b>{stockPick}</b>.
                </>
            )
        } else {
            reviewMessage = (
                <>
                    <div className="acct-error-title-div bold">
                        <span className="acct-info-icon acct-error-icon bold">!</span>
                        Schedule change
                    </div>
                    <div>
                        {updateObj.frequency === frequency ? "" : `You're changing your investment schedule from ${updateObj.frequency} to ${frequency}.`}
                    </div>
                    <div>
                        Your next order will be placed on <b>{getDisplayDateYear(startDate)}</b>
                    </div>
                </>
            )
        }

        confirmBtn = (
            <div>
                <div className='recur-form-submit-text'>
                {reviewMessage}
                </div>
                <div className="recur-form-button-div">
                    <button className="recur-form-button bold">{!updateObj ? "Submit" : "Save Changes"}</button>
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
                        {!updateObj ? "Starts" : "Next order date"}
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
                        <select className='recur-form-field recur-select' onChange={frequencyOnChange} defaultValue={!updateObj ? "Weekly" : updateObj.frequency}  disabled={disableField}>
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
                        <select className='recur-form-field recur-select' defaultValue={portfolio.id} onChange={paymentOnChange} disabled={disableField}>
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
