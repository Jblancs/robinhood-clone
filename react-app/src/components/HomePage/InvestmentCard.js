import React, { useState, useEffect } from "react";
import Watchlists from "./Watchlist";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import { getMarketValue, getPriceChange, getChartData, daysAgo, buildGraph } from "../../Utils";

function InvestmentCard({ inv }) {
    const [chartData, setChartData] = useState([]) // array of stockData over time period
    const oneWeekAgo = daysAgo(7)
    const graphFetchDetails = {
        setState: setChartData,
        ticker: inv.ticker,
        multiplier: 1,
        timeSpan: "hour",
        dateFrom: oneWeekAgo,
        dateTo: new Date().toISOString().slice(0, 10),
    }

    console.log(chartData)
    console.log(inv.ticker)

    // API call to retrieve graph info ---------------------------------------------------------------------------
    useEffect(() => {
        getChartData(graphFetchDetails)
    }, [inv])

    let graph = buildGraph(chartData, "stock")

    return (
        <div className="inv-card">
            <div className="inv-tick-share">
                <div className="stock-ticker bold">
                    {inv.ticker}
                </div>
                <div>
                    {inv.shares} Share(s)
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
                    {Number(inv.price_per_share).toFixed(2)}
                </div>
                <div>
                    +0.00%
                </div>
            </div>
        </div>
    )
}

export default InvestmentCard
