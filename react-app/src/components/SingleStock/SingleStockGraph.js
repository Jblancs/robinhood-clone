import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import { getChartData, prevCloseDate, daysAgo, buildGraph, getPriceChange } from "../../Utils";


function SingleStockGraph({ stockData, stockTicker, stockAboutInfo }) {
    const prevClose = prevCloseDate(stockData.t)
    const oneWeekAgo = daysAgo(7)
    const [chartData, setChartData] = useState([]) // array of stockData over time period
    const [period, setPeriod] = useState("Past Week")
    const [selected, setSelected] = useState("1W")

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

    if (!chartData.length) return <div className='loading-div'><img src='/images/loading.gif' alt='loading'/></div>

    // builds chart based on stockData
    let graph = buildGraph(chartData, "stock")

    // calculates price change
    const priceChange = getPriceChange(chartData, stockData.c, "chart")
    let change;

    if (priceChange < 0) {
        change = (
            <span className="price-change negative">
                {`-$${Math.abs(priceChange).toFixed(2)} (-${Math.abs(priceChange / stockData.c * 100).toFixed(2)}%) `}
            </span>
        )
    } else {
        change = (
            <span className="price-change positive">
                {`+$${Math.abs(priceChange).toFixed(2)} (+${Math.abs(priceChange / stockData.c * 100).toFixed(2)}%) `}
            </span>
        )
    }

    // handles changing chart details
    const changeFetchDetails = (mult, time, from, length, past) => {
        fetchDetails.multiplier = mult
        fetchDetails.timeSpan = time
        fetchDetails.dateFrom = from
        setFetchDetails({
            ...fetchDetails
        })
        setSelected(length)
        setPeriod(past)

    }

    return (
        <div className="stock-chart-container">
            <div className="stock-header">
                <div className="stock-name bold">
                    {stockTicker}
                </div>
                <div className="stock-price bold">
                    ${Number(stockData.c).toFixed(2)}
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
                <button className={selected === "1D" ? "chart-btn selected-period" : "chart-btn"} onClick={() => changeFetchDetails(5, "minute", prevClose, "1D", "Past day")}>
                    1D
                </button>
                <button className={selected === "1W" ? "chart-btn selected-period" : "chart-btn"} onClick={() => changeFetchDetails(10, "minute", daysAgo(7), "1W", "Past week")}>
                    1W
                </button>
                <button className={selected === "1M" ? "chart-btn selected-period" : "chart-btn"} onClick={() => changeFetchDetails(1, "hour", daysAgo(30), "1M", "Past month")}>
                    1M
                </button>
                <button className={selected === "3M" ? "chart-btn selected-period" : "chart-btn"} onClick={() => changeFetchDetails(1, "day", daysAgo(90), "3M", "Past 3 month")}>
                    3M
                </button>
                <button className={selected === "1Y" ? "chart-btn selected-period" : "chart-btn"} onClick={() => changeFetchDetails(1, "day", daysAgo(365), "1Y", "Past year")}>
                    1Y
                </button>
                <button className={selected === "5Y" ? "chart-btn selected-period" : "chart-btn"} onClick={() => changeFetchDetails(7, "day", daysAgo(1825), "5Y", "Past 5 years")}>
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
