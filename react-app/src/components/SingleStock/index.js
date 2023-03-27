import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getStockData } from "../../Utils";
import SingleStockGraph from "./SingleStockGraph";
import "./SingleStock.css"
import BuySellStock from "./BuySellStock";
import { clearPortfolioState, fetchPortfolio } from "../../store/portfolio";
import { clearInvestmentState, fetchStockInvestment } from "../../store/investment";
import { clearTransactionState, fetchAllTransactions } from "../../store/transaction";


function SingleStock() {
    const { ticker } = useParams()
    let stockTicker = ticker.toUpperCase()

    const [stockData, setStockData] = useState()
    const dispatch = useDispatch()
    const portfolio = useSelector(state => state.portfolio.portfolio)

    useEffect(() => {
        getStockData(stockTicker, setStockData)
    }, [])

    // get investment and portfolio
    useEffect(() => {
        dispatch(fetchPortfolio())
        dispatch(fetchStockInvestment(stockTicker))
        dispatch(fetchAllTransactions(stockTicker))
        return () => {
            dispatch(clearInvestmentState())
            dispatch(clearTransactionState())
            dispatch(clearPortfolioState())
        }
    }, [dispatch])


    if (!stockData || !portfolio) return <div>Loading...</div>

    return (
        <div className="stock-page-container">
            <div className="stock-page-div">
                <div className="stock-info-div">
                    <div className="stock-graph-div">
                        {stockData ? <SingleStockGraph stockData={stockData} stockTicker={stockTicker} /> : "Loading..."}
                    </div>
                    <div className="stock-about-div">
                        About
                    </div>
                </div>
                <div className="stock-buy-sell-component">
                    <BuySellStock stockData={stockData} stockTicker={stockTicker} portfolio={portfolio} dispatch={dispatch}/>
                </div>
            </div>
        </div>
    )
}

export default SingleStock
