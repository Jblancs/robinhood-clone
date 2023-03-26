import React, { useEffect, useState } from "react";
import "./SingleStock.css"

function BuySellStock({ stockData, stockTicker }) {
    const [disbleInput, setDisableInput] = useState(false)
    const [type, setType] = useState("buy")
    const [shares, setShares] = useState(0)
    const [amount, setAmount] = useState(0)
    const [confirm, setConfirm] = useState(false)
    console.log(shares)

    


    // Event Handlers -----------------------------------------------------------------------------------------
    const inputHandler = (e) => {
        setShares(e.target.value)
        setAmount((shares * stockData.c).toFixed())
    }

    const onClickReviewHandler = () => {
        setConfirm(true)
        setDisableInput(true)
    }

    const onClickEditHandler = () => {
        setConfirm(false)
        setDisableInput(false)
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
                    <div onClick={() => setType("sell")} className={type === "sell" ? "transaction-btn selected" : "transaction-btn"}>
                        Sell {stockTicker}
                    </div>
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
                        <input className="shares-input" onChange={inputHandler} placeholder="0" type="number" disabled={disbleInput} />
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
                    {type === "buy" ? "$0.00 buying power available" : "1 Share(s) available"}
                </div>
            </div>
        </div>
    )
}

export default BuySellStock
