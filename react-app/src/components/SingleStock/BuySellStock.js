import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createInvestment } from "../../store/investment";
import { createTransaction } from "../../store/transaction";
import "./SingleStock.css"

function BuySellStock({ stockData, stockTicker, portfolio, dispatch }) {
    const [disbleInput, setDisableInput] = useState(false)
    const [type, setType] = useState("buy")
    const [shares, setShares] = useState(0)
    const [amount, setAmount] = useState(0)
    const [confirm, setConfirm] = useState(false)
    const investment = useSelector(state => state.investments.investments)

    useEffect(() => {
        setAmount((shares * stockData.c).toFixed())
    }, [shares, amount])


    // Event Handlers -----------------------------------------------------------------------------------------
    const inputHandler = (e) => {
        setShares(e.target.value)
    }

    const onClickReviewHandler = () => {
        setConfirm(true)
        setDisableInput(true)
    }

    const onClickEditHandler = () => {
        setConfirm(false)
        setDisableInput(false)
    }

    // Submit Order Handle -----------------------------------------------------------------------------------
    const submitHandler = async (e) => {
        e.preventDefault()

        const transactionData = {
            shares: type === "buy" ? shares : -shares,
            totalCost: type === "buy" ? -amount : amount,
            type: type
        }

        const newTransaction = await dispatch(createTransaction(stockTicker, transactionData))
        if(!newTransaction.errors && !investment){
            await dispatch(createInvestment(stockTicker, transactionData))

        }

    }

    //Sell form button (hidden if you do not own stock) ------------------------------------------------------
    let sellFormButton;
    if (investment) {
        sellFormButton = (
            <div onClick={() => setType("sell")} className={type === "sell" ? "transaction-btn selected" : "transaction-btn"}>
                Sell {stockTicker}
            </div>
        )
    }

    // Buy/Sell confirm button -------------------------------------------------------------------------------
    let confirmBtn;
    if (!confirm) {
        confirmBtn = (
            <div className="review-button-div">
                {<button className="review-button" onClick={onClickReviewHandler} >Review Order</button>}
            </div>
        )
    } else {
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
                    <div onClick={() => setType("buy")} className={type === "buy" ? "transaction-btn selected" : "transaction-btn"}>
                        Buy {stockTicker}
                    </div>
                    {sellFormButton}
                </div>
                <div className="buy-sell-form-div">
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
                        <select className="buy-sell-in-select">
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
                            disabled={disbleInput}
                            value={shares} />
                    </div>
                    <div className="buy-sell-price-div flex-btwn">
                        <div>
                            Market Price
                            <span className="info-icon bold">?</span>
                        </div>
                        <div>
                            ${stockData.c}
                        </div>
                    </div>
                    <div className="buy-sell-cost-div flex-btwn">
                        <div>
                            {type === "buy" ? "Estimated Cost" : "Estimated Credit"}
                        </div>
                        <div>
                            ${Number(amount).toFixed(2)}
                        </div>
                    </div>
                    {confirmBtn}
                </div>
                <div className="buying-power-div">
                    {type === "buy" ? `$${Number(portfolio.buying_power).toFixed(2)} buying power available` : `${investment[stockTicker]?.shares} Share(s) available`}
                </div>
            </div>
        </div>
    )
}

export default BuySellStock
