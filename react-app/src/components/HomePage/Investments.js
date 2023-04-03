import React from "react";
import { NavLink } from "react-router-dom";
import InvestmentCard from "./InvestmentCard";
import Watchlists from "./Watchlist";

function Investments({ investments, watchlists }) {
    let investmentsList = Object.values(investments)

    return (
        <div className="inv-watch-div">
            <div className="inv-watch-container sticky">
                <div className="inv-container">
                    <div className="list-header">
                        <div className="list-header-text bold">
                            Stocks
                        </div>
                    </div>
                    <div className="inv-list">
                        {investmentsList.map(inv => (
                            <NavLink key={inv.ticker} to={`/stocks/${inv.ticker}`} style={{ textDecoration: 'none', color: "black" }}>
                                <InvestmentCard inv={inv} ticker={inv.ticker}/>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="watch-container">
                    <Watchlists watchlists={watchlists} />
                </div>
            </div>
        </div>
    )
}

export default Investments
