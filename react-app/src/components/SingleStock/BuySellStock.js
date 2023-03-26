import React, { useEffect, useState } from "react";
import "./SingleStock.css"

function BuySellStock({ stockData, stockTicker }) {
    const [disbleInput, setDisableInput] = useState(false)
    const [type, setType] = useState("buy")
    const [shares, setShares] = useState(0)
    const [amount, setAmount] = useState(0)

    const inputHandler = (e) => {
        setShares(e.target.value)
        setAmount(shares * stockData.c)
    }

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
                            ${Number(stockData.c * shares).toFixed(2)}
                        </div>
                    </div>
                    <div className="review-button-div">
                        <button className="review-button">Review Order</button>
                    </div>
                </div>
                <div className="buying-power-div">
                    {type === "buy" ? "$0.00 buying power available" : "1 Shares available"}

                </div>
            </div>
        </div>
    )
}

export default BuySellStock
