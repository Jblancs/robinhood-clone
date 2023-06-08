import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import PortfolioGraph from "./PortfolioGraph";
import { clearPortfolioState, fetchPortfolio } from "../../store/portfolio";
import { clearInvestmentState, fetchAllInvestments } from "../../store/investment";
import { fetchHistory, clearHistoryState } from "../../store/portfolioHistory";
import './HomePage.css'
import Investments from "./Investments";
import { addCommas, getNewsArticles, getPercentChange, getStockData } from "../../Utils";
import { useHistory } from "react-router-dom";
import { clearWatchlistsState, fetchWatchlists } from "../../store/watchlist";
import { clearBankAccountState, fetchBankAccounts } from "../../store/bankAccount";
import BuyingPower from "./BuyingPower";
import NewsCard from "./NewsCard";
import SlideShow from "./SlideShow";
import MarketSnapshot from "./MarketSnapshot";


function HomePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [news, setNews] = useState()
    const [priceSP500, setPriceSP500] = useState()
    const [priceNasdaq, setPriceNasdaq] = useState()
    const [priceBTC, setPriceBTC] = useState()

    const portfolio = useSelector(state => state.portfolio.portfolio)
    const portHistory = useSelector(state => state.history.history)
    const investments = useSelector(state => state.investments.investments)
    const user = useSelector(state => state.session.user)
    const watchlists = useSelector(state => state.watchlists.watchlists)
    const bank = useSelector(state => state.bank.bank)

    useEffect(() => {
        getNewsArticles("SPY", setNews)
        getStockData("X:BTCUSD", setPriceBTC)
        getStockData("SPY", setPriceSP500)
        getStockData("NDAQ", setPriceNasdaq)
    }, [])

    useEffect(() => {
        dispatch(fetchPortfolio())
        dispatch(fetchAllInvestments())
        dispatch(fetchHistory())
        dispatch(fetchWatchlists())
        dispatch(fetchBankAccounts())
        return () => {
            dispatch(clearInvestmentState())
            dispatch(clearPortfolioState())
            dispatch(clearHistoryState())
            dispatch(clearWatchlistsState())
            dispatch(clearBankAccountState())
        }
    }, [dispatch])

    if (!user) {
        history.push("/login")
    }

    if (!portfolio || !portHistory || !investments || !user || !news || !bank) return <div className='loading-div'><img src='/images/loading.gif' alt='loading' /></div>

    // Component JSX ----------------------------------------------------------------------------------------
    return (
        <div className="portfolio-page-container">
            <div className="portfolio-page-div">
                <div className="portfolio-info-div">
                    <div className="portfolio-graph-div">
                        <PortfolioGraph portHistory={portHistory} portfolio={portfolio} />
                    </div>
                    <BuyingPower portfolio={portfolio} bank={bank} />
                    <SlideShow />
                    <div className="portfolio-news-header bold">
                        News
                    </div>
                    <MarketSnapshot priceSP500={priceSP500} priceNasdaq={priceNasdaq} priceBTC={priceBTC}/>
                    <NewsCard news={news} />
                </div>
                <div className="stock-watchlist-component sticky">
                    <Investments investments={investments} watchlists={watchlists} />
                </div>
            </div>
        </div>
    )
}

export default HomePage
