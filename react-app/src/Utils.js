// CHART DATA: SingleStock/singleStockGraph.js

// pulls stock price from prior days close
// ------------------------------------------------------------------------------
export const getStockData = async (ticker, setUseState) => {

    const API_KEY = process.env.REACT_APP_API_KEY

    let res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${API_KEY}`)
    let data = await res.json()
    if (data.results) {
        setUseState(data.results[0])
        return null
    } else {
        setUseState("error")
        return null
    }

}

// get stock chart data
// ------------------------------------------------------------------------------
export const getChartData = async ({ setState, ticker, multiplier, timeSpan, dateFrom, dateTo }) => {

    const API_KEY = process.env.REACT_APP_API_KEY
    const BASE_URL = "https://api.polygon.io/v2/"

    let res = await fetch(`${BASE_URL}aggs/ticker/${ticker}/range/${multiplier}/${timeSpan}/${dateFrom}/${dateTo}?apiKey=${API_KEY}`)
    let data = await res.json()

    if (data.results) {
        setState(data.results)
        return null
    } else {
        setState("error")
        return null
    }
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
    let changePercent;
    if (type === "stock") {
        let currPrice = currentStockPrice(chartData)
        changePercent = stockPercentChange(chartData, currPrice)
        for (let i = 0; i < chartData.length; i++) {
            let date = new Date(chartData[i]["t"])
            xAxis.push(date.toUTCString())
            yAxis.push(chartData[i]["c"])
        }
    } else {
        if (chartData.length > days) {
            for (let i = chartData.length - days; i < chartData.length; i++) {
                let date = chartData[i]["date"]
                xAxis.push(date)
                yAxis.push(chartData[i]["value_at_time"])
            }
        } else {
            for (let i = -1; i < chartData.length; i++) {
                if (!chartData[i]) {
                    let earliestDate = new Date(chartData[0]["date"])
                    let priorDate = earliestDate.setDate(earliestDate.getDate() - 1)
                    xAxis.push(priorDate)
                    yAxis.push(0)
                } else {
                    let date = chartData[i]["date"]
                    xAxis.push(date)
                    yAxis.push(chartData[i]["value_at_time"])
                }
            }
        }
    }

    let lineColor;
    if (type === "stock") {
        lineColor = changePercent < 0 ? "orange" : "lime"
    } else {
        lineColor = "lime"
    }

    const data = {
        labels: xAxis,
        datasets: [{
            type: "line",
            labels: "datasets labels",
            data: yAxis,
            borderColor: lineColor,
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
                min: type === "stock" ? Math.min(...yAxis) : Math.min(...yAxis) - 500,
                max: type === "stock" ? Math.max(...yAxis) : Math.max(...yAxis) + 500,
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

// Get current stock price
// ------------------------------------------------------------------------------
export const currentStockPrice = (data) => {
    let latestPriceObj = data[data.length - 1]
    return latestPriceObj?.c
}
// Get current stock price % change
// ------------------------------------------------------------------------------
export const stockPercentChange = (data, currentPrice) => {
    let openPrice = data[0]?.o
    let priceDiff = currentPrice - openPrice
    return (priceDiff / openPrice) * 100
}

// Get change in stock price
// ------------------------------------------------------------------------------
export const getPriceChange = (data, stockPrice, type) => {
    if (type === "chart") {
        let open = data[0].o
        let close = stockPrice
        let change = close - open
        return change
    }
    if (type === "investment") {
        return Number(stockPrice - data).toFixed(2)
    }
}

// Get percent change in last close
// ------------------------------------------------------------------------------
export const getPercentChange = (data) => {
    let open = data.o
    let close = data.c
    let priceChange = close - open
    let percentChange = priceChange/open
    let returnData = Number(percentChange*100).toFixed(2)
    return returnData
}

// Get change in stock price
// ------------------------------------------------------------------------------
export const getMarketValue = (stockData, investment, ticker) => {
    if (investment[ticker]) {
        return Number(stockData.c * investment[ticker].shares).toFixed(2)
    } else {
        return Number(0).toFixed(2)
    }
}

// Get news articles
// ------------------------------------------------------------------------------
export const getNewsArticles = async (ticker, setUseState) => {

    const API_KEY = process.env.REACT_APP_API_KEY

    let res = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&order=desc&limit=20&sort=published_utc&apiKey=${API_KEY}`)
    let data = await res.json()

    setUseState(data.results)
    return null

}

// Get stock about info
// ------------------------------------------------------------------------------
export const getStockInfo = async (ticker, setUseState) => {
    const API_KEY = process.env.REACT_APP_API_KEY
    let res = await fetch(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${API_KEY}`)
    let data = await res.json()
    if (data.results) {
        setUseState(data.results)
        return
    } else {
        setUseState("error")
        return null
    }
}

// format number with commas
// ------------------------------------------------------------------------------
export const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// format date to MMM DD
// ------------------------------------------------------------------------------
export const getDisplayDate = (date) => {
    let formattedDate = (new Date(date)).toUTCString()
    let dateSplit = formattedDate.split(" ")
    return `${dateSplit[2]} ${dateSplit[1]}`
}

// format date to MMM DD, YYYY
// ------------------------------------------------------------------------------
export const getDisplayDateYear = (date) => {
    let formattedDate = (new Date(date)).toUTCString()
    let dateSplit = formattedDate.split(" ")
    return `${dateSplit[2]} ${dateSplit[1]}, ${dateSplit[3]}`
}

// Capitalize first letter of string
// ------------------------------------------------------------------------------
export const firstLetterUpper = (string) => {
    return `${string[0].toUpperCase()}${string.slice(1)}`
}

// Get date obj tomorrow at 8am pst
// ------------------------------------------------------------------------------
export const getTomorrow = () => {
    const now = new Date();

    const tomorrow = new Date(now);

    // If tomorrow is Fri, Sat or Sun, add additional days to get Monday
    if (tomorrow.getDay() === 5) {
        tomorrow.setDate(tomorrow.getDate() + 3);
    } else if (tomorrow.getDay() === 6) {
        tomorrow.setDate(tomorrow.getDate() + 2);
    } else {
        tomorrow.setDate(tomorrow.getDate() + 1);
    }

    tomorrow.setHours(11, 0, 0)

    return tomorrow;
}

// get difference between today and future date
// ------------------------------------------------------------------------------
export const getDaysDifference = (date) => {
    // Convert both dates to UTC to eliminate any daylight saving time differences
    const today = Date.parse(new Date());
    const futureDate = Date.parse(new Date(date));

    // Calculate the difference in milliseconds
    const timeDifference = Math.abs(futureDate - today);

    // Convert milliseconds to days and round down to the nearest integer
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

// get the date one year later
// ------------------------------------------------------------------------------
export const getOneYearLater = (date) => {
    let formattedDate = new Date(date)
    let year = formattedDate.getFullYear()
    formattedDate.setFullYear(year + 1)
    return formattedDate
}

// get future date based on frequency
// ------------------------------------------------------------------------------
export const getFutureDate = (date, frequency) => {
    let dateValue = new Date(date)

    // value in miliseconds
    let oneDay = (1000 * 60 * 60 * 24)
    let oneWeek = oneDay * 7
    let twoWeeks = oneWeek * 2
    let oneMonth = oneDay * 31

    let dateInMS = Date.parse(dateValue)
    let futureDateMS;

    if (frequency === "Daily") {
        futureDateMS = dateInMS + oneDay

    } else if (frequency === "Weekly") {
        futureDateMS = dateInMS + oneWeek

    } else if (frequency === "Bi-Weekly") {
        futureDateMS = dateInMS + twoWeeks

    } else if (frequency === "Monthly") {
        futureDateMS = dateInMS + oneMonth
    }

    let futureDate = new Date(futureDateMS)

    let returnDateMS = futureDateMS;
    if (futureDate.getDay() === 0) {
        returnDateMS = futureDateMS + oneDay
    } else if (futureDate.getDay() === 6) {
        returnDateMS = futureDateMS + (2 * oneDay)
    }

    let returnDate = new Date(returnDateMS)

    return returnDate

}
