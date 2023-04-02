import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { getMarketValue, getPriceChange, getStockData, getStockInfo, addCommas } from "../../Utils";
import SingleStockGraph from "./SingleStockGraph";
import "./SingleStock.css"
import BuySellStock from "./BuySellStock";
import { clearPortfolioState, fetchPortfolio } from "../../store/portfolio";
import { clearInvestmentState, fetchStockInvestment } from "../../store/investment";
import { clearTransactionState, fetchAllTransactions } from "../../store/transaction";
import TransactionHistory from "./TransactionHistory";
import { addStock, clearStockState, fetchStock } from "../../store/stock";
import WatchlistAddRemoveModal from "../WatchlistModal/WatchlistAddRemoveModal";
import OpenModalButton from "../OpenModalButton";
import { clearWatchlistsState, fetchWatchlists } from "../../store/watchlist";


function SingleStock() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { ticker } = useParams()
    let stockTicker = ticker.toUpperCase()

    const [stockData, setStockData] = useState()
    const [stockAboutInfo, setStockAboutInfo] = useState()

    // useSelectors to pass as props -----------------------------------------------------------------------------
    const portfolio = useSelector(state => state.portfolio.portfolio)
    const investment = useSelector(state => state.investments.investments)
    const transactions = useSelector(state => state.transactions.transactions)
    const stock = useSelector(state => state.stock.stock)
    const user = useSelector((state) => state.session.user)
    const watchlists = useSelector(state => state.watchlists.watchlists)

    // API call to retrieve stock info ---------------------------------------------------------------------------
    useEffect(() => {
        getStockData(stockTicker, setStockData)
        getStockInfo(stockTicker, setStockAboutInfo)
    }, [])

    // get investment and portfolio ------------------------------------------------------------------------------
    useEffect(() => {
        dispatch(fetchPortfolio())
        dispatch(fetchStockInvestment(stockTicker))
        dispatch(fetchAllTransactions(stockTicker))
        dispatch(fetchStock(stockTicker))
        dispatch(fetchWatchlists())
        return () => {
            dispatch(clearInvestmentState())
            dispatch(clearTransactionState())
            dispatch(clearPortfolioState())
            dispatch(clearStockState())
            dispatch(clearWatchlistsState())
        }
    }, [dispatch])

    // redirect if stock doesn't exist --------------------------------------------------------------------------
    if (!user) {
        history.push("/login")
    }

    if (stockData === "error") {
        history.push("/")
    }

    if (!stockData || !portfolio || !stock || stockData === "error" || !user || investment) return <div className="loading">Loading...</div>

    // if stock is not in db then add it ------------------------------------------------------------------------
    if (stock.error) {
        let stockInfo = {
            ticker: stockTicker,
            name: stockAboutInfo?.name,
            description: stockAboutInfo?.description,
            employees: stockAboutInfo?.total_employees,
            listed: stockAboutInfo?.list_date,
        }

        const addStockInfo = async (stockPayload) => {
            let returnData = await dispatch(addStock(stockPayload))
        }

        addStockInfo(stockInfo)
    }

    // check and plus icon for add to watchlist modal btn -------------------------------------------------------
    let checkIcon = (<i className="fas fa-check single-stock-add-watch-check" />)
    let plusIcon = (<i className="fas fa-plus single-stock-add-watch-plus" />)

    // Investment info display if stock is owned ----------------------------------------------------------------
    let investmentDisplay;
    if (investment) {
        if (!investment.errors) {


            let invValue = investment[stockTicker]?.value
            let marketValue = getMarketValue(stockData, investment, stockTicker)
            let dollarChange = getPriceChange(invValue, marketValue, "investment")
            let percentChange = Number(dollarChange / invValue).toFixed(2)

            let returnDisplay;
            if (invValue <= marketValue) {
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
                            ${addCommas(marketValue)}
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
                            {stockAboutInfo?.description ? stockAboutInfo?.description : ""}
                        </div>
                        <div className="stock-info-other-div">
                            <div className="stock-info-other-card">
                                <div className="stock-info-header bold">
                                    Employees
                                </div>
                                <div className="stock-info-info">
                                    {stockAboutInfo?.total_employees ? stockAboutInfo?.total_employees : ""}
                                </div>
                            </div>
                            <div className="stock-info-other-card">
                                <div className="stock-info-header bold">
                                    Listed
                                </div>
                                <div className="stock-info-info">
                                    {stockAboutInfo?.list_date ? stockAboutInfo?.list_date : ""}
                                </div>
                            </div>
                        </div>
                        <div className="stock-info-title bold">
                            History
                        </div>
                        <TransactionHistory transactions={transactions} stockTicker={stockTicker} />
                    </div>
                </div>
                <div className="stock-buy-sell-component">
                    <BuySellStock stockData={stockData} stockTicker={stockTicker} portfolio={portfolio} dispatch={dispatch} />
                    <div className="add-to-watch-div">
                        <OpenModalButton
                            buttonText="Add to Lists"
                            modalClass="add-list-modal-btn bold"
                            modalIcon={plusIcon}
                            modalComponent={<WatchlistAddRemoveModal ticker={stockTicker} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleStock
