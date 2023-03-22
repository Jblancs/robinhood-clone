import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import './investing.css'
import axios from "axios"



function Investing() {
    const [stockData, setStockData] = useState([])

    const API_KEY = process.env.REACT_APP_API_KEY
    console.log(API_KEY)
    const BASE_URL = "https://api.polygon.io/v2/"

    useEffect(() => {
        getStockData("AAPL")
    },[])

    const getStockData = async (ticker) => {

            let res = await fetch(`${BASE_URL}aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-20?apiKey=${API_KEY}`)
            let data = await res.json()
            setStockData(data.results)

    }

    console.log(stockData)

    // const exampleQuery = `aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${from}/${to}`
    // const query1D = `aggs/ticker/${ticker}/range/5/minute/${from}/${to}`
    // const query1W = `aggs/ticker/${ticker}/range/10/minute/${from}/${to}`
    // const query1M = `aggs/ticker/${ticker}/range/1/hour/${from}/${to}`
    // const query3M = `aggs/ticker/${ticker}/range/1/day/${from}/${to}`
    // const queryYTD = `aggs/ticker/${ticker}/range/1/day/${from}/${to}`
    // const query1Y = `aggs/ticker/${ticker}/range/1/day/${from}/${to}`
    // const queryALL = `aggs/ticker/${ticker}/range/7/day/${from}/${to}`


    const xAxis = []
    const yAxis = []

    for (let i = 1; i <= 100; i++) {
        xAxis.push(i)
        yAxis.push(Math.floor(Math.random() * 100))
    }

    const data = {
        labels: xAxis,
        datasets: [{
            type: "line",
            labels: "datasets labels",
            data: yAxis,
            borderColor: 'lime', //
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: false,
            tension: 0.0,
        }]
    }

    const options = {
        plugins: {
            legend: false
        },
        scales: {
            y: {
                min: -20,
                max: 150,
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },

        }
    }

    return (
        <div className="inv-container">
            <div className="inv-chart" >
                <Line
                    data={data}
                    options={options}
                ></Line>
            </div>
            {}
        </div>
    )
}

export default Investing
