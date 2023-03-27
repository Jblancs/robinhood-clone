import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import PortfolioGraph from "./PortfolioGraph";
import { clearPortfolioState, fetchPortfolio } from "../../store/portfolio";
import { clearInvestmentState, fetchAllInvestments } from "../../store/investment";
import { fetchHistory, clearHistoryState } from "../../store/portfolioHistory";
import './HomePage.css'
import InvestWatchlist from "./InvestWatchlist";
import { getNewsArticles } from "../../Utils";


function HomePage() {
    const dispatch = useDispatch()
    const [news, setNews] = useState()

    const portfolio = useSelector(state => state.portfolio.portfolio)
    const history = useSelector(state => state.history.history)
    const investments = useSelector(state => state.investments.investments)

    useEffect(() => {
        getNewsArticles("SPY", setNews)
    }, [])

    useEffect(() => {
        dispatch(fetchPortfolio())
        dispatch(fetchAllInvestments())
        dispatch(fetchHistory())
        return () => {
            dispatch(clearInvestmentState())
            dispatch(clearPortfolioState())
            dispatch(clearHistoryState())
        }
    }, [dispatch])

    if (!portfolio || !history || !investments) return <div>Loading...</div>

    console.log(news)

    return (
        <div className="portfolio-page-container">
            <div className="portfolio-page-div">
                <div className="portfolio-info-div">
                    <div className="portfolio-graph-div">
                        <PortfolioGraph history={history} portfolio={portfolio} />
                    </div>
                    <div className="buy-power-div bold" onClick={() => alert("Deposit feature coming soon!")}>
                        <div className="buy-power-text">
                            Buying Power
                        </div>
                        <div className="buy-power-amt">
                            ${portfolio.buying_power}
                        </div>
                    </div>
                    <div className="portfolio-news-div">
                        <div className="news-card-container">
                            {news.map(article => (
                                <div className="news-card" onClick={() => window.open(article.article_url)}>
                                    <div className="news-info-div">
                                        <div className="news-author bold">
                                            {article.author}
                                        </div>
                                        <div className="news-title bold">
                                            {article.title}
                                        </div>
                                        <div className="news-description">
                                            {article.description}
                                        </div>
                                    </div>
                                    <div className="news-img-div">
                                        <img className="news-img" src={article.image_url} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="stock-watchlist-component">
                    <InvestWatchlist investments={investments} />
                </div>
            </div>
        </div>
    )
}

export default HomePage
