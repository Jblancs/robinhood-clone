import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { buildGraph, addCommas } from "../../Utils";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import './HomePage.css'


function PortfolioGraph({ portHistory, portfolio }) {
    let [period, setPeriod] = useState(365)
    let historyArray = Object.values(portHistory)

    let graph = buildGraph(historyArray, "portfolio", period)

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
                <button className="chart-btn-1d" onClick={() => setPeriod(7)}>
                    1W
                </button>
                <button className="chart-btn-1d" onClick={() => setPeriod(30)}>
                    1M
                </button>
                <button className="chart-btn-1d" onClick={() => setPeriod(90)}>
                    3M
                </button>
                <button className="chart-btn-1d" onClick={() => setPeriod(365)}>
                    1Y
                </button>
                <button className="chart-btn-1d" onClick={() => setPeriod(1800)}>
                    ALL
                </button>
            </div>
        </div>
    )
}

export default PortfolioGraph
