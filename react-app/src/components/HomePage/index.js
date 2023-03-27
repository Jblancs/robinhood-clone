import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import PortfolioGraph from "./PortfolioGraph";
import { clearPortfolioState, fetchPortfolio } from "../../store/portfolio";
import { clearInvestmentState, fetchAllInvestments } from "../../store/investment";
import { fetchHistory, clearHistoryState } from "../../store/portfolioHistory";
import './HomePage.css'
import InvestWatchlist from "./Watchlist";


function HomePage() {
    const dispatch = useDispatch()
    const portfolio = useSelector(state => state.portfolio.portfolio)
    const history = useSelector(state => state.history.history)
    const investments = useSelector(state => state.investments.investments)

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

    return (
        <div className="portfolio-page-container">
            <div className="portfolio-page-div">
                <div className="portfolio-info-div">
                    <div className="portfolio-graph-div">
                        <PortfolioGraph history={history} portfolio={portfolio}/>
                    </div>
                    <div className="portfolio-news-div">
                        News
                    </div>
                </div>
                <div className="stock-watchlist-component">
                    <InvestWatchlist investments={investments}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage
