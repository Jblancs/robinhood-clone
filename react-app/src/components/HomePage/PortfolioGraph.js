import React from "react";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import './HomePage.css'




function PortfolioGraph() {


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
            borderColor: 'lime',
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: false,
            tension: 0.0,
        }]
    }

    const options = {
        plugins: {
            legend: false,
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
                },
            },
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },
        },
    }

    return (
        <div className="inv-container">

            <div className="inv-chart" >
                <Line
                    data={data}
                    options={options}
                ></Line>
            </div>

        </div>
    )
}

export default PortfolioGraph
