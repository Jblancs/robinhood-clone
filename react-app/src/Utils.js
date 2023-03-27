// CHART DATA: SingleStock/singleStockGraph.js

// pulls stock price from prior days close
// ------------------------------------------------------------------------------
export const getStockData = async (ticker, setUseState) => {

    const API_KEY = process.env.REACT_APP_API_KEY

    let res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${API_KEY}`)
    let data = await res.json()

    setUseState(data.results[0])

}

// get stock chart data
// ------------------------------------------------------------------------------
export const getChartData = async ({ setState, ticker, multiplier, timeSpan, dateFrom, dateTo }) => {

    const API_KEY = process.env.REACT_APP_API_KEY
    const BASE_URL = "https://api.polygon.io/v2/"

    let res = await fetch(`${BASE_URL}aggs/ticker/${ticker}/range/${multiplier}/${timeSpan}/${dateFrom}/${dateTo}?apiKey=${API_KEY}`)
    let data = await res.json()

    setState(data.results)
}

// get todays date
// ------------------------------------------------------------------------------
export const prevCloseDate = (date) => {
    let today = new Date(date).toISOString().slice(0, 10)
    return `${today}`
}

// get prior date n daysAgo
// ------------------------------------------------------------------------------
export const daysAgo = (days) => {
    let date = new Date()
    let priorDate = date.setDate(date.getDate() - days)
    return priorDate
}

// build chart using stock data
// ------------------------------------------------------------------------------
export const buildGraph = (chartData, type, days) => {
    const xAxis = []
    const yAxis = []
    if(type === "stock"){
        for (let i = 0; i < chartData.length; i++) {
            let date = new Date(chartData[i]["t"])
            xAxis.push(date.toUTCString())
            yAxis.push(chartData[i]["c"])
        }
    } else {
        for (let i = chartData.length-days; i < chartData.length; i++) {
            let date = chartData[i]["date"]
            xAxis.push(date)
            yAxis.push(chartData[i]["value_at_time"])
        }
    }

    console.log(xAxis)
    console.log(yAxis)

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
                min: type === "stock" ? Math.min(...yAxis) : Math.min(...yAxis)-500,
                max: type === "stock" ? Math.max(...yAxis) : Math.max(...yAxis)+500,
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

    return {
        data,
        options
    }
}

// Get change in stock price
// ------------------------------------------------------------------------------
export const getPriceChange = (chartData, stockPrice) => {
    let open = chartData[0].o
    let close = stockPrice
    let change = close - open
    return change
}
