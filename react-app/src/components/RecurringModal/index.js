import React, { useState } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import { useModal } from "../../context/Modal";
import "./RecurringModal.css"

function RecurringModal({ portfolio }) {
    const { closeModal } = useModal();
    const [showStockSearch, setShowStockSearch] = useState(true)
    const [stockPick, setStockPick] = useState("")
    const [shares, setShares] = useState("")
    const [startDate, setStartDate] = useState("")
    const [frequency, setFrequency] = useState("")
    const [payment, setPayment] = useState("")


    const [errors, setErrors] = useState([])
    const [disableField, setDisableField] = useState(false)

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
            <form>
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
                            className='recur-form-field recur-input'
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
                    <div className='recur-form-field-div'>
                        <select className='recur-form-field recur-select' onChange={startOnChange} disabled={disableField}>
                            <option>
                                React Calendar Placeholder
                            </option>
                        </select>
                    </div>
                </div>
                <div className='recur-form-section-div'>
                    <div className='recur-form-field-text'>
                        Frequency
                    </div>
                    <div className='recur-form-field-div'>
                        <select className='recur-form-field recur-select' onChange={frequencyOnChange} disabled={disableField}>
                            <option value="monthly">
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
                            <option value="monthly">
                                Buying Power
                            </option>
                        </select>
                    </div>
                </div>
                <div className='recur-modal-button-div'>
                    <button>
                        Review
                    </button>
                    <button>
                        Cancel
                    </button>
                </div>
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
                    {showStockSearch ? "" : `$${Number(portfolio.buying_power).toFixed(2)} buying power available`}
                </div>
                {formDisplay}
            </div>
        </div>
    )
}

export default RecurringModal
