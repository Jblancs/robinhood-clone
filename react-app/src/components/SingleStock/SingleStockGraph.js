import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import { getChartData, prevCloseDate, daysAgo, buildGraph, getPriceChange } from "../../Utils";


function SingleStockGraph({ stockData, stockTicker }) {
    const prevClose = prevCloseDate(stockData.t)
    console.log(prevClose)
    const oneWeekAgo = daysAgo(7)
    const [chartData, setChartData] = useState([]) // array of stockData over time period
    const [period, setPeriod] = useState("Past week")

    const defaultFetchDetails = {
        setState: setChartData,
        ticker: stockTicker,
        multiplier: 10,
        timeSpan: "minute",
        dateFrom: oneWeekAgo,
        dateTo: prevClose,
    }

    const [fetchDetails, setFetchDetails] = useState(defaultFetchDetails)

    useEffect(() => {
        getChartData(fetchDetails)
    }, [fetchDetails])

    if (!chartData.length) return <div>Loading...</div>

    // builds chart based on stockData
    let graph = buildGraph(chartData)
    console.log(chartData)
    console.log(stockData)

    // calculates price change
    const priceChange = getPriceChange(chartData, stockData.c)
    let change;

    if (priceChange < 0) {
        change = (
            <span className="price-change">
                {`-$${Math.abs(priceChange).toFixed(2)} (-${Math.abs(priceChange / stockData.c).toFixed(2)}%) `}
            </span>
        )
    } else {
        change = (
            <span className="price-change">
                {`+$${Math.abs(priceChange).toFixed(2)} (+${Math.abs(priceChange / stockData.c).toFixed(2)}%) `}
            </span>
        )
    }

    // handles changing chart details
    const changeFetchDetails = (mult, time, from) => {
        fetchDetails.multiplier = mult
        fetchDetails.timeSpan = time
        fetchDetails.dateFrom = from
        setFetchDetails({
            ...fetchDetails
        })
    }

    return (
        <div className="stock-chart-container">
            <div className="stock-header">
                <div className="stock-name bold">
                    {stockTicker}
                </div>
                <div className="stock-price bold">
                    ${stockData.c}
                </div>
                <div className="stock-change">
                    <span className="price-change bold">
                        {change}
                    </span>
                    <span className="price-period">
                        {period}
                    </span>
                </div>
            </div>
            <div className="stock-chart" >
                <Line
                    data={graph.data}
                    options={graph.options}
                ></Line>
            </div>
            <div className="stock-chart-btn-container">
                <button className="chart-btn-1d" onClick={() => changeFetchDetails(5, "minute", prevClose)}>
                    1D
                </button>
                <button className="chart-btn-1d" onClick={() => changeFetchDetails(10, "minute", daysAgo(7))}>
                    1W
                </button>
                <button className="chart-btn-1d" onClick={() => changeFetchDetails(1, "hour", daysAgo(30))}>
                    1M
                </button>
                <button className="chart-btn-1d" onClick={() => changeFetchDetails(1, "day", daysAgo(90))}>
                    3M
                </button>
                <button className="chart-btn-1d" onClick={() => changeFetchDetails(1, "day", daysAgo(365))}>
                    1Y
                </button>
                <button className="chart-btn-1d" onClick={() => changeFetchDetails(7, "day", daysAgo(1825))}>
                    5Y
                </button>
            </div>
            <div className="stock-volume">
                Today's volume {stockData.v}
            </div>
        </div>
    )
}

export default SingleStockGraph
