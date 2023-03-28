import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getMarketValue, getPriceChange, getStockData, getStockInfo } from "../../Utils";
import SingleStockGraph from "./SingleStockGraph";
import "./SingleStock.css"
import BuySellStock from "./BuySellStock";
import { clearPortfolioState, fetchPortfolio } from "../../store/portfolio";
import { clearInvestmentState, fetchStockInvestment } from "../../store/investment";
import { clearTransactionState, fetchAllTransactions } from "../../store/transaction";
import TransactionHistory from "./TransactionHistory";


function SingleStock() {
    const { ticker } = useParams()
    let stockTicker = ticker.toUpperCase()

    const [stockData, setStockData] = useState()
    const [stockAboutInfo, setStockAboutInfo] = useState()
    const dispatch = useDispatch()
    const portfolio = useSelector(state => state.portfolio.portfolio)
    const investment = useSelector(state => state.investments.investments)
    const transactions = useSelector(state => state.transactions.transactions)

    useEffect(() => {
        getStockData(stockTicker, setStockData)
        getStockInfo(stockTicker, setStockAboutInfo)
    }, [])

    console.log(stockAboutInfo)

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

    // Investment info display if stock is owned ----------------------------------------------------------------
    let investmentDisplay;
    if (investment) {
        let invValue = investment[stockTicker].value
        let marketValue = getMarketValue(stockData, investment, stockTicker)
        let dollarChange = getPriceChange(invValue, marketValue, "investment")
        let percentChange = Number(dollarChange / invValue).toFixed(2)

        let returnDisplay;
        if (invValue < marketValue) {
            returnDisplay = (
                <div>
                    <span className="dollar-change">+${dollarChange}</span>
                    <span>(+{dollarChange}%)</span>
                </div>
            )
        } else {
            returnDisplay = (
                <div>
                    <span className="dollar-change">-${dollarChange}</span>
                    <span>(-{dollarChange}%)</span>
                </div>
            )
        }

        investmentDisplay = (
            <div className="stock-inv-display-div">
                <div className="stock-mrkt-div">
                    <div className="mrkt-val-text">
                        Your market value
                    </div>
                    <div className="mrkt-inv-val bold">
                        ${marketValue}
                    </div>
                    <div className="mrkt-val-return-div">
                        <div className="mrkt-inv-val-info">
                            <div className="mrkt-val-return-text">
                                Total Return
                            </div>
                            {returnDisplay}
                        </div>
                    </div>
                </div>
                <div className="stock-mrkt-div">
                    <div className="avg-cost-text">
                        Your average cost
                    </div>
                    <div className="mrkt-inv-val bold">
                        ${Number(investment[stockTicker].price_per_share).toFixed(2)}
                    </div>
                    <div className="mrkt-inv-val-info">
                        <div>Shares</div>
                        <div>{investment[stockTicker].shares}</div>
                    </div>
                </div>
            </div>
        )
    }

    // Component JSX --------------------------------------------------------------------------------------------
    return (
        <div className="stock-page-container">
            <div className="stock-page-div">
                <div className="stock-info-div">
                    <div className="stock-graph-div">
                        {stockData ? <SingleStockGraph stockData={stockData} stockTicker={stockTicker} stockAboutInfo={stockAboutInfo} /> : "Loading..."}
                    </div>
                    {investmentDisplay}
                    <div className="stock-info-card">
                        <div className="stock-info-title bold">
                            About
                        </div>
                        <div className="stock-info-desc">
                            {stockAboutInfo?.description}
                        </div>
                        <div className="stock-info-other-div">
                            <div className="stock-info-other-card">
                                <div className="stock-info-header bold">
                                    Employees
                                </div>
                                <div className="stock-info-info">
                                    {stockAboutInfo?.total_employees}
                                </div>
                            </div>
                            <div className="stock-info-other-card">
                                <div className="stock-info-header bold">
                                    Headquarters
                                </div>
                                <div className="stock-info-info">
                                    {stockAboutInfo?.address.city}, {stockAboutInfo?.address.state}
                                </div>
                            </div>
                            <div className="stock-info-other-card">
                                <div className="stock-info-header bold">
                                    Listed
                                </div>
                                <div className="stock-info-info">
                                    {stockAboutInfo?.list_date}
                                </div>
                            </div>
                        </div>
                        <div className="stock-info-title bold">
                            History
                        </div>
                        <TransactionHistory transactions={transactions} stockTicker={stockTicker}/>
                    </div>
                </div>
                <div className="stock-buy-sell-component">
                    <BuySellStock stockData={stockData} stockTicker={stockTicker} portfolio={portfolio} dispatch={dispatch} />
                </div>
            </div>
        </div>
    )
}

export default SingleStock
