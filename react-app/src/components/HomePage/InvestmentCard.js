import React, { useState, useEffect } from "react";
import Watchlists from "./Watchlist";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import { stockPercentChange, currentStockPrice, getChartData, daysAgo, buildGraph } from "../../Utils";

function InvestmentCard({ inv, ticker }) {
    const [chartData, setChartData] = useState([]) // array of stockData over time period
    const oneWeekAgo = daysAgo(7)
    const graphFetchDetails = {
        setState: setChartData,
        ticker: ticker,
        multiplier: 3,
        timeSpan: "hour",
        dateFrom: oneWeekAgo,
        dateTo: new Date().toISOString().slice(0, 10),
    }


    // API call to retrieve graph info ---------------------------------------------------------------------------
    useEffect(() => {
        getChartData(graphFetchDetails)
    }, [inv])

    let graph = buildGraph(chartData, "stock")

    let currentPrice=0.00
    let percentChange=0.00
    if(chartData !== "error"){
        currentPrice = currentStockPrice(chartData)
        percentChange = stockPercentChange(chartData, currentPrice)
    }

    // Component JSX -------------------------------------------------------------------------------------------
    return (
        <div className="inv-card">
            <div className="inv-tick-share">
                <div className="stock-ticker bold">
                    {ticker}
                </div>
                <div className="stock-share-watch">
                    {inv ? `${inv.shares} Share(s)` : ""}
                </div>
            </div>
            <div className="inv-chart-pic">
                <Line
                    data={graph.data}
                    options={graph.options}
                ></Line>
            </div>
            <div className="inv-price-change">
                <div>
                    {Number(currentPrice).toFixed(2)}
                </div>
                <div className={percentChange < 0 ? "negative" : "positive"}>
                    {`${percentChange < 0 ? "" : "+"}${Number(percentChange).toFixed(2)}`}%
                </div>
            </div>
        </div>
    )
}

export default InvestmentCard
