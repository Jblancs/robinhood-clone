import React, { useEffect, useState } from "react";
import "./SingleStock.css"

function BuySellStock({ stockData, stockTicker }) {
    return (
        <div className="buy-sell-div">
            <div className="buy-sell-container">
                <div className="buy-sell-btn-div">
                    <div className="transaction-btn">
                        Buy {stockTicker}
                    </div>
                    <div className="transaction-btn">
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
                            Buy In
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
                        <input className="shares-input" placeholder="0" />
                    </div>
                    <div className="buy-sell-price-div flex-btwn">
                        <div>
                            Market Price
                            <span className="info-icon bold">?</span>
                        </div>
                        <div>
                            $1.26
                        </div>
                    </div>
                    <div className="buy-sell-cost-div flex-btwn">
                        <div>
                            Estimated Cost
                        </div>
                        <div>
                            $1.26
                        </div>
                    </div>
                    <div className="review-button-div">
                        <button className="review-button">Review Order</button>
                    </div>
                </div>
                <div className="buying-power-div">
                    $0.00 buying power available
                </div>
            </div>
        </div>
    )
}

export default BuySellStock
