import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { buildGraph, addCommas } from "../../Utils";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import './HomePage.css'


function PortfolioGraph({ portHistory, portfolio }) {
    let [period, setPeriod] = useState(365)
    let [selected, setSelected] = useState("1Y")
    let historyArray = Object.values(portHistory)

    let graph = buildGraph(historyArray, "portfolio", period)

    let onClickHandler = (days,period) => {
        setPeriod(days)
        setSelected(period)
    }

    return (
        <div className="portfolio-container">
            <div className="stock-header">
                <div className="stock-price bold">
                    ${addCommas(Number(portfolio.portfolio_total).toFixed(2))}
                </div>
                <div className="stock-change">
                    <span className="price-change bold">

                    </span>
                    <span className="price-period">

                    </span>
                </div>
            </div>
            <div className="portfolio-chart" >
                <Line
                    data={graph.data}
                    options={graph.options}
                ></Line>
            </div>
            <div className="stock-chart-btn-container">
                <button className={selected === "1W" ? "chart-btn selected-period" : "chart-btn"} onClick={() => onClickHandler(7,"1W")}>
                    1W
                </button>
                <button className={selected === "1M" ? "chart-btn selected-period" : "chart-btn"} onClick={() => onClickHandler(30,"1M")}>
                    1M
                </button>
                <button className={selected === "3M" ? "chart-btn selected-period" : "chart-btn"} onClick={() => onClickHandler(90,"3M")}>
                    3M
                </button>
                <button className={selected === "1Y" ? "chart-btn selected-period" : "chart-btn"} onClick={() => onClickHandler(365,"1Y")}>
                    1Y
                </button>
                <button className={selected === "ALL" ? "chart-btn selected-period" : "chart-btn"} onClick={() => onClickHandler(1800,"ALL")}>
                    ALL
                </button>
            </div>
        </div>
    )
}

export default PortfolioGraph
