// const exampleQuery = `aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${from}/${to}`
// const query1D = `aggs/ticker/${ticker}/range/5/minute/${from}/${to}`
// const query1W = `aggs/ticker/${ticker}/range/10/minute/${from}/${to}`
// const query1M = `aggs/ticker/${ticker}/range/1/hour/${from}/${to}`
// const query3M = `aggs/ticker/${ticker}/range/1/day/${from}/${to}`
// const queryYTD = `aggs/ticker/${ticker}/range/1/day/${from}/${to}`
// const query1Y = `aggs/ticker/${ticker}/range/1/day/${from}/${to}`
// const queryALL = `aggs/ticker/${ticker}/range/7/day/${from}/${to}`

export const getStockGraphData = async (ticker, setUseState) => {

    const API_KEY = process.env.REACT_APP_API_KEY
    const BASE_URL = "https://api.polygon.io/v2/"

    let res = await fetch(`${BASE_URL}aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-20?apiKey=${API_KEY}`)
    let data = await res.json()
    setUseState(data.results)

}

// pulls stock price from prior days close
export const getStockPrice = async (ticker, setUseState) => {

    const API_KEY = process.env.REACT_APP_API_KEY
    const BASE_URL = "https://api.polygon.io/v1/"

    let res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${API_KEY}`)
    let data = await res.json()

    setUseState(data.results[0])

}

export const todaysDate = () => {
    let today = new Date().toISOString().slice(0, 10)
    return `${today}`
}
