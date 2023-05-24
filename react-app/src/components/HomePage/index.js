import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import PortfolioGraph from "./PortfolioGraph";
import { clearPortfolioState, fetchPortfolio } from "../../store/portfolio";
import { clearInvestmentState, fetchAllInvestments } from "../../store/investment";
import { fetchHistory, clearHistoryState } from "../../store/portfolioHistory";
import './HomePage.css'
import Investments from "./Investments";
import { getNewsArticles, addCommas } from "../../Utils";
import { useHistory } from "react-router-dom";
import { clearWatchlistsState, fetchWatchlists } from "../../store/watchlist";
import { clearBankAccountState, fetchBankAccounts } from "../../store/bankAccount";
import BuyingPower from "./BuyingPower";


function HomePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [news, setNews] = useState()

    const portfolio = useSelector(state => state.portfolio.portfolio)
    const portHistory = useSelector(state => state.history.history)
    const investments = useSelector(state => state.investments.investments)
    const user = useSelector(state => state.session.user)
    const watchlists = useSelector(state => state.watchlists.watchlists)
    const bank = useSelector(state => state.bank.bank)

    useEffect(() => {
        getNewsArticles("SPY", setNews)
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

    if(!user){
        history.push("/login")
    }

    if (!portfolio || !portHistory || !investments || !user || !news || !bank) return <div>Loading...</div>

    // Component JSX ----------------------------------------------------------------------------------------
    return (
        <div className="portfolio-page-container">
            <div className="portfolio-page-div">
                <div className="portfolio-info-div">
                    <div className="portfolio-graph-div">
                        <PortfolioGraph portHistory={portHistory} portfolio={portfolio} />
                    </div>
                    <BuyingPower portfolio={portfolio} bank={bank}/>
                    <div className="portfolio-news-div">
                        <div className="news-card-container">
                            {news.map(article => (
                                <div key={article.title} className="news-card" onClick={() => window.open(article.article_url)}>
                                    <div className="news-info-div">
                                        <div className="news-author bold">
                                            {article.publisher.name}
                                        </div>
                                        <div className="news-title">
                                            {article.title}
                                        </div>
                                    </div>
                                    <div className="news-img-div">
                                        <img className="news-img" src={article.image_url} alt="news-img"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="stock-watchlist-component sticky">
                    <Investments investments={investments} watchlists={watchlists} />
                </div>
            </div>
        </div>
    )
}

export default HomePage
