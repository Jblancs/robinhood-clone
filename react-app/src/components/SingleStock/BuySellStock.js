import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createInvestment, updateInvestment, sellAllInvestments } from "../../store/investment";
import { updatePortfolio } from "../../store/portfolio";
import { createTransaction } from "../../store/transaction";
import "./SingleStock.css"
import { addCommas } from "../../Utils";

function BuySellStock({ stockData, stockTicker, portfolio, dispatch }) {
    const [disbleInput, setDisableInput] = useState(false)
    const [type, setType] = useState("buy")
    const [shares, setShares] = useState(0)
    const [amount, setAmount] = useState(0)
    const [confirm, setConfirm] = useState(false)
    const [errors, setErrors] = useState({})
    const investment = useSelector(state => state.investments.investments)

    useEffect(() => {
        setAmount((shares * stockData.c).toFixed(2))
        return () => {
            setAmount(0)
        }
    }, [shares, amount])


    // Event Handlers -----------------------------------------------------------------------------------------
    const inputHandler = (e) => {
        setShares(+e.target.value)
    }

    const onClickReviewHandler = () => {

        let errorObj = {}

        if (shares <= 0) {
            errorObj.type = "Not Enough Shares"
            errorObj.message = "Enter at least 0.000001 shares."
        }
        if (investment && type === "sell" && shares > investment[stockTicker].shares) {
            errorObj.type = "Not Enough Shares"
            errorObj.message = `You can sell at most ${investment[stockTicker].shares} share(s) of ${stockTicker}`
        }
        if (type === "buy" && amount > portfolio.buying_power) {
            errorObj.type = "Not Enough Buying Power"
            errorObj.message = "You don't have enough buying power in your brokerage account to place this order."
        }

        if (Object.values(errorObj).length) {
            setErrors(errorObj)
        } else {
            setConfirm(true)
        }
        setDisableInput(true)
    }

    const onClickEditHandler = () => {
        setConfirm(false)
        setDisableInput(false)
    }

    const onClickDismissHandler = () => {
        setDisableInput(false)
        setErrors({})
    }

    const onClickTypeHandler = () => {
        if (!confirm && !Object.values(errors).length) {
            type === "buy" ? setType("sell") : setType("buy")
        } else if (confirm || Object.values(errors).length) {
            return
        }
    }


    // Submit Order Handle -----------------------------------------------------------------------------------
    const submitHandler = async (e) => {
        e.preventDefault()

        const transactionData = {
            shares: Number(shares),
            total_cost: Number(amount),
            type: type
        }

        const newTransaction = await dispatch(createTransaction(stockTicker, transactionData))

        // for if you BUY and do NOT own the stock
        if (!newTransaction.errors && investment.error && type === "buy") {
            await dispatch(createInvestment(stockTicker, transactionData))
            await dispatch(updatePortfolio(transactionData))

        // for if SELL all shares of the stock
        } else if (!newTransaction.errors && type === "sell" && investment[stockTicker].shares === shares) {
            await dispatch(sellAllInvestments(stockTicker))
            await dispatch(updatePortfolio(transactionData))

        // for if you BUY/SELL and OWN the stock
        } else if (!newTransaction.errors && investment[stockTicker]) {
            await dispatch(updateInvestment(stockTicker, transactionData))
            await dispatch(updatePortfolio(transactionData))
        }

        setShares(0)
        setAmount(0)
        setConfirm(false)
        setType("buy")
        setDisableInput(false)
    }

    //Sell form button (hidden if you do not own stock) ------------------------------------------------------
    let sellFormButton;
    if (investment[stockTicker]) {
        sellFormButton = (
            <div onClick={onClickTypeHandler} className={type === "sell" ? "transaction-btn selected" : "transaction-btn"}>
                Sell {stockTicker}
            </div>
        )
    }

    // Buy/Sell confirm button -------------------------------------------------------------------------------
    let confirmBtn;
    if (!confirm && !Object.values(errors).length) {
        confirmBtn = (
            <div className="review-button-div">
                {<button className="review-button bold" type="button" onClick={onClickReviewHandler} >Review Order</button>}
            </div>
        )

    }
    if (Object.values(errors).length) {
        console.log("errorsBtn if")
        confirmBtn = (
            <div>
                <div>
                    <div className="error-message-div bold">
                        <span className="info-icon error-icon bold">!</span>
                        {errors.type}
                    </div>
                    <div className="error-message-div">{errors.message}</div>
                </div>
                <div className="review-button-div">
                    {<button className="review-button bold" type="button" onClick={onClickDismissHandler} >Dismiss</button>}
                </div>
            </div>
        )

    }
    if (confirm) {
        confirmBtn = (
            <div>
                <div>
                    Order Summary
                    <span className="info-icon bold">?</span>
                </div>
                <div className="review-text">
                    {`You are placing a good for day market order to ${type} ${shares} share(s) of ${stockTicker}.`}
                </div>
                <div className="review-button-div">
                    {<button className="review-button">{type === "buy" ? "Buy" : "Sell"}</button>}
                </div>
                <div className="review-button-div">
                    <button className="review-button edit-button" onClick={onClickEditHandler}>Edit</button>
                </div>
            </div>
        )
    }

    // Component JSX ---------------------------------------------------------------------------------------
    return (
        <div className="buy-sell-div">
            <div className="buy-sell-container">
                <div className="buy-sell-btn-div">
                    <div onClick={onClickTypeHandler} className={type === "buy" ? "transaction-btn selected" : "transaction-btn"}>
                        Buy {stockTicker}
                    </div>
                    {sellFormButton}
                </div>
                <div className="buy-sell-form-div">
                    <form onSubmit={submitHandler}>
                        <div className="order-type-div flex-btwn pad20">
                            <div>
                                Order Type
                            </div>
                            <div>
                                Market Order
                                <span className="info-icon bold">i</span>
                            </div>
                        </div>
                        <div className="buy-sell-in-div flex-btwn">
                            <div className="buy-sell-text">
                                {type === "buy" ? "Buy In" : "Sell In"}
                            </div>
                            <select className="buy-sell-in-select" disabled>
                                <option>
                                    Shares
                                </option>
                            </select>
                        </div>
                        <div className="buy-sell-shares-div flex-btwn pad20">
                            <div className="buy-sell-text">
                                Shares
                            </div>
                            <input className="shares-input"
                                onChange={inputHandler}
                                placeholder="0"
                                type="number"
                                step="any"
                                name="shares"
                                disabled={disbleInput}
                                value={shares} />
                        </div>
                        <div className="buy-sell-price-div flex-btwn">
                            <div className="bold">
                                Market Price
                                <span className="info-icon bold">?</span>
                            </div>
                            <div className="bold">
                                ${stockData.c}
                            </div >
                        </div>
                        <div className="buy-sell-cost-div flex-btwn">
                            <div className="bold">
                                {type === "buy" ? "Estimated Cost" : "Estimated Credit"}
                            </div>
                            <div className="bold">
                                ${amount}
                                <input type="hidden" name="total_cost" value={Number(amount).toFixed(2)} />
                            </div>
                        </div>
                        {confirmBtn}
                    </form>
                </div>
                <div className="buying-power-div">
                    {type === "buy" ? `$${addCommas(Number(portfolio.buying_power).toFixed(2))} buying power available` : `${investment[stockTicker] ? investment[stockTicker].shares : 0} Share(s) available`}
                </div>
            </div>
        </div>
    )
}

export default BuySellStock
