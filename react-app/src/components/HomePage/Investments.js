import React from "react";
import { NavLink } from "react-router-dom";
import Watchlists from "./Watchlist";

function Investments({ investments }) {
    let investmentsList = Object.values(investments)

    return (
        <div className="inv-watch-div">
            <div className="inv-watch-container">
                <div className="inv-container">
                    <div className="list-header">
                        <div className="list-header-text bold">
                            Stocks
                        </div>
                    </div>
                    <div className="inv-list">
                        {investmentsList.map(inv => (
                            <NavLink key={inv.ticker} to={`/stocks/${inv.ticker}`} style={{ textDecoration: 'none', color: "black" }}>
                            <div  className="inv-card">
                                <div className="inv-tick-share">
                                    <div className="stock-ticker bold">
                                        {inv.ticker}
                                    </div>
                                    <div>
                                        {inv.shares} Share(s)
                                    </div>
                                </div>
                                <div className="inv-chart-pic">
                                    <img className="graph-img-placeholder" src='/images/graph-image.png' alt="graph" />
                                </div>
                                <div className="inv-price-change">
                                    <div>
                                        {Number(inv.price_per_share).toFixed(2)}
                                    </div>
                                    <div>
                                        +0.00%
                                    </div>
                                </div>
                            </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="watch-container">
                    <Watchlists />
                </div>
            </div>
        </div>
    )
}

export default Investments
