import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockData } from "../../Utils";
import SingleStockGraph from "./SingleStockGraph";
import "./SingleStock.css"
import BuySellStock from "./BuySellStock";





function SingleStock() {
    const { ticker } = useParams()
    const [stockData, setStockData] = useState()
    let stockTicker = ticker.toUpperCase()

    useEffect(() => {
        getStockData(stockTicker, setStockData)
    }, [])

    if (!stockData) return <div>Loading...</div>

    return (
        <div className="stock-page-container">
            <div className="stock-page-div">
                <div className="stock-info-div">
                    <div className="stock-graph-div">
                        {stockData ? <SingleStockGraph stockData={stockData} stockTicker={stockTicker} /> : "Loading..."}
                    </div>
                    <div className="stock-about-div">
                        About
                    </div>
                </div>
                <div className="stock-buy-sell-div">
                    <BuySellStock stockData={stockData} />
                </div>
            </div>
        </div>
    )
}

export default SingleStock
